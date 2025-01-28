var findPeakElement = function(a) {
    let A = a.length;
    if ( A==1 || A==0 ) return 0;
    /**
       initialize i=0 and j=A-1
       check edge cases. i.e. a[i] < a[i+1] and a[j-i] <  a[j].
       That would make the array a mountain hill.
       If that is not the case. i.e. we have a peak at the end.
       return the peak.

       Now you need to travel the mountain to find a peak
       decrease this frame until you find a peak at one of the
       endpoints.
    */

    let i=0;
    let j=A-1;

    if ( a[i] > a[i+1] ) return i;
    if ( a[j-1] < a[j] ) return j;

    i++;j--;

    while ( i <= j ) {
        let mid = i + Math.floor( (j-i)/2 );

        if ( a[mid-1] < a[mid] && a[mid] > a[mid+1] ) return mid;
        if ( a[mid-1] < a[mid] && a[mid] < a[mid+1] ) i = mid+1;
        if ( a[mid-1] > a[mid] && a[mid] > a[mid+1] ) j = mid-1;
        if ( a[mid-1] > a[mid] && a[mid] < a[mid+1] ) j = mid-1;
    }

    return 0;
};
