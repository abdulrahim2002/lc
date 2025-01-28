var uniquePathsWithObstacles = function(a) {
    /* Initialize paddings. If the current block
       is occupied, all blocks after it are occupied
       othervise, all are marked as available.
    */
    let m = a.length;
    let n = a[0].length;
    if (a[0][0]==1 || a[m-1][n-1]==1) return 0;
    if (m==1 && n==1) return 1;

    let b = 1;
    for (let i=m-2; i >= 0; i--) {
        a[i][n-1] = (a[i][n-1] ^ b) && b;
        b = a[i][n-1]
    }

    b = 1;
    for (let j=n-2; j >= 0; j--) {
        a[m-1][j] = (a[m-1][j] ^ b) && b;
        b = a[m-1][j];
    }

    for ( let i=m-2; i>=0; i-- )
        for ( let j=n-2; j>=0; j--)
            a[i][j] = (a[i][j]==1) ? 0:a[i+1][j] + a[i][j+1];

    return a[0][0];
};
