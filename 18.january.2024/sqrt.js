var mySqrt = function(x) {
    let i=0;
    let j=x+2; /** x+2 to handle 0 and 1 */

    while ( true ) {
        let mid = i + Math.floor((j-i)/2);
        midsq = mid*mid;

        if ( midsq == x ) return mid;
        if ( midsq > x ) j=mid;
        if ( midsq < x ) i=mid;

        if ( midsq < x && (mid+1)*(mid+1) > x )
            return mid;
    }

    return undefined;
};
