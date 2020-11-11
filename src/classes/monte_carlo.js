import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import {get_game_state} from '../utils/helper.js'

export default class MonteCarloAi {
    constructor(player_number, num_to_win, timeout) {
        this.timeout = timeout
        this.chosen_move = 0;
        this.player_num = player_number;
        this.num_to_win = num_to_win;
        this.num_won = 0;
        this.num_draw = 0;
        this.num_lost = 0;
    }

    get_next_move(board) {
        // make a move in the middle of the board if it's empty
        var middle_column = (board[0].length - 1)/2;
        if(board[board.length - 1][middle_column] === CELL_STATES.EMPTY)
            return middle_column;
            
        // Create value array and set all illegal moves to minimum value.
        var values = new Array(board[0].length);
        board[0].forEach((state,index) => {
            values[index] = (state === CELL_STATES.EMPTY) ? 0 : Number.NEGATIVE_INFINITY;
        });

        //keep updating the value of each possible move until time runs out
        var start_time = new Date().getTime();
        while(!this.is_timeout(start_time)){
            // get a random legal move and make it
            var move = this.get_random_move(board);
            var [row, col] = this.make_move(move, board, this.player_num);
            // simulate the rest of the game starting with the opponents turn
            var [outcome, last_player] = this.play_random_game(board, this.player_num, row, col);
            this.update_chosen_move(this.player_num, outcome, last_player, values, move)
            //unmake our initial move
            this.unmake_move(move, board);
        }
        const next_move = this.chosen_move;
        this.chosen_move = 0;
        return next_move;
    }

    /* 
     * checks if the AI has run out of time to make a move
     */
    is_timeout(start_time) {
        return (new Date().getTime() - start_time >= this.timeout);
    }

    /* 
     * Simulate a game where players make moves at random and then return 
     * the winner
     */ 
    play_random_game(board, curr_player, row, col) {
        // create a copy of the current board so we don't permanently modify anything
        var game = [];
        for (var i = 0; i < board.length; i++)
            game[i] = board[i].slice();
        // simulate the game until it ends
        var game_state = get_game_state(game, row, col, this.num_to_win, curr_player);
        while(game_state === GAME_STATES.ONGOING){
            curr_player = (curr_player === CELL_STATES.PLAYER1) ? CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
            var move = this.get_random_move(game);
            [row, col] = this.make_move(move,game,curr_player);
            game_state = get_game_state(game, row, col, this.num_to_win, curr_player);
            
        }
        return [game_state, curr_player];

    }

    update_chosen_move(our_player, outcome, last_player, values, move) {
        // Dont change anything if the oucome is a draw
        if(outcome === GAME_STATES.DRAW)
            return;
        
        // add a point if we made the winning move, subtract one otherwise
        values[move] += (last_player === our_player) ? 1 : -1;

        // change the chosen move if there is a better move than our current one
        for(let i = 0; i < values.length; ++i)
            if(values[i] > values[this.chosen_move])
                this.chosen_move = i;
        

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


    make_move(column, board, curr_player) {
        var row = 0;
        while( row < board.length && board[row][column] === CELL_STATES.EMPTY) ++row;
        board[row - 1][column] = curr_player;
        return [row - 1, column];
         
    }

    unmake_move(column, board) {
        var row = 0;
        while( row < board.length && board[row][column] === CELL_STATES.EMPTY) ++row;
        board[row][column] = CELL_STATES.EMPTY;
    }
    
    can_make_move(column, board) {
        return board[0][column] === CELL_STATES.EMPTY;
    }

}