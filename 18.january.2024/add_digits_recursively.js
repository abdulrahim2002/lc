/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(n) {
    n = n.toString();
    let new_n = 0;
    for (i of n) new_n += +i;
    if (! Math.floor(new_n/10) ) return new_n;
    return addDigits(new_n);
};
