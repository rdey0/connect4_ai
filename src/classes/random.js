import {CELL_STATES} from '../utils/enum.js'
import AiModule from './ai_module.js'
/*
 * Like the name implies RandomAi makes moves randomly. RandomAi
 * will however act deliberately if it senses that itself or the 
 * player can win within the next move
 */
export default class RandomAi extends AiModule{
    /*
     * Get the next move by randomly selecting a valid move
     * @board: 2D int array representing state of the game
     * Return: A legal move (int from 0-6)
     */
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
}