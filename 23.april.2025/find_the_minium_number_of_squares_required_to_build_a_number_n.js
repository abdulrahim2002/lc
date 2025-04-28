var numSquares = function(n) {
    /**
       The basic idea to solve this problem is to look it as follows:

       number of squares required to represent an arbritray integer x is either:

       1 + nsq(x-1^2)   // when you look the number as 1^2 + x-1^2
       1 + nsq(x-2^2)   // when you see the number as 2^2 +  x-2^2
       ..
       and so on.

       And this recursively defined function would generate all the possible
       combinations of x being build by squares.

       The dynamic programming approach just stores the results in an array and
       uses the fact that smaller nsq's are calculated first and larger nsq's
       are defined in terms of smaller nsq's
    **/
    const dp = new Array( n+1 ).fill(Infinity);
    dp[0] = 0;

    for ( let i=1; i <= n; i++ ) {
        // fill the dp[i]
        for ( let j=1; j*j <= i; j++ )
            dp[i] = Math.min( dp[i], 1 + dp[i - j*j] );
    }

    return dp[n];
//
//    const memo = new Map();
//
//    var rec = function(n) {
//        if ( memo.has(n) ) return memo.get(n);
//
//        if ( n === 0 ) return 0;
//        let res = Number.MAX_SAFE_INTEGER;
//
//        for ( let i=1; i*i <= n; i++ ) {
//            const test = 1 + rec( n - i*i );
//            console.log( test );
//            res = Math.min( res, test );
//        }
//
//        memo.set( n, res );
//        return res;
//    };
//
//    return rec(n);
};
