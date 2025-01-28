var maxProfit = function(a) {
    /**
       Desi investor strategy. Har din trade execute kar.
       Badh rha hai to kharid le. Gir rha hai to bechde.
    */
    let A = a.length;
    let profit = 0;

    for (let i=0; i < A-1; i++)
        if ( (a[i+1]-a[i]) > 0) profit += a[i+1]-a[i];

    return profit;
};
