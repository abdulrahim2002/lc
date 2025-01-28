var solveNQueens = function(n) {
	if (!n) return [];

	/* Create the board on which to place all the queens. 0 means an
	 * empty position and 1 means a queen is placed */
	let board = new Array(n).fill(null).map(()=>new Array(n).fill(0));

	/* Array to  track columns that are attacked. Since we are
	 * placing queens row by row, it is guranteed that each queen is
	 * placed in a row only once, hence no similar array for rows is
	 * required */
	let attacked_columns = new Array(n).fill(false);
	/* Likewise, we have 2 diagonals, which are either attacked, or
	 * not attacked. The diagonals can be indexed from 0 to n-1
	 * using different formula depending on the diagonal in question
	 * rains left or right. i.e. top right to bottom left or top
	 * left to bottom right.
	 *
	 * (0,0) (0,1) (0,2)	| when looking top right to bottom left
	 * (1,0) (1,1) (1,2)	| diagonal_index = (x+y). When looking
	 * (2,0) (2,1) (2,2)	| top left to bottom right: (n-1 + (x-y))
	 * */
	let attacked_diagonal_rain_left = new Array( 2*n-1 ).fill(false);
	let attacked_diagonal_rain_right = new Array( 2*n-1 ).fill(false);

	let saves = [];

	let place_queen = (x,y) => {
		/* Place a queen at (x,y)th position if it is available
		 * and return true. Otherwise return false */
		if ( attacked_columns[y] || attacked_diagonal_rain_left[x+y] ||
		      attacked_diagonal_rain_right[n-1 + (x-y)] ) return false;
		attacked_columns[y] = true;
		attacked_diagonal_rain_left[x+y] = true;
		attacked_diagonal_rain_right[n-1 + (x-y)] = true;
		board[x][y] = 1;
		return true;
	};


	let remove_queen = (x,y) => {
		/* remove the queen, and make it's attacked column and
		 * diagonals free to roam again  */
		attacked_columns[y] = false;
		attacked_diagonal_rain_left[x+y] = false;
		attacked_diagonal_rain_right[ n-1 + (x-y) ] = false;
        board[x][y] = 0;
	};

	let btsearch = (row) => {
		/* try to place a queen in the row'th row. It can be
		 * placed at any of the column from 0 to n-1. If a valid
		 * position is found, find the valid position for the
		 * next row, in a recursive call. If all queens will be
		 * placed successfully, then row will be n. in that case
		 * save the solution and continue exploring by
		 * returning. */
		if (row == n) {
            saves.push(
                board.map(
                    row => row.map(
                        cell => (cell ? 'Q' : '.')
                    ).join('')
                )
            );
			return;
		}

		for ( let i=0; i < n; i++ ) {
			if ( place_queen( row, i ) ) {
                console.log(`placed at ${row}, ${i}`);
				btsearch( row+1 );
				remove_queen( row, i );
			}
		}
	};

	btsearch(0);
	return saves;
};
