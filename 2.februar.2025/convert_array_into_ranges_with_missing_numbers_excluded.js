var summaryRanges = function(a) {
    /**
       Use a 2 pointer approach to get consecutive range of integers, and
       store these integeres.
     */

    let A = a.length;
    if (!A) return [];

    let res = [];

    let save_range = (start, end) => {
        if (start === end) res.push(`${start}`);
        else res.push(`${start}->${end}`);
    };

    let i=0;
    while ( i < A ) {
        let j=i+1;
        while ( j < A  && a[j] == a[j-1]+1 ) j++;
        if (i == j-1) res.push(`${a[i]}`);
        else res.push(`${a[i]}->${a[j-1]}`);
        i=j;
    }

    return res;
};
