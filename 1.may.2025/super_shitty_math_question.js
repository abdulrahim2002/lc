/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
    /**
       All i can say is that this is super shit question
    **/
    if (n == 2) return 1;
    if (n == 3) return 2;

    let num_3 = Math.floor(n/3);
    let remainder = n % 3;

    if (remainder == 1) {
        remainder = 4;
        num_3 --;
    }
    else if (remainder == 0)
        remainder = 1;

    return Math.floor( Math.pow(3, num_3) ) * remainder ;

};
