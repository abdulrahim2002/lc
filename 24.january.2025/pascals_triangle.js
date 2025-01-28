var generate = function(n) {
    /**
       @n: number of rows
       Output: Pascal's triangle in array form.

       Observation: each element (i,j) in pascals triangle is
       formed by (i-1, j-1) + (i-1, j)

       To generate the pascals triangle, we define the base case:
       [1] which is the pascal's triangle for n=1. Hence i-1 will
       be guranteed to be available.

       Next: j-1 and j might not be available because the j-1 < 0
       or previous row's size is j which makes it undefined.
    */
    n--;    /* decrease n to make it easy to index in the array */

    let pascal = [ [1] ];
    if ( n < 1 ) return pascal;

    for ( let l=1; l <= n; l++ ) {
        let level = new Array(l+1);
        for ( let j=0; j <= l; j++ ) {
            let top_left = (j-1 < 0) ? 0:pascal[l-1][j-1];
            let top = (pascal[l-1][j] == undefined) ? 0:pascal[l-1][j];
            level[j] = top_left + top;
        }
        pascal.push(level);
    }

    return pascal;
};
