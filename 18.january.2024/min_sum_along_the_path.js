var minPathSum = function(a) {
    let m = a.length;
    let n = a[0].length;

    if ( m==1 && n==1 ) return a[0][0];
    /*
      Initialize paddings. Each value is this_value + value a step after this
      value.
    */
    for (let i=m-2; i>=0; i--)
        a[i][n-1]+=a[i+1][n-1];
    for (let j=n-2; j>=0; j--)
        a[m-1][j]+=a[m-1][j+1];

    for (let i=m-1; i>=0; i--)
        for (let j=n-1; j>=0; j--)
            a[i][j] += Math.min(a[i+1][j], a[i][j+1]);


    return a[0][0];
};
