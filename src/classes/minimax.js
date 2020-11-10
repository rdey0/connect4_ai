import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import {get_game_state} from '../utils/helper.js'

export default class MinimaxAi {
    constructor(player_number, num_to_win, timeout, depth) {
        this.timeout = timeout
        this.chosen_move = 0;
        this.player_num = player_number;
        this.num_to_win = num_to_win;
        this.num_won = 0;
        this.num_draw = 0;
        this.num_lost = 0;
        this.board = null;
        this.depth = depth;
    }

    get_next_move(board) {
        var depth = this.depth;
        var move_score = 0;
        var best_move = 0;
        var best_score = Number.MIN_SAFE_INTEGER;
        this.board = board;
        var start_time = new Date().getTime();
        for(var i=0; i < this.board[0].length && !this.is_timeout(start_time); ++i){
            if(this.can_make_move(i)){
                var[row, col] = this.make_move(i, this.player_num);
                move_score = this.min_value(depth-1, this.player_num, row, col);
                if(move_score >= best_score){
                    best_score = move_score;
                    best_move = i;
                }
                this.unmake_move(i);
            }
            if(i==this.board[0].length-1)
                console.log('finished simulation');
        }

        if(!this.can_make_move(best_move)) {
            best_move = 0;
            while(!this.can_make_move(best_move))
                best_move++;
        }
        return best_move;
    }


    max_value(depth, player, row, col) {
        var best_score = Number.MIN_SAFE_INTEGER;
        var move_score;
        var game_state = get_game_state(this.board, row, col, this.num_to_win, player);
        if(depth == 0 || game_state !== GAME_STATES.ONGOING) {
            return this.get_heuristic(this.player_num, game_state, player);
        }else{
            player = (player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
            for(var i=0; i < this.board[0].length; ++i){
                if(this.can_make_move(i)){
                    var[r,c] = this.make_move(i, player);
                    move_score = this.min_value(depth-1, player, r, c);
                    if(move_score > best_score)
                        best_score = move_score;
                    this.unmake_move(i);
                }
            }
        }
        return best_score;
    }

    min_value(depth, player, row, col) {
        var best_score = Number.MAX_SAFE_INTEGER;
        var move_score;
        var game_state = get_game_state(this.board, row, col, this.num_to_win, player);
        if(depth == 0 || game_state !== GAME_STATES.ONGOING) {
            return this.get_heuristic(this.player_num, game_state, player);
        }else{
            player = (player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
            for(var i=0; i < this.board[0].length; ++i){
                if(this.can_make_move(i)){
                    var[r,c] = this.make_move(i, player);
                    move_score = this.max_value(depth-1, player, r, c);
                    if(move_score < best_score)
                        best_score = move_score;
                    this.unmake_move(i);
                }
            }
        }
        return best_score;
    }

    
    get_heuristic(our_player, game_state, last_player) {
        if(game_state !== GAME_STATES.ONGOING)
            return (last_player === our_player) ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;

        var board_width = this.board[0].length;
        var board_height = this.board.length;
        var player1_score = 0;
        var player2_score = 0;
        var column_value = [1,2,3,4,3,2,1];
        
        for(var i=0; i < board_width; i++){
            if(this.board[board_height - 1][i] == CELL_STATES.EMPY) continue;
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

    opponent_can_win(last_player, our_player){
        var curr_player = (last_player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
        if(curr_player === our_player) return false;
        for(var i = 0; i < this.board[0].length; i++){
            if(this.can_make_move(i)){
                if(this.is_winning_move(i, curr_player)) return true;
            }
        }
        return false;
    }

    is_winning_move(move, curr_player){
        if(this.can_make_move(move)){
            var[r,c] = this.make_move(move, curr_player);
            var game_state = get_game_state(this.board, r, c, this.num_to_win, curr_player);
            this.unmake_move(move);
            if(game_state === GAME_STATES.WIN){
                return true
            }
                
        }
    }
    

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
     * checks if the AI has run out of time to make a move
     */
    is_timeout(start_time) {
        return (new Date().getTime() - start_time >= this.timeout);
    }


    make_move(column, curr_player) {
        var row = 0;
        while( row < this.board.length && this.board[row][column] === CELL_STATES.EMPTY) ++row;
        this.board[row - 1][column] = curr_player;
        return [row - 1, column];
         
    }

    unmake_move(column) {
        var row = 0;
        while( row < this.board.length && this.board[row][column] === CELL_STATES.EMPTY) ++row;
        this.board[row][column] = CELL_STATES.EMPTY;
    }
    
    can_make_move(column) {
        return this.board[0][column] === CELL_STATES.EMPTY;
    }

}