/*
     * The indices of adjacent cells is given by:
     * ┌────────────┬────────────┬────────────┐
     * │ (i-1, j-1) │ (i-1, j)   │ (i-1, j+1) │
     * ├────────────┼────────────┼────────────┤
     * │ (i,   j-1) │ (i,   j)   │ (i,   j+1) │
     * ├────────────┼────────────┼────────────┤
     * │ (i+1, j-1) │ (i+1, j)   │ (i+1, j+1) │
     * └────────────┴────────────┴────────────┘
*/

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    /**
       Approach 1:
       The most barberic way of doing this is just finding the length of the
       longest path for each cell in matrix. Considering that cell as the
       starting point. Finally, return the maximum length of the longest paths
       comparing all the cells.
       Time: O( n^2 * 4^(n^2) )
       Space: O(n^2)

       We can use a memoization table and the complexity comes down to:
       Time: O(n^2)
       Space; O(n^2)
    **/
    const M = matrix.length,
          N = matrix[0].length,
          memo = Array.from({length:M},()=>new Array(N).fill(-1));

    const longest_path = ( i, j ) => {
        if ( !( 0 <= i && i < M && 0 <= j && j < N ) )
            throw new Error("Invalid index");

        if ( memo[i][j] !== -1 ) return memo[i][j];

        // mark this cell as visited, to avoid revisiting
        const cur_val = matrix[i][j]; matrix[i][j] = -1;

        let max_path = 0;

        // top
        if ( i-1 >= 0 &&
             matrix[i-1][j] != -1 &&
             matrix[i-1][j] > cur_val )
            max_path = Math.max( max_path, longest_path( i-1, j ) );

        // bottom
        if ( i+1 < M &&
             matrix[i+1][j] != -1 &&
             matrix[i+1][j] > cur_val )
            max_path = Math.max( max_path, longest_path( i+1, j ) );

        // right
        if ( j+1 < N &&
             matrix[i][j+1] != -1 &&
             matrix[i][j+1] > cur_val )
            max_path = Math.max( max_path, longest_path( i, j+1 ) );

        // left
        if ( j-1 >= 0 &&
             matrix[i][j-1] != -1 &&
             matrix[i][j-1] > cur_val )
            max_path = Math.max( max_path, longest_path( i, j-1 ) );

        matrix[i][j] = cur_val;
        memo[i][j] = 1+max_path;

        return memo[i][j];
    };

    let g_max = 0;
    for ( let i=0; i < M; i++ )
        for ( let j=0; j < N; j++ )
            g_max = Math.max( g_max, longest_path(i, j) );

    return g_max;
};
