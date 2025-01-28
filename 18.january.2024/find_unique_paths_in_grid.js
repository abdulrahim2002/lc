var uniquePaths = function(m, n) {
    /**
   Does the job, but for large m and n. the recursive calls will
   increase. And hence will excede 256 calls limit.

   Try to do iteratively. It also does not help, becase at each
   step, you are exploring double the number of nodes at previous
   step. Which makes the time complexity O(2^n).

   The optimal solution in this case is to use dynamic programming.
    */
    let u_path = new Array(m).fill(null).map( () => new Array(n).fill(1) );

    /* iterate from m-2,n-2 -> 0,0, in the reverse order. */
    for (let i=m-2; i>=0; i-- ) {
        for (let j=n-2; j>=0; j--) {
            u_path[i][j] = u_path[i][j+1] + u_path[i+1][j];
        }
    }

    return u_path[0][0];
//    if (!m || !n) return 1;
//
//    let u_path = 0;
//    let visiting_list = [ [0,0] ];
//
//    while (visiting_list.length) {
//        let [i,j] = visiting_list.shift();
//        if ( i==m-1 && j==n-1 ) u_path++;
//        if ( j+1 < n ) visiting_list.push( [i,j+1] );
//        if ( i+1 < m ) visiting_list.push( [i+1,j] );
//    }
//
//    return u_path;
//
//    let explore = (i,j) => {
//        if ( i==m-1 && j==n-1 ) {
//            u_path++;
//            return;
//        }
//
//        if ( j+1 < n ) explore(i,j+1);
//        if ( i+1 < m ) explore(i+1,j);
//    };
//
//    explore(0,0);
//    return u_path;
};
