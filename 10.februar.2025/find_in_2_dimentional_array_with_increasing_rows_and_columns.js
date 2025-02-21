var searchMatrix = function(matrix, target) {
    /**
       An approach can do it in O( m + n ) linear time. By just walking over the
       array. In this approach we:

       start from top right
       if (target < element) move left        // move in decresing order
       if (element < target) move bottom     // move in increasing order

    **/
    let m = matrix.length, n = matrix[0].length;
    let i = 0, j = n-1; /* start from top right corner */

    while ( ( i < m && j >= 0 ) ) {
        let elem = matrix[i][j];
        if ( elem < target ) i++;
        else if ( target < elem ) j--;
        else return true;
    }

    return false;
};
