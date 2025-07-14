const reverse = (a, i, j) => {
    while ( i < j ) {
        const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        i++; j--;
    }
};

var wiggleSort = function(nums) {
    /**
       The idea is to first sort the elements in increasing order. Then divide
       the elements into 2 partitions such that the lower partition has 1 extra
       element. Then reverse the 2 partitions in place.

       Then make a result array of same size. Then put the elements from lower
       half in even indices, and upper half in odd indices.
       Time: O(n log n)
       Space: O(n)
     **/
    const N = nums.length;
    nums.sort( (a,b) => a-b );

    /* N is odd, say 5. N+1//2 -> 3. So the array is divided into [first 3], [rest 2]
       in terms of index, that is [0,1,2] and [3,4]
       if N is even, say 8. N+1//2 -> 4. So the array is divided into [first 4], [rest 4]
       in terms of indx that would be [0,1,2,3] [4,5,6,7]
       Let's say B = N+1//2 then [0, B) indices are in first half. and [B, N-1] are in second half
    */
    const B = Math.floor( (N+1)/2 );
    reverse( nums, 0, B-1 );
    reverse( nums, B, N-1 );

    let res = new Array(N);
    let i=0;

    for ( let j=0; j < N; j+=2 ) {
        res[j] = nums[i];
        i++;
    }

    for ( let j=1; j < N; j+=2 ) {
        res[j] = nums[i];
        i++;
    }

    for ( let i=0; i < N; i++ )
        nums[i] = res[i];
};
