var search = function(a, target) {
    let A = a.length;
    let von = 0;
    let bis = A-1;
    let erste = a[von];
    let zuletz = a[bis];

    while ( von <= bis ) {
        let mitte = von + Math.floor( (bis-von)/2 );
        if ( a[mitte] === target ) return mitte;
        if ( a[mitte] >= erste ) {
            if ( erste <= target && target < a[mitte] ) bis = mitte-1;
            else von = mitte+1;
        }
        else {
            if ( a[mitte] < target && target <= zuletz ) von = mitte+1;
            else bis = mitte-1;
        }
    }

    return -1;
};
