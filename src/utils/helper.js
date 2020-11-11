import {CELL_STATES, GAME_STATES} from './enum.js'

export function transpose(matrix) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

export function is_valid_move(matrix, column) {
    return matrix[0][column] === CELL_STATES.EMPTY;
}


function check_left_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player){
    var num_consecutive = 1;
    //check top left diagonal
    for(let i = 1; row - i >= 0 && col - i >= 0; i++){
      if(board[row-i][col-i] === curr_player)
        num_consecutive += 1;
      else
        break;
    }
    //check bottom right diagonal
    for(let i = 1; row + i < num_rows && col + i < num_cols; i++){
      if(board[row+i][col+i] === curr_player)
        num_consecutive += 1;
      else
        break;
    }
    return (num_consecutive >= num_to_win)
}

function check_vertical(board, row, col, num_rows, num_to_win, curr_player){
    var num_consecutive = 1;
    //check bottom vertical
    for(var i = 1; row + i < num_rows; i++){
        if(board[row+i][col] === curr_player)
            num_consecutive += 1;
        else
            break;
    }
    return (num_consecutive >= num_to_win);
}

function check_right_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player){
    var num_consecutive = 1;
    //check top right diagonal
    for(let i = 1; row - i >= 0 && col + i < num_cols; i++){
        if(board[row-i][col+i] === curr_player)
            num_consecutive += 1;
        else
            break;
    }
    //check bottom left diagonal
    for(let i = 1; row + i < num_rows && col - i >= 0; i++){
        if(board[row+i][col-i] === curr_player)
            num_consecutive += 1;
        else
            break;
    }
    return (num_consecutive >= num_to_win);
}

function check_horizontal(board, row, col, num_cols, num_to_win, curr_player){
    var num_consecutive = 1;
    //check right horizontal
    for(let i = 1; col + i < num_cols; i++){
        if(board[row][col+i] === curr_player)
            num_consecutive += 1;
        else
            break;
    }
    //check left horizontal
    for(let i = 1; col - i >= 0; i++){
        if(board[row][col-i] === curr_player)
            num_consecutive += 1;
        else
            break;
    }
    return (num_consecutive >= num_to_win);
}

function board_is_full(matrix) {
    for(let j = 0; j < matrix[0].length; ++j){
        if(matrix[0][j] === CELL_STATES.EMPTY)
            return false
    }
    return true
}

export function get_game_state(board, row, col, num_to_win, curr_player) {
    var num_rows = board.length;
    var num_cols = board[0].length;
    var someone_won = (check_left_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player) ||
        check_vertical(board, row, col, num_rows, num_to_win, curr_player) ||
        check_right_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player)||
        check_horizontal(board, row, col, num_cols, num_to_win, curr_player));

    if(someone_won)
        return GAME_STATES.WIN;
    if(board_is_full(board))
        return GAME_STATES.DRAW;
    return GAME_STATES.ONGOING;
}

export function make_copy(board){
    var copy = [];
      for (var i = 0; i < board.length; i++)
          copy[i] = board[i].slice();
    return copy;
}

export function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms )
    })
}

export function get_winning_move(board, row, col, num_to_win, curr_player) {
    var num_rows = board.length;
    var num_cols = board[0].length;
    var left_diagonal = get_left_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player);
    if(left_diagonal)
        return left_diagonal;

    var vertical = get_vertical(board, row, col, num_rows, num_to_win, curr_player);
    if(vertical)
        return vertical;

    var right_diagonal = get_right_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player);
    if(right_diagonal)
        return right_diagonal;

    var horizontal = get_horizontal(board, row, col, num_cols, num_to_win, curr_player);
    if(horizontal)
        return horizontal;
    //return null if there were no winning moves to be found
    return null;
}
/*
 * Returns the winning moves (array of [row, column] coordinate pairs) of the left diagonal if they exist.
 * If there is no winning move, null is returned.
 */
function get_left_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player){
    var winning_moves = [[row,col]];
    var num_consecutive = 1;
    //check top left diagonal
    for(let i = 1; row - i >= 0 && col - i >= 0; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row-i][col-i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row-i,col-i])
        }else{
            break;
        } 
            
    }

    if(num_consecutive === num_to_win)
        return winning_moves;

    //check bottom right diagonal
    for(let i = 1; row + i < num_rows && col + i < num_cols; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row+i][col+i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row+i,col+i])
        }else{
            break;
        }
            
    }

    if(num_consecutive === num_to_win)
        return winning_moves;
    return null;
}

function get_vertical(board, row, col, num_rows, num_to_win, curr_player){
    var winning_moves = [[row,col]];
    var num_consecutive = 1;
    //check bottom vertical
    for(var i = 1; row + i < num_rows; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row+i][col] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row+i,col]);
        }else{
            break;
        }
            
    }
    if(num_consecutive === num_to_win)
            return winning_moves;
    return null;
}

function get_right_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player){
    var winning_moves = [[row,col]];
    var num_consecutive = 1;
    //check top right diagonal
    for(let i = 1; row - i >= 0 && col + i < num_cols; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row-i][col+i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row-i,col+i]);
        }else{
            break;
        }  
    }

    if(num_consecutive === num_to_win)
            return winning_moves;

    //check bottom left diagonal
    for(let i = 1; row + i < num_rows && col - i >= 0; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row+i][col-i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row+i,col-i]);
        }else
            break;
    }
    if(num_consecutive === num_to_win)
            return winning_moves;
    return null;
}

function get_horizontal(board, row, col, num_cols, num_to_win, curr_player){
    var winning_moves = [[row,col]];
    var num_consecutive = 1;
    //check right horizontal
    for(let i = 1; col + i < num_cols; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row][col+i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row,col+i]);
        }else
            break;
    }

    if(num_consecutive === num_to_win)
            return winning_moves;

    //check left horizontal
    for(let i = 1; col - i >= 0; i++){
        if(num_consecutive === num_to_win)
            return winning_moves;
        if(board[row][col-i] === curr_player){
            num_consecutive += 1;
            winning_moves.push([row,col-i]);
        }else
            break;
    }
    if(num_consecutive === num_to_win)
            return winning_moves;
    return null;
}