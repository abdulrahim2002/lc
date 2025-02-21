var maximumGap = function(a) {
    /**
       We need to find the maximum difference between 2 elements
       in an unsorted array, imagining that it was sorted.
       [3, 6, 9, 1] is sorted as [0, 3, 6, 9]

       The simple approach is to just sort the array in O(nlogn)
       time and then iterate over it to find the max difference
       Time: O(nlogn)
       Space: O(1)

       But the challenge here is that we need to do it in linear
       space and time.
    */
    let A = a.length;
    if ( A < 2 ) return 0;

    a.sort( (a,b)=>a-b );
    let max_diff = Number.MIN_SAFE_INTEGER;

    for (let i=0; i < A-1; i++)
        if (a[i+1]-a[i] > max_diff) max_diff = a[i+1]-a[i];

    return max_diff;
};
