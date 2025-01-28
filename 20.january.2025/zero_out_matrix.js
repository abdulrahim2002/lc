var setZeroes = function(mat) {
    /**
       Step 1: Make a list of to_delete columns and to_delete rows.
       Step 2: Iterate over the table and populate these lists, by finding
       where does 0 occur.
       Step 3: Ground all those rows and columns for which were suppose to be grounded.

       Another approach is to iterate over rows and for each row, go to every call to
       determine if this row needs to be grounded, if yes. then ground the row.

       Similarly repeat for the columns. But this approach suffers from variable
       pollution, Once we ground a row, and then we try to execute code for columns, we
       find that all culumns need to be grounded, since some row was grounded. How to solve.

       The idea is to iterate over the entire matrix and once you find a zero
       element, mark in the first row that this column needs to be deleted. And
       the first column in that row that this row needs to be deleted. The you
       will be able to look at the first row, to find out weather this column needs to be
       deleted, and the first column, that this row needs to be deleted.

       The only problem is that you need to first decide that weather first row or first
       column itself needs to be deleted.

       Time: O( 2 * (m*n) + 2 (m+n) )
       Space: O(1)
    */
    let m = mat.length;
    let n = mat[0].length;


    let delete_first_row = false;
    let delete_first_column = false;

    for (let j=0; j < n; j++)
        if ( mat[0][j] === 0 ) delete_first_row = true;

    for (let i=0; i < m; i++)
        if ( mat[i][0] === 0 ) delete_first_column = true;

    for (let i=0; i < m; i++) {
        for (let j=0; j < n; j++) {
            if ( mat[i][j] === 0 ) {
                mat[i][0] = 0; // flag that this row needs to be deleted
                mat[0][j] = 0; // flag that this column needs to be deleted
            }
        }
    }

    for ( let j=1; j < n; j++ )
        for ( let i=1; i < m; i++ )
            if ( mat[0][j]===0 || mat[i][0]===0 ) mat[i][j] = 0;

    if ( delete_first_row )
        for (let j=0; j < n; j++) mat[0][j] = 0;

    if ( delete_first_column )
        for (let i=0; i < m; i++) mat[i][0] = 0;


};
