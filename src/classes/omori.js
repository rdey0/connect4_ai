import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import {get_game_state} from '../utils/helper.js'
import MonteCarloAi from './monte_carlo.js'
import AlphaBetaAi from './alphabeta.js' 
export default class OmoriAi {
    constructor(player_number, num_to_win, timeout) {
        this.timeout = timeout
        this.chosen_move = 0;
        this.player_num = player_number;
        this.num_to_win = num_to_win;
        this.num_won = 0;
        this.num_draw = 0;
        this.num_lost = 0;
        this.board = null;
    }

    get_next_move(board) {
        var percent_filled = this.get_percent_filled(board);
        if(percent_filled <= 0.20){
            var monte = new MonteCarloAi(this.player_num, this.num_to_win, this.timeout);
            return monte.get_next_move(board);
        }else{
            var depth = 7 + Math.floor(percent_filled * 10);
            console.log('alpha_beta depth:', depth);
            var alpha_beta = new AlphaBetaAi(this.player_num, this.num_to_win, this.timeout, depth);
            return alpha_beta.get_next_move(board);
        }
    }
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