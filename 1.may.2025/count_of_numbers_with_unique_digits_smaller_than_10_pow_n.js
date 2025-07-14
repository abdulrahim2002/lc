/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function(n) {
    /** For n=1 -> 0. For n=2, we have 2 digit numbers. which can be formed by
     * digits i,j. For each i, there are 9 unique j's. So f(2) -> 9*9. For n=3,
     * we have ijk. No of unique numbers -> unique i,j (81) * k which is not i
     * or j. Hence, 9*9*8. Similarly, f(4) -> 9*9*8 * (7) ... f(11) -> 0. There
     * are no unique numbers in an 11 digit number (since digits themselves are
     * 10) **/
    if ( n === 0 ) return 1;
    if ( n === 1 ) return 10;

    let ans = 10;

    for ( let unique=9, rem=9, i=1;
          i < n;
          i++, unique*=rem, rem--, ans+=unique  );

    return ans;
};
