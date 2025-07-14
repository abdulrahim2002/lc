/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let i = 0,
        j = n;

    while ( i <= j ) {
        const mid = i + Math.floor( (j-i)/2 );
        const comp = guess(mid);

        if ( comp === 0 )
            return mid;
        else if ( comp === -1 )
            j = mid-1;
        else i = mid+1;
    }

    return -1;
};
