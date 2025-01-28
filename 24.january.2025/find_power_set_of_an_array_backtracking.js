var subsetsWithDup = function(a) {
    /**
       You need backtracking to solve this problem. Since subsets can be
       noncontiguous, it is not possible to generate subsets like subarrays
       using 2 loops. At each iteration, you need to check if adding this
       element does not give a duplicate sub array.
     */
    let A = a.length;
    let powerset = [];
    let subset = [];
    a.sort( (a,b) => a-b );

    let btsearch = ( start ) => {
        powerset.push([...subset]);

        for (let i=start; i < A; i++) {
            if ( i > start && a[i] === a[i-1] ) continue;
            subset.push(a[i]);
            btsearch( i+1 );
            subset.pop();
        }
    };

    btsearch(0);
    return powerset;
};
