/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(a, k) {
    /**
       Approach 1: Build a frequency map. Turn the map into an array and sort
       the array by frequency. Return the first k entries from this .

       Time: nlogn+2n+k ~ O(n log n)
       Space: 2n+k ~ O(n)

       Approach 2: After we build the frequency array, we can get the top k
       elements, by using the approach we used in kth largest element problem.
       Time: O(n)
       Space: O(n) A = a.length;
    // O(n) space, O(n) time
    let freq = {};
    for ( let num of a )
        freq[num] = (freq[num]|0) + 1;

    // O(n) space, O(n)time
    a = Object.entries(freq);

    // O(log n) time
    a.sort( (a,b) => b[1] - a[1] );

    // O(k) time, O(k) space
    let res = [];
    for ( let i=0; i < k; i++ )
        res.push( +a[i][0] );
    return res;
};
