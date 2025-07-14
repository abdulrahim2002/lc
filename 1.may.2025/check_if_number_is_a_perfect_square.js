/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function( n ) {
    if ( n < 4 ) return n === 1;

    let i = 0, j = n/2;
    while ( i <= j ) {
        const mid = i + Math.floor( (j-i)/2 );
        const sq = mid*mid;
        if ( sq === n ) return true;
        else if ( sq > n ) j = mid-1;
        else i = mid+1;
    }
    return false;
};
