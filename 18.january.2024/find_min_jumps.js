var jump = function(a) {
    /* O(n) && O(1) */
    /**
       @farthest_from_i: the farthest index you can reach
       from i. Either, it's i + a[i] (if i is providing the
       maximium possible distance) else it's from combination
       of some previous jumps. If this is greater or equals to
       A-1, we can reach the last position.
       @jumps: The min number of jumps required to reach the
       position
    */

    let A = a.length;
    if ( A<2 ) return 0;

    let farthest_from_i = 0;
    let end_of_range = 0;
    let jumps = 0;

    for (let i=0; i <= (A-1); i++) {
        farthest_from_i = Math.max(farthest_from_i,i+a[i]);
        if ( i == end_of_range  ) {
            end_of_range = farthest_from_i;
            jumps++;
            if (farthest_from_i >= A-1) return jumps;
        }
   }




    /* Time: O(n^2) Space: O(1) */
//    let A = a.length;
//    if ( A == 1 ) return 0; /* empty array not input */
//    let INF = Number.MAX_SAFE_INTEGER-1; /* avoid overflow */
//
//    a[A-1] = 0; /* Min number of steps required to reach
//                   end from end is 0
//                */
//    for ( let i=A-2; i>=0; i-- ) {
//        let min = INF;
//        for ( let j=i+1; j <= (i + a[i]) && j < A; j++ )
//            min = ( a[j] < min ) ? a[j]:min;
//        a[i] = min+1;
//    }
//
//    return a[0];

};
