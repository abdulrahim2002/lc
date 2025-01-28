var maxSubArray = function(a) {
    /**
       Approach one: Find all possible subarrays. Determine the sub
       of this sub array. Determine if it;s greatest seen. if yes save

       return the maximum sum.

       This solution is O(n^3) and gives TLE

       then there is a O(n^2) solution where you do not iterate over
       all the elmenets in the third loop, instead, you utilize already
       computed sums.

       The problem can be solved using kadane's algorithm in O(n) and
       O(1)
    */
    let A = a.length;
    /* Kadane's algorithm: find maximum sum of a contigous array */
    let current_sum = 0;
    let best_sum = Number.MIN_SAFE_INTEGER;

    for (let i=0; i < A; i++) {
        current_sum =   Math.max( a[i], current_sum+a[i] );
        if (current_sum > best_sum) best_sum = current_sum;
    }
    return best_sum;

//    let A = a.length;
//    let max_sum = a[0];
//
//    for (let i=0; i < A; i++) {
//        let sum = 0;
//        for (let j=i; j < A; j++) {
//            sum+= a[j];
//            max_sum = Math.max(sum, max_sum);
//        }
//    }
//    return max_sum;

//    let max_sum = a[0];
//
//    let add_all = (x,y) => {
//        let sum = 0;
//        for (let i=x; i <= y; i++) sum += a[i];
//        return sum;
//    };
//
//    for (let i=0; i < A; i++) {
//        for (let j=i; j < A; j++) {
//            sum = add_all(i,j);
//            max_sum = Math.max(max_sum, sum);
//        }
//    }
};
