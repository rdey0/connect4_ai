import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
export default class MonteCarloAi {
    constructor(timeout) {
        this.timeout = timeout
        this.move = -1;
        this.terminate = false;
    }

    get_next_move(board) {
        var chosen_move = 0;
        // Create value array and set all illegal moves to minimum value.
        var values = new Array(board[0].length);
        board[0].forEach((state,index) => {
            values[index] = (state === CELL_STATES.EMPTY) ? 0 : Number.MIN_VALUE;
        });

        //keep updating the value of each possible move until time runs out
        var start_time = new Date().getTime();
        while(!this.is_timeout(start_time)){
            var move = this.get_random_move(board);
            console.log(move);
        }
        const next_move = this.move;
        this.move = -1;
        return next_move;
    }

    //checks if the AI has run out of time to make a move
    is_timeout(start_time) {
        return (new Date().getTime() - start_time >= this.timeout);
    }
    // constantly updates this.move with the current best move
    // until terminate is set to true
    get_random_move(board) {
        var legal_moves = [];
        board[0].forEach((state,index) => {
            if(state === CELL_STATES.EMPTY)
                legal_moves.push(index);
        });
        //return a random legal move
        return legal_moves[Math.floor(Math.random() * legal_moves.length)]
    }

}