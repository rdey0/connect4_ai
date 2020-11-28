import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import {get_game_state} from '../utils/helper.js'
/*
 * Alpha-Beta searches through game states similar to Minimax except
 * it refuses to search game moves which a competent opponent would
 * never make, thereby increasing the speed at which it searches. 
 * This increased speed allows the algorithm to search at greater
 * depths than Minimax.
 */
export default class AlphaBetaAi {
    constructor(player_number, num_to_win, timeout, depth) {
        this.timeout = timeout
        this.chosen_move = 0;
        this.player_num = player_number;
        this.num_to_win = num_to_win;
        this.board = null;
        this.depth = depth;
    }

    get_next_move(board) {
        var depth = this.depth;
        var move_score = 0;
        var best_move = 0;
        var best_score = Number.MIN_SAFE_INTEGER;
        var alpha = Number.MIN_SAFE_INTEGER;
        var beta = Number.MAX_SAFE_INTEGER;
        this.board = board;
        var opponent = (this.player_num === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
        var start_time = new Date().getTime();

        //if we can win in the next move, make the move
        for(let i = 0; i < this.board[0].length; i++){
            if(this.is_winning_move(i, this.player_num))
                return i;     
        }

        //if our opponent can win in the next move, block the move
        for(let i = 0; i < this.board[0].length; i++){
            if(this.is_winning_move(i, opponent))
                return i;  
        }

        // use minimax with alpha beta pruning to decide on the next move
        for(var i=0; i < this.board[0].length && !this.is_timeout(start_time); ++i){
            if(this.can_make_move(i)){
                var[row, col] = this.make_move(i, this.player_num);
                move_score = this.min_value(depth-1, this.player_num, alpha, beta, row, col);
                if(move_score >= best_score){
                    best_score = move_score;
                    best_move = i;
                }
                this.unmake_move(i);
            }
        }

        // If we haven't found a move to make, pick the first column available
        if(!this.can_make_move(best_move)) {
            best_move = 0;
            while(!this.can_make_move(best_move))
                best_move++;
        }
        return best_move;
    }

    /*
     * Get the best possible score for your move
     * @depth: An int representing how many more moves in advance to survey
     * @player: The current player (1 or 2)
     * @alpha: The players best score of type int
     * @beta: The opponents best score of type int
     * @row: The row where a move has been made
     * @col: the column where a move has been made
     * Return: The AI's best possible score
     */
    max_value(depth, player, alpha, beta, row, col) {
        var best_score = Number.MIN_SAFE_INTEGER;
        var move_score;
        var game_state = get_game_state(this.board, row, col, this.num_to_win, player);
        if(depth === 0 || game_state !== GAME_STATES.ONGOING) {
            return this.get_heuristic(this.player_num, game_state, player);
        }else{
            player = (player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
            for(var i=0; i < this.board[0].length; ++i){
                if(this.can_make_move(i)){
                    var[r,c] = this.make_move(i, player);
                    move_score = this.min_value(depth-1, player, alpha, beta, r, c);
                    if(move_score > best_score)
                        best_score = move_score;
                    this.unmake_move(i);
                    if(best_score >= beta)
                        return best_score;
                    if(best_score > alpha)
                        alpha = best_score;
                }
            }
        }
        return best_score;
    }

    /*
     * Get the worst possible score for your opponent
     * @depth: An int representing how many more moves in advance to survey
     * @player: The current player (1 or 2)
     * @alpha: The players best score of type int
     * @beta: The opponents best score of type int
     * @row: The row where a move has been made
     * @col: the column where a move has been made
     * Return: The opponents worst possible score
     */
    min_value(depth, player, alpha, beta, row, col) {
        var best_score = Number.MAX_SAFE_INTEGER;
        var move_score;
        var game_state = get_game_state(this.board, row, col, this.num_to_win, player);
        if(depth === 0 || game_state !== GAME_STATES.ONGOING) {
            return this.get_heuristic(this.player_num, game_state, player);
        }else{
            player = (player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
            for(var i=0; i < this.board[0].length; ++i){
                if(this.can_make_move(i)){
                    var[r,c] = this.make_move(i, player);
                    move_score = this.max_value(depth-1, player, alpha, beta, r, c);
                    if(move_score < best_score)
                        best_score = move_score;
                    this.unmake_move(i);
                    if(best_score <= alpha)
                        return best_score;
                    if(best_score < beta)
                        beta = best_score;
                }
            }
        }
        return best_score;
    }

    /*
     * Return a metric representing how favorable the current board state is
     * @our_player: An int representing the AI player (1 or 2)
     * @game_state: A 2D array representing the current state of the board
     * @last_player: The last player to make a move
     * Return: int representing how favorable the current board state is (larger is better)
     */
    get_heuristic(our_player, game_state, last_player) {
        if(game_state !== GAME_STATES.ONGOING)
            return (last_player === our_player) ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;

        var board_width = this.board[0].length;
        var board_height = this.board.length;
        var player1_score = 0;
        var player2_score = 0;
        var column_value = [1,2,3,4,3,2,1];
        
        for(var i=0; i < board_width; i++){
            if(this.board[board_height - 1][i] === CELL_STATES.EMPTY) continue;
            var height = board_height - this.get_column_height(i);
            for(var j = board_height - 1; j >= height; j--){
                for(var x = -1; x <= 1; x++){
                    for(var y = -2; y <= 2; y++){
                        if(i + x < 0 || i + x >= board_width || i - x < 0 || i - x >= board_width ||
                            j + y < 0 || j + y >= board_height || j - y < 0 || j - y >= board_height){
                            continue;
                        }

                        if(this.board[j+y][i+x] === CELL_STATES.PLAYER1){
                            if(this.board[j-y][i-x] === CELL_STATES.PLAYER1) {
                                player1_score += 2 * column_value[i];
                            }else{
                                player1_score += 1;
                            }
                        }else if(this.board[j+y][i+x] === CELL_STATES.PLAYER2){
                            if(this.board[j-y][i-x] === CELL_STATES.PLAYER2){
                                player2_score += 2 * column_value[i];
                            }else{
                                player2_score += 1;
                            }
                        }
                    }
                }
                
            }
        }
        return (this.player_num === CELL_STATES.PLAYER1) ?
            (player1_score - player2_score):(player2_score - player1_score);

    }

    /*
     * Determine if a move will result in a win
     * @move: An int representing the column to make a move in
     * @curr_player: The current player (1 or 2)
     * Return: True if the move results in a win, False otherwise
     */
    is_winning_move(move, curr_player){
        if(this.can_make_move(move)){
            var[r,c] = this.make_move(move, curr_player);
            var game_state = get_game_state(this.board, r, c, this.num_to_win, curr_player);
            this.unmake_move(move);
            if(game_state === GAME_STATES.WIN)
                return true       
        }
        return false;
    }
    
    /*
     * get the number of tokens in a column
     * @col: An int representing the column number
     * Return: The int number of tokens in a column
     */
    get_column_height(col) {
        var height = 0;
        for(var i = this.board.length-1; i >= 0; --i){
            if(this.board[i][col] === CELL_STATES.EMPTY)
                break;
            height++;
        }
        return height;
    }

    /* 
     * Checks if the AI has run out of time to make a move
     * @start_time: int time in miliseconds
     * Return: True if AI has exceeded time limit, False otherwise
     */
    is_timeout(start_time) {
        return (new Date().getTime() - start_time >= this.timeout);
    }

    /*
     * Makes a move on the board at the specified column
     * @column: An int representing the column to make a move
     * @curr_player: The player making the move (1 or 2)
     * Return: int array of the form [row,col] representing where the move was made
     */
    make_move(column, curr_player) {
        var row = 0;
        while( row < this.board.length && this.board[row][column] === CELL_STATES.EMPTY) ++row;
        this.board[row - 1][column] = curr_player;
        return [row - 1, column];
         
    }

    /*
     * Unmakes a move at a specified column
     * @col: An int representing the column
     * Return: Nothing is returned
     */
    unmake_move(col) {
        var row = 0;
        while( row < this.board.length && this.board[row][col] === CELL_STATES.EMPTY) ++row;
        this.board[row][col] = CELL_STATES.EMPTY;
    }
    
    /*
     * Determines if a move can be made at a specified column
     * @col: An int representing the column
     * Return: True if a move can be made in the column, false otherwise
     */
    can_make_move(column) {
        return this.board[0][column] === CELL_STATES.EMPTY;
    }

}