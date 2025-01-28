var findMin = (a) => {
    let A = a.length;
    if (A==1) return a[0];

    let start = a[0];
    let end = a[A-1];
    let i=0; let j=A-1;

    if (start < end) return start; /* already sorted */

    while ( i <= j ) {
        let mid = i + Math.floor( (j-i)/2 );
        if ( start < a[mid] )
            /* larger ladder, send to right */
            i = mid+1;
        else if (start == a[mid])
            i = mid+1;
        else
            /* smaller ladder, send left */
            j = mid-1;
    }

    return a[i];
};





///**
//   This algorithm is based on the heap property of sorted arrays
//   Time: O(n/2)
//   Space: O(1)
// */
//var findMin = function(a) {
//    let A = a.length;
//    if (!A) return -1;
//
//    let find_min = (a, root) => {
//        if ( root < 0 || root >= (A+1)/2 ) return Number.MAX_SAFE_INTEGER;
//
//        let lc = root*2 +1;
//        let rc = root*2 +2;
//
//        if ( lc < A && rc < A && (a[root] > Math.min(a[lc], a[rc])) )
//            return Math.min(a[lc], a[rc]);
//
//        if ( lc < A && rc >= A  && (a[root] > a[lc]) )
//            return a[lc];
//
//        return Math.min(find_min(a,lc), find_min(a,rc));
//    };
//
//    let res = find_min(a,0);
//    res = (res == Number.MAX_SAFE_INTEGER) ? a[0]:res;
//    return res;
//};
//
//
