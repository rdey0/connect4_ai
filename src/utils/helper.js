import STATES from './enum.js'

export function transpose(matrix) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

export function is_valid_move(matrix, column) {
    return matrix[0][column] === STATES.EMPTY;
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

export function is_game_over(board, row, col, num_to_win, curr_player) {
    var num_rows = board.length;
    var num_cols = board[0].length;
    return check_left_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player) ||
        check_vertical(board, row, col, num_rows, num_to_win, curr_player) ||
        check_right_diagonal(board, row, col, num_rows, num_cols, num_to_win, curr_player)||
        check_horizontal(board, row, col, num_cols, num_to_win, curr_player);
}