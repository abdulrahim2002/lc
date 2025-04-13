/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function(left, right) {
    let ans = right;
    for ( let i=left; i < right; i++ ) {
        ans &= i;
        if ( !ans ) return 0;
    }
    return ans;
};
