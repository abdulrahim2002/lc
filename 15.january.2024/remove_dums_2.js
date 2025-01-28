var removeDuplicates = function(a) {
    let A = a.length;
    if (A < 3) return A;

    let k = 2;

    for (let i=k; i < A; i++) {
        if (a[i]!=a[k-2]) {
            a[k] = a[i];
            k++;
        }
    }

    return k;
};
