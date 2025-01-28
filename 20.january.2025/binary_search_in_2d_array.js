var searchMatrix = function(a, target) {
    /**
       Operate like a simple binary search. Just what we did is that we found a
       way to find 2 dimentional array index from a single number. i.e. we found
       a mapping between:

       index (if it were linear array) => index_x, index_y
                                (if its 2 dimentional array)
     */

    let m = a.length;
    let n = a[0].length;

    let s = 0;
    let e = (m*n) - 1;

    while ( s <= e ) {
        let mid = s + Math.floor( (e-s)/2 );
        let x = Math.floor(mid/n);
        let y = mid % n;

        if ( a[x][y] === target  ) return true;
        else if ( a[x][y] < target ) s = mid+1;
        else e = mid-1;
    }

    return false;
};
