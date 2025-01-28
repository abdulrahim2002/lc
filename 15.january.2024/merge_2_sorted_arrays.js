var merge = function(a, A, b, B) {

    i = A-1;    /* Current Largest Integer in x */
    j = B-1;    /* Current largest integer in y */

    for ( let k=A+B-1; k>=0; k-- ) {
        /* largest of the 2 goes into index at i */
        if ( i >= 0 && j >= 0 ) {
            let a_large = (a[i] > b[j]);
            a[k] = a_large ? a[i--]:b[j--];
        }
        else if ( i >= 0 )
            a[k] = a[i--];
        else
            a[k] = b[j--];
    }
};
