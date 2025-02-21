var reverseBits = function(n) {
    let res = 0;

    for (let i=0; i < 32; i++) {
        res = (res<<1) | (n&0x1); // 1 acts as a mask
        n >>= 1;
    }

    return res>>>0;
    /* not so efficient method */
    //return parseInt( n.toString(2).padStart(32,0).split('').reverse().join(''),2);
};
