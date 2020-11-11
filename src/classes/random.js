import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import {get_game_state} from '../utils/helper.js'

export default class RandomAi {
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
        this.board = board;
        var opponent = (this.player_num === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
        var start_time = new Date().getTime();
        var chosen_move = null;
        //if we can win in the next move, make the move
        for(let i = 0; i < this.board[0].length; i++){
            if(this.is_winning_move(i, this.player_num)){
                chosen_move = i;
                break;
            }   
        }

        //if our opponent can win in the next move, block the move
        for(let i = 0; i < this.board[0].length; i++){
            if(this.is_winning_move(i, opponent)){
                chosen_move = i;
                break;
            }
        }

        if(chosen_move == null)
            chosen_move = this.get_random_move(board);
            
        //wait until we run out of time. This is unnecessary but we
        //don't want to intimidate beginners by making moves too quickly
        while(!this.is_timeout(start_time)){}
        return chosen_move;
    }

    /* 
     * constantly updates this.move with the current best move
     * until terminate is set to true
     */ 
    get_random_move(board) {
        var legal_moves = [];

        board[0].forEach((state,index) => {
            if(state === CELL_STATES.EMPTY) legal_moves.push(index);
        });
        //return a random legal move
        return legal_moves[Math.floor(Math.random() * legal_moves.length)];
    }

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