/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(a, b) {
    a = new Set(a);

    let res = new Set();

    b.forEach( (x) => {
        if ( a.has(x) && !res.has(x) )
            res.add(x);
    } );

    return [...res];
};
