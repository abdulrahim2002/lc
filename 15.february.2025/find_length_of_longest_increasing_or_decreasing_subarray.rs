use std::cmp;

impl Solution {
    pub fn longest_monotonic_subarray(a: Vec<i32>) -> i32 {
        /*
            Find length of longest strictly increasing subarray
            Find length of longest strictly decreasing subarray
            Return max of the 2

            How to find the length of longest strictly increasing/
            decreasing subarray.

            initailize cur = 1; // the length of currect longst 
            iterate over the array.
            if st. increase, cur++
            else save cur, cur = 1; 
        */
        let A = a.len();

        let mut longest_inc = 0;
        let mut cur_inc = 1;
        let mut longest_dec = 1;
        let mut cur_dec = 1;

        for i in 0..A-1 {
            if a[i] < a[i+1] {
                cur_inc += 1;
            }
            else {
                longest_inc = cmp::max(longest_inc, cur_inc);
                cur_inc = 1;
            }

            if a[i] > a[i+1] {
                cur_dec += 1;
            }
            else {
                longest_dec = cmp::max(longest_dec, cur_dec);
                cur_dec = 1;
            }
        }

        cmp::max( cmp::max(longest_inc, longest_dec), 
                  cmp::max(cur_inc, cur_dec) )
    }
}
