var moveZeroes = function(a) {
    /**
       Solve this using 2 pointers. The first pointer acts
       as boundary of non-zero elements. i.e. to the left of
       first pointer we have non zero elements.

       Similarly, second pointer is the boundary for zero elemnts.

       But this approach does not work because order has to
       be maintained therefore you need to bubble the zeroes
       upwards. But that would be quadratic time.
    **/
    let A = a.length;
    let g = 0;

    for (let h=0; h < A; h++) {
        if ( a[h] !== 0 ) {
            let tmp = a[g];
            a[g] = a[h];
            a[h] = tmp;
            g++;
        }
    }
};
