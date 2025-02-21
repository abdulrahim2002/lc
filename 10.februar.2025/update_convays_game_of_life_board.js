var gameOfLife = function(board) {
    /**
       1 Any live cell with fewer than two live neighbors dies as if caused by under-population.
       2 Any live cell with two or three live neighbors lives on to the next generation.
       3 Any live cell with more than three live neighbors dies, as if by over-population.
       4 Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

       Algorithm:
       Step 1: Calculate the new states, and put these in the second to left bits
       For each node in the board:

       if ( node is live and has live neightbours between  [2,3] )
       Keep the node alive: board[i][j] |= 2;     :: 01 | 10 = 11
       {otherwise it becomes dead, which is already represented}

       if ( node is dead and has 3 live neighbours )
       Make the node alive: board[i][j] |= 2;     :: 00 | 10 = 10
       {otherwise it stays dead, which is already represented}

       Step 2: Shift the bits for each element, to get the second bit from left (current state)
    **/
    let m = board.length;
    let n = board[0].length;

    var delta = [
        [-1,-1], // top left
        [-1,0],  // top
        [-1,1],  // top right
        [0,-1],  // left
        [0,1],   // right
        [1,-1],  // bottom left
        [1,0],   // bottom
        [1,1],   // bottom right
    ];

    let count_live_neighbours = (x,y, delta) => {
        let count = 0;
        let i; let j;

        for ( [d_x, d_y] of delta ) {

            [i,j] = [x + d_x, y + d_y];

            if ( ( 0 <= i && i < m && 0 <= j && j < n ) && (board[i][j] & 1) )
                count++;
        }

        return count;
    };

    for (let i=0; i < m; i++)
        for (let j=0; j < n; j++) {

            let ln = count_live_neighbours(i,j, delta);

            if ( ( board[i][j] & 1 ) && ( ln == 2 || ln == 3 ) )
                board[i][j] |= 2;

            if ( !( board[i][j] & 1 ) && ln == 3 )
                board[i][j] |= 2;
        }

    for (let i=0; i < m; i++)
        for (let j=0; j < n; j++)
            board[i][j] >>= 1;
};
