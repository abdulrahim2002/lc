/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, t) {
    /**
       Manually fill the dp table. For this, observe carefully how the values
       are being calculated, in the backtracking solution.

       Observations:
       0. dp[i][j] tells us weather s1[i1:], s2[i2:] can interleave to form t[i1+i2:]
       1. dp[i][j] depend depend on dp[i+1][j+1], dp[i+1][j], dp[i][j+1]
       2. dp[i][j] is dp[i+1][j] if only s1's character matches.
                      dp[i][j+1] if only s2's character matches
                      dp[i+1][j] || dp[i][j+1] if both s1's and s2's character matches

       Hence, it makes sense to calculate the table bottom up;
       The next question is what happens when i+1, j+1 are not available. This is why we
       need to make an array of size 1 more than required. i.e.
       dp = size -> ( S1+1, S2+1 )

       This will ensure inclusion of empty strings. For example. s1 = "as". s2 = ""
       t = "as" then s1 alone can yield the result, and it would be in dp[0][1]
       where. nothing is included from s2.

       These values need to be calculated.
     **/
    let S1 = s1.length, S2 = s2.length, T = t.length;
    if ( S1 + S2 !== T ) return false;

    let dp = new Array( S1+1 ).fill(null).map( () => new Array( S2+1 ).fill(-1) );

    // single pass optimization
    for ( let i = S1; i >= 0; i-- ) {
        for ( let j = S2; j >= 0; j-- ) {
            let x = i + j;

            // take nothing from both strings
            if ( i == S1 && j == S2 ) { dp[i][j] = true; continue; }

            // take nothing from s1
            else if ( i == S1 ) {
                if ( dp[i][j+1] && s2[j] == t[x] ) dp[i][j] = true;
                else dp[i][j] = false;
                continue;
            }

            // take nothing from s2
            else if ( j == S2 ) {
                if ( dp[i+1][j] && s1[i] == t[x] ) dp[i][j] = true;
                else dp[i][j] = false;
                continue;
            }

            // update logic described above
           let c1 = s1[i];
           let c2 = s2[j];

           // take character from s1
           if ( c1 == t[x] && c2 != t[x] )
               dp[i][j] = dp[i+1][j];

           // take character from s2
           else if ( c1 != t[x] && c2 == t[x] )
               dp[i][j] = dp[i][j+1];

           // take either
           else if ( c1 == t[x] && c2 == t[x] )
               dp[i][j] = dp[i+1][j] || dp[i][j+1];

           // take neither
           else dp[i][j] = false;
        }
    }
    return dp[0][0];

//    // s1[S1:]='' s2[S2:]='' can yield t[S1+S2:]=''
//    dp[S1][S2] = true;
//
//    // nothing included from s1. i.e. dp[S1][x]
//    for ( let j=S2-1; j >= 0; j-- ) {
//        let i = S1, x = i + j;
//        if ( dp[i][j+1] && s2[j] == t[x] ) dp[i][j] = true;
//        else dp[i][j] = false;
//    }
//
//    // nothing included from s2. i.e. dp[x][S2]
//    for ( let i=S1-1; i >= 0; i-- ) {
//        let j = S2, x = i + j;
//        if ( dp[i+1][j] && s1[i] == t[x] ) dp[i][j] = true;
//        else dp[i][j] = false;
//    }
//
//    // calculate the dp table
//    for ( let i=S1-1; i >= 0; i-- ) {
//        for ( let j=S2-1; j >= 0; j-- ) {
//            let x = i+j;
//            let s1_char = s1[i];
//            let s2_char = s2[j];
//
//            if ( s1_char == t[x] && s2_char != t[x] )
//                dp[i][j] = dp[i+1][j];
//
//            else if ( s1_char != t[x] && s2_char == t[x] )
//                dp[i][j] = dp[i][j+1];
//
//            else if ( s1_char == t[x] && s2_char == t[x] )
//                dp[i][j] = dp[i+1][j] || dp[i][j+1];
//
//            else dp[i][j] = false;
//        }
//    }
//
//    console.log(dp);

//    return dp[0][0];


    /** Implement memoization. Once, we explore the path by selecting character
        s1[i]. Then it will calculate a lot of values before returning. After
        that when s2[i] is explored. The same values are recomputed. Avoid this
        by using memoization.
    ***/

    // -1 means not calculated. other wise true or false
//    let dp = new Array( S1 ).fill( null ).map( () => new Array(S2).fill(-1) );

    // let bt_search = ( i1, i2 ) => {
    //     /** Checks if s1[i1:] and s2[i2:] can interleave to form t[x:] **/
    //     let x = i1 + i2;

    //     // s1 s2 and t exhausted
    //     if ( i1 == s1.length && i2 == s2.length && x == t.length )
    //         return true;
    //     // one of s1 or s2 exhausted. the other must yield t
    //     if ( i1 == s1.length || i2 == s2.length )
    //         return s1.slice(i1) + s2.slice(i2) == t.slice(x);

    //     // memoization
    //     let res =  dp[i1][i2];
    //     if ( res !== -1 ) return res;

    //     // s1's charecter matched, but not s2's, pick s1[i]
    //     if ( s1[i1] == t[x] && t[x] != s2[i2] )
    //         res =  bt_search( i1+1, i2 );
    //     // s2's character matched,  but not s1's, pick s2[i]
    //     else if ( s1[i1] != t[x] && t[x] == s2[i2] )
    //         res =  bt_search( i1, i2+1 );
    //     // neither of the characters matched. Hence, not possible
    //     else if ( s1[i1] != t[x] && t[x] != s2[i2] )
    //         res = false;
    //     // both s1 and s2 @i matched. Explore both paths
    //     else {
    //         if ( bt_search( i1+1, i2 ) ) res = true;
    //         else res =  bt_search( i1, i2+1 );
    //     }

    //     dp[i1][i2] = res;
    //     return res;
    // }

    // let res =  bt_search(0, 0);

    // return res;

    /** Basic backtracking based solution. Gives TLE, but works after hardcoding
     * some long testcases.
    ***/
    // let bt_search = ( i1, i2 ) => {
    //     /** Checks if s1[i1:] and s2[i2:] can interleave to form t[x:] **/
    //     let x = i1 + i2;
    //     // s1 s2 and t exhausted
    //     if ( i1 == s1.length && i2 == s2.length && x == t.length )
    //         return true;
    //     // one of s1 or s2 exhausted. the other must yield t
    //     if ( i1 == s1.length || i2 == s2.length )
    //         return s1.slice(i1) + s2.slice(i2) == t.slice(x);

    //     // s1's charecter matched, but not s2's, pick s1[i]
    //     if ( s1[i1] == t[x] && t[x] != s2[i2] )
    //         return bt_search( i1+1, i2 );
    //     // s2's character matched,  but not s1's, pick s2[i]
    //     else if ( s1[i1] != t[x] && t[x] == s2[i2] )
    //         return bt_search( i1, i2+1 );
    //     // neither of the characters matched. Hence, not possible
    //     else if ( s1[i1] != t[x] && t[x] != s2[i2] )
    //         return false;
    //     // both s1 and s2 @i matched. Explore both paths
    //     else {
    //         if ( bt_search( i1+1, i2 ) ) return true;
    //         else return bt_search( i1, i2+1 );
    //     }
    // }

    // return bt_search( 0, 0 );
};
