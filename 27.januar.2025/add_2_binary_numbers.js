var addBinary = function(a, b) {
    /**
       Add two binary strings. a = 11, b = 1
    **/
    a = a.split('').reverse().join('');
    b = b.split('').reverse().join('');
    let A = a.length;
    let B = b.length;
    let c = '0';
    let res = '';

    for (let i=0; i < Math.max(A, B)+1; i++) {
        let left = a[i] || 0;
        let right = b[i] || 0;
        if ( (+left) + (+right) + (+c) == 3 ) {
            res += '1';
            c = '1';
        } else if ( (+left) + (+right) + (+c) == 2 ) {
            res += '0';
            c = '1';
        }
        else if ( (+left) + (+right) + (+c) == 1 ) {
            res += '1';
            c = '0';
        }
        else {
            res += '0';
            c = '0';
        }
    }

    return res.split('').reverse().join('').replace(/^0+/,'') || '0';
};
