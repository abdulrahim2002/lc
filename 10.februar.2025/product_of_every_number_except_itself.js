var productExceptSelf = function(a) {
    /**
       prod[i] is the product of all integers in prod except ith Simple approach
       is to make 2 loops, iterate over the second time. And calculate product
       of all except this value.

       The algorithm is that you make 2 passes. You need 2 auxilary arrays. In
       the first auxilary array you store the product of digits that occur after
       this digit. And in the 2nd array, you store the digits that come before
       this digit.

       You multiple these 2 array numbers and get the answer.

       But how to do it in O(n) space, well we can just use the input array
       itself.
    */
    let A = a.length;
    let res = new Array(A).fill(1); // instead of using 2 arrays, you can use 1
                                    // array

    for (let i=1; i < A; i++) res[i] = res[i+1] * a[i+1];
    let prod = 1;
    for (let i=A-2; i >= 0; i--) {
        prod *= a[i+1];
        res[i] *= prod;
    }

    return res;

//   let A = a.length;
//   let before_me = new Array(A).fill(1);
//   let after_me = new Array(A).fill(1);
//
//   for (let i=1; i < A; i++) before_me[i] = before_me[i-1]*a[i-1];
//   for (let i=A-2; i >= 0; i--) after_me[i] = after_me[i+1]*a[i+1];
//
//   for (let i=0; i < A; i++) a[i] = before_me[i]*after_me[i];
//   return a;
};
