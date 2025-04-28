/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    /**
       There is actually a relation between current sequence of ugly numbers and
       the next ugly number that would be generated.

       The idea is to keep track of 3 pointers: i, j, k
       initialize with 0.
       the next ugly number is always given by: min( a[i]*2, a[j]*3, a[k]*5 )
       for all pointers who yielded the next ugly number: increment them
    **/
    let a = [1];
    let i = j = k = 0;

    while ( a.length < n ) {
        const next = Math.min( a[i]*2, a[j]*3, a[k]*5 );
        a.push(next);

        if ( a[i]*2 === next ) i++;
        if ( a[j]*3 === next ) j++;
        if ( a[k]*5 === next ) k++;
    }

    return a[a.length-1];
};
