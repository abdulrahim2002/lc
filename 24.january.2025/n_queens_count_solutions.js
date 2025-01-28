var totalNQueens = function(n) {
    /**
       For each row, try to place a queen at one of it its column. If a row is
       placed try to place the next queen in the next row recursively.

       place at ith row: iterate over the row and find the first available
       place. place the queen (change the board state), and recursively call the
       function itself on i+1th row. after the call returns, undo/unplace the
       queen. and find the next valid position in the same column.
    */

    /* Space: O( n + 2*n^2 ) = O(n^2) */
    /* define a board that holds board state. 0 means available, 1 means placed */
    let board = new Array(n).fill(null).map( () => new Array(n).fill(0) );
    let attacked_columns = new Array(n).fill(false);
    let attacked_diagonal_rain_left = new Array( 2*n -1).fill(false);
    let attacked_diagonal_rain_right = new Array( 2*n - 1 ).fill(false);
    let solutions = 0; /* number of solutions */

    let place = (x, y) => {
        /* place a queen at (x,y)th place in the board. Return true if queen can
         * be placed, false otherwise. Each time a queen is tried to be placed,
         * we need to check if the queen will be under attack should it be
         * placed here. This can best be done by keeping track of the rows,
         * columns, and diagonals under attack. Since, we are placed queens row
         * by row, and removing them once their solutions are determined. We do
         * not need to keep track of attacked rows.
         */
        if ( attacked_columns[y] || attacked_diagonal_rain_left[ x+y ] ||
             attacked_diagonal_rain_right[(n-1) + ( x-y )] ) return false;

        attacked_columns[y] = attacked_diagonal_rain_left[ x+y ] = true;
        attacked_diagonal_rain_right[ (n-1) + (x-y) ] = true;

        board[x][y] = 1;

        return true;
    };

    let remove = (x,y) => {
        /* remove a queen from (x,y)th position */
        attacked_columns[y] = attacked_diagonal_rain_left[ x+y ] =  false;
        attacked_diagonal_rain_right[ (n-1) + (x-y) ] = false;

        board[x][y] = 0;
    };

    /* T(n) = n * T(n-1)
       Time Complexity: O(n!)
     */
    let place_at_row = (row) => {
        if ( row === n ) {
            /* all queens are placed, increment solution */
            solutions++;
            return;
        }

        for ( let i=0; i < n; i++ ) {
            if ( !place(row, i) ) continue;
            place_at_row( row+1 );
            remove( row, i );
        }
    };

    place_at_row(0);
    return solutions;
};
