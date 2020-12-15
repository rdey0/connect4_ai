import {CELL_STATES} from '../utils/enum.js'
import AlphaBetaAi from './alphabeta.js'
import AiModule from './ai_module.js' 
/*
 * This AI is a modification of the Alpha-Beta algorithm. It increases 
 * it's search depth as the game continues.
 */
export default class OmoriAi extends AiModule{
    /*
     * Get the next move using the alphabeta algorithm at progressive depths
     * @board: 2D int array representing state of the game
     * Return: int chosen move (1-7)
     */
    get_next_move(board) {
        var percent_filled = this.get_percent_filled(board);
        var depth = 0;
        var alpha_beta;
        //Use alpha beta with depth 8 until board is 60% full
        if(percent_filled <= 0.25){
             //Use alpha beta decision making and increase depth as board gets more full
             depth = 8;
             alpha_beta = new AlphaBetaAi(this.player_num, this.num_to_win, this.timeout, depth);
             return alpha_beta.get_next_move(board);
        }else if(percent_filled <= 0.6){
            //Use alpha beta decision making and increase depth as board gets more full
            depth = 8;
            alpha_beta = new AlphaBetaAi(this.player_num, this.num_to_win, this.timeout, depth);
            return alpha_beta.get_next_move(board);
        }else{
            //Use alpha beta decision making with increased depth
            depth = 10;
            alpha_beta = new AlphaBetaAi(this.player_num, this.num_to_win, this.timeout, depth);
            return alpha_beta.get_next_move(board);
        }
    }

    /* 
     * Get the percent of filled cells in the board
     * @board: A 2D int array representing the current game board
     * Return: a float in the range [0,1]
     */
    get_percent_filled(board) {
        var num_rows = board.length;
        var num_cols = board[0].length;
        var total = num_rows * num_cols;
        var num_filled = 0;
        //get the number of non empty cells on the board
        for(var r = 0; r < num_rows; r++){
            for(var c = 0; c < num_cols; c++){
                if(board[r][c] !== CELL_STATES.EMPTY)
                    num_filled++;
            }
        }
        return parseFloat(num_filled) / total;
    }
}