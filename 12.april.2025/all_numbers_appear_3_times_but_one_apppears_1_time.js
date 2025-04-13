/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    /**
       Every element appears 3 times except for one. Which appears once, find
       that number.

       Appraoch 1: Crete a frequency map. Find the number with frequency = 1.
       return it.

       Appraoch 2: Bit sorcery
       https://leetcode.com/problems/single-number-ii/solutions/43295/detailed-explanation-and-generalization-of-the-bitwise-operation-method-for-single-numbers/
    **/
    let x1 = 0,
        x2 = 0,
        mask = 0;

    for ( let i of nums ) {
        x2 ^= x1 & i;
        x1 ^= i;
        mask = ~( x1 & x2 );
        x2 &= mask;
        x1 &= mask;
    }

    return x1;

//    let freq = {};
//
//    for ( let num of nums )
//        freq[num] = (freq[num] | undefined) + 1;
//
//    for ( let [ num, v ] of Object.entries(freq) )
//        if ( v == 1 ) return +num;
};
