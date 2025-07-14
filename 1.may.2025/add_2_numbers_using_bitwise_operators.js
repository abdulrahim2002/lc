/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    // https://leetcode.com/problems/sum-of-two-integers/solutions/132479/simple-explanation-on-how-to-arrive-at-the-solution/
    // store the answer in a. b stores the carry.
    return b == 0 ? a : getSum( a^b, (a&b)<<1  );
};


//var getSum = function(a, b) {
//    // https://leetcode.com/problems/sum-of-two-integers/solutions/132479/simple-explanation-on-how-to-arrive-at-the-solution/
//    // store the answer in a. b stores the carry.
//    let c;
//
//    while ( b != 0 ) {
//        c = (a&b);
//        a = a^b;
//        b = c << 1;
//    }
//    return a;
//};
//
//
