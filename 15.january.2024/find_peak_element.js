var findPeakElement = function(a) {
    let A = a.length;

    for (let i=0; i < A; i++) {
        if ( i!=0 && i!=(A-1) && (a[i-1] < a[i] && a[i] > a[i+1]) )
            return i;

        if ( i==0 && (a[i] > a[i+1]) ) return i;

        if ( i==(A-1) && (a[i-1] < a[i]) ) return i;
    }

    return 0;
};
