import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
export default class BoardController {
    constructor(num_rows, num_cols, player){
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.board = new Array(num_rows).fill(CELL_STATES.EMPTY).map(()=> new Array(num_cols).fill(CELL_STATES.EMPTY));
        this.curr_player = player;
    }

    can_make_move(column) {
        return this.board[0][column] === CELL_STATES.EMPTY;
    }

    make_move(column) {
        if(this.can_make_move(column)){
            var row = 0;
            while( row < this.board.length && this.board[row][column] === CELL_STATES.EMPTY) ++row;
            this.board[row - 1][column] = this.state.curr_player;
        }  
    }

    reset_game() {
        this.board = new Array(this.num_rows).fill(CELL_STATES.EMPTY).map(()=> new Array(this.num_cols).fill(CELL_STATES.EMPTY));
    }
}