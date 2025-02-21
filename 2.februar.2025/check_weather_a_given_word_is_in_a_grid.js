var exist = function(board, word) {
    /* this problem can be solved by backtracking based solution and even simple
       searching. Woof, atleast i solved the problem, now there are many
       optimizations possible. First, if a path is found then you don't need to
       search any further. Return immediately. Secondly, instead of keeping a
       board state, use an index in the string to signify that everything before
       this index has been found, and when this index goes out of bonunds, you
       found the solution. Thirdly, keep a set to keep track of the paths
       visited, instead of keeping the board state. This saves space, and if
       path is needed, then it can be used.
    */
    let m = board.length; let n = board[0].length;


    let btsearch = (i, j, s_ind) => {
        if ( s_ind == word.length ) return true;

        if (!( 0 <= i && i < m && 0 <= j && j < n ))
            return false;

        if ( board[i][j] !== word[s_ind] ) return false;

        let tmp = board[i][j]; // save board
        board[i][j] = '#'; // characters will never match this character so the above
                            // check is sufficient to detect collision in path

        /* explore all directions */
        if ( btsearch( i+1, j, s_ind+1) ) // bottom: i+1, j
            return true;

        if ( btsearch( i, j+1, s_ind+1 ) ) // right: i, j+1
            return true;

        if ( btsearch( i-1, j, s_ind+1 ) ) // top: i-1, j
            return true;

        if ( btsearch( i, j-1, s_ind+1 ) ) // left: i, j-1
            return true;

        board[i][j] = tmp;
    };


    for (let i=0; i < m; i++)
        for (let j=0; j < n; j++)
            if ( btsearch( i, j, 0 ) )
                return true;

    return false;

//    /************************************************************/
//    let m = board.length;
//    let n = board[0].length;
//    word = word.split('').reverse();
//    let exists = false;
//    /********** create an auxilary board, to track used positions */
//    let board_state = new Array(m).fill(null).map(
//        () => new Array(n).fill(false)
//    );
//
//    /*********is this valid coordinate on the board***************/
//    let valid = (x,y) => {
//        if ( 0 <= x && x < m && 0 <= y && y < n ) return true;
//        else return false;
//    };
//    /************************************************************/
//
//    let btsearch = ( i, j) => {
//        if (!word.length) {
//            exists = true;
//            return;
//        }
//
//        let current = word.pop();
//
//        if ( board[i][j] !== current  ) {
//            word.push(current);
//            return;
//        }
//
//        if (!word.length) exists = true;
//        board_state[i][j] = true;
//
//        /* explore all directions */
//        if ( valid(i+1, j) && !board_state[i+1][j] ) // bottom: i+1, j
//            btsearch( i+1, j);
//
//        if ( valid(i, j+1) && !board_state[i][j+1] ) // right: i, j+1
//            btsearch( i, j+1 );
//
//        if ( valid(i-1, j) && !board_state[i-1][j] ) // top: i-1, j
//            btsearch( i-1, j );
//
//        if ( valid(i, j-1) && !board_state[i][j-1] ) // left: i, j-1
//            btsearch( i, j-1 );
//
//        board_state[i][j] = false;
//        word.push(current);
//        return;
//    };
//
//    /*******************************************************/
//    for (let i=0; i < m; i++)
//        for (let j=0; j < n; j++)
//            btsearch( i, j);
//    /*******************************************************/
//
//    return exists;
};
