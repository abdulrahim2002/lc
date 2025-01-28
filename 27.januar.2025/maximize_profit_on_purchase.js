var maxProfit = function(a) {
    /**
       Optimal strategy, linear time. Based on differential. basically if you
       made a loss.

       Keep a variable profit to keep track if to keep track of what is the max
       profit that you can make until now. and also keep track of another
       variable, buy price. Which is the buy price for the trade that gives max
       profit.
    */
    let A = a.length;

    let profit = 0;
    let base = a[0];
    for (let i=0; i < A; i++)
        if ( a[i] - base > profit ) profit = a[i]-base;
        base = Math.min(base, a[i]);

    return profit;
};
