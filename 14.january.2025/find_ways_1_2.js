var permute = (x,y) => {
    /* compute (x+y)! / x! y! without computing factorials */
    /* which is basically computing x+y x+y-1 x+y-2 .. y+1 / x! */
    var denom = 1;
    for (var i=1; i <= x; i++) denom *= i;

    var numi = 1;
    for (var i = y+1; i <= x+y; i++) numi *= i;

    return numi/denom;
};



var climbStairs = function(n) {
    /* The number of ways in which we can get n by adding only 1 and 2
       Let,
       1x + 2y = n ---(1)
       then we need to find the number of integer solutions to this equation.
       that is S = {x,y | x,y in integers}  we need to return |S| i.e. the
       number of elements in this solution set.
       from (1) it implies x = n - 2y ---(2)
       y $(B":(B [0,n/2] i.e. consequently x $(B":(B [0,n]
       hence, iterate over y from 0 to n/2 such that y is integer.
       we find the corrosponding solution using equation 2
    */
    let n_solutions = 0 ;

    for (var y=0; y <= Math.floor(n/2); y++ ) {
        var x = n - (2 * y);
        n_solutions += permute(x,y);
    }

    return  (n_solutions);
};
