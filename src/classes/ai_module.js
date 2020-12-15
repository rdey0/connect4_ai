import {CELL_STATES} from '../utils/enum.js'
// Defines the methods and fields required for a basic AI opponent
export default class AiModule{
    constructor(player_number, num_to_win, timeout, depth) {
        this.timeout = timeout
        this.chosen_move = 0;
        this.player_num = player_number;
        this.num_to_win = num_to_win;
        this.board = null;
        this.depth = depth;
    }

    /*
     * Gets the AI move
     * @board: 2D-Array representing the state of the game
     * Return: A legal move (int from 0-7)
     */
    get_next_move(board){
        var best_move = 0;
        // Pick the first available column to make a move
        while(!this.can_make_move(best_move))
            best_move++;
        return best_move;
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