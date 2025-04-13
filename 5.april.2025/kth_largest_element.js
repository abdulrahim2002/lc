var findKthLargest = function(a, k) {
    /**
       Approach 1: Sort the elements in decreasing order
       so 1st largest is in 0th index, 2nd largest is in 1st index etc.

       return array[k-1];
       Time: O(n log n)
       Space: O(sort)

       Appraoch 2: Heapify the elements.
       repeatdly extract the maximum elements k times
       return the kth largest element.

       Time: O( n(heapify) + k * log n (extract max k times) ) = O( n log n ) when k ~ n
       Space: O(1)

       Approach 3:
       Radix sort the elments. Employ MSB radix sort with buckets according to
       bits. At each iteration, only sort the buckets that may contain k. i.e.
       large buckets. The input range is 10000 which means 2^13.
       Time: O(13n) ~ O(n)
       Space: O(n) // string indices of buckets

       Approach 4: Use partitioning algorithm from quick sort.
       Time: O(n^2)
       Space: O(1)

       Approach 5: Research grade algorithms with guranteed O(n) runtime
       https://en.wikipedia.org/wiki/Selection_algorithm
       https://en.wikipedia.org/wiki/Quickselect

       This problem is worth exploring in detail provided you have time
     **/

    a.sort( (a,b) => b-a );
    return a[k-1];
};
