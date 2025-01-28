var merge = function(a) {
    let A = a.length;
    /**

    */
    a.sort( ( a,b ) => a[0] - b[0] );
    let h = 0;
    let overlap = 0;
    let res = [];

    while ( h < A ) {
        if ( overlap ) {
            if ( overlap >= a[h][0] )
                overlap = Math.max( overlap, a[h][1] );
            else {
                res[ res.length-1 ][1] = overlap;
                overlap = 0;
                res.push( a[h] );
            }

        }
        else {
            if ( h > 0 && a[h-1][1] >= a[h][0] ) {
                overlap = Math.max( a[h-1][1], a[h][1] );
            }
            else res.push(a[h]);
        }
        h++;
    }

    if ( overlap ) res[ res.length-1 ][1] = overlap;

    return res;
};
