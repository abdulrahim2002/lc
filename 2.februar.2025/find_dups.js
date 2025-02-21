var containsNearbyDuplicate = function(a, k) {
    /**
       Can be done using 2 approaches:

       1. generate all possible i and j, then
       check for conditions. Return accordingly
       Time: O(n^2)
       Space: O(1)
       2. Iterate through the list keeping the elemenets seen with index and
       numbers in a seperate list. While iterating, check if current number is
       already there in the list, if yes, check for condition and return true
       else add this to the list. return false at last
       Time: O(n)
       Space: O(n)

       3. There is another approach using Set that can solve this question in
       O(k) space. This set will contain the window of k numbers before the ith
       number. Hence, to check if a number is in the window you can do it by
       checking if it is in the set. We iterate through the list and if we find
       that the current number is not in the window then we simply add it into
       the set and remove the element recently invalidated, otherwise, we remove
       one element from the set which is out of range and check if after
       removing the number is in the set. if yes return true else just add this
       number in the set and keep going
       Time: O(n)
       Space: O(k)
    */

    let A = a.length;
    let seen = new Set();

    for (let i=0; i < A; i++) {
        let rem = i-k-1;
        if ( 0 <= rem && rem < A ) seen.delete( a[rem] );
        if ( seen.has( a[i] ) ) return true;
        else seen.add( a[i] );
    }

    return false;

//    let A = a.length;
//    let seen = {};
//
//    for (let i=0; i < A; i++) {
//        if ( a[i] in seen && Math.abs( i - seen[ a[i] ] ) <= k )
//            return true;
//        seen[ a[i] ] = i;
//    }
//
//    return false;
//
    /* n^2 solution does not work */
//    let A = a.length;
//    for (let i=0; i < A; i++)
//        for (let j=i+1; j < A; j++)
//            if ( a[i]===a[j] && Math.abs(i-j) <= k )
//                return true;
//    return false;
};
