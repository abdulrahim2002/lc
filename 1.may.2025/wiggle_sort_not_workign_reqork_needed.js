/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function(a) {
    /**
       The basic idea to solve this question is to sort the elements into 2
       partitions. Have the lower partition 1 extra element.

       Then put the elements of the lower partition into lower even indices and
       put the elements in the odd partition into upper half.

       e.g.
       Odd     nums = [1,2,...,7]      Even      nums = [1,2,...,8]

       Small half:  4 . 3 . 2 . 1      Small half:  4 . 3 . 2 . 1 .
       Large half:  . 7 . 6 . 5 .      Large half:  . 8 . 7 . 6 . 5
       --------------------------      --------------------------
       Together:    4 7 3 6 2 5 1      Together:    4 8 3 7 2 6 1 5

       Time: O(n log n)
       Space: O(n) // auxilarry space allocated
    **/
    const A = a.length;
    a.sort( (a,b) => a-b );

    // j indexes in res, and i indexes in a
    let i = j = 0;

    const res = Array.from({length:A}).fill(-1);

    for ( i=0, j=0 ; j < A; i++, j+=2 )
        res[j] = a[i];

    console.log( res );

    for (     j=1 ; j < A; i++, j+=2 )
        res[j] = a[i]

    console.log(res);

    return res;
};
