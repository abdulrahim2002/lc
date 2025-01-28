let INF = Number.MAX_SAFE_INTEGER;

var find_pivot(a, A, root) {

    lc = 2*root + 1; lc = (lc < A) ? lc:null;
    rc = 2*root + 2; rc = (rc < A) ? rc:null;

    lv = (lc) ? a[lc]:null;
    rv = (rv) ? a[rv]:null;

    let condition = false;

    if (lv && !rv) {
        condition = ( a[root] > lv );
        if (condition) return lc;
    }
    if (lv && rv) {
        condition = ( a[root] > Math.max(lv, rv) );
        if (condition) return ( rv < lv ) ? rc:lc;
    }
    if (!lv && !rv) return null;

    if (lc) let left_subtree = find_pivot(a,A,lc);
    if (left_subtree) return left_subtree;

    if (rc) let right_subtree = find_pivot(a,A,rc);
    if (right_subtree) return right_subtree;

    return null;
}

var search = function(a, target) {
    let A = a.length;

    let k = find_pivot(a, A, 0);

    var idx = (x,k) => {
        return ( ( x+k )%A );
    };

    let i=0;
    let j=A-1;

    while ( i<=j ) {
        let mid = i + Math.floor( (j-i)/2 );
        let m = idx(mid, k);
        if ( a[m] == target  ) return true;
        else if ( a[m] < target ) i = mid+1;
        else j = mid-1;
    }

    return false;
};



let a = [1, 2, 3, 4, 5];
let target = 3;

find_pivot(a,a.length,0);
