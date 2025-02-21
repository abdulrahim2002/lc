var hammingWeight = (a) => a.toString(2).split('').reduce(
    (a,c) => a += (c=='1') ? 1:0, 0 );

var hammingWeight = (a) => {
    /* a is a positive 31 bit integer */
    let count = 0;
    for (let i=0; i < 31; i++)
        if ( a >> i & 1 ) count ++;
    return count;
};
