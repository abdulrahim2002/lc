var maxProfit = function(a) {
    let A = a.length;
    let profit = 0;
    for (let i=0; i < A-1; i++)
        if ( a[i+1]-a[i] > 0 ) profit += a[i+1]-a[i];
    return profit;
};
