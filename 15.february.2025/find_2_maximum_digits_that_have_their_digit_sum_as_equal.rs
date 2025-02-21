use std::cmp;
use std::collections::HashMap;

impl Solution {
    pub fn sum_of_digits(num: i32) -> i32 {
        if num < 0 { return -1; }
        let mut sum = 0;
        let mut num = num;
        while num > 0 {
            sum += num%10;
            num /= 10;
        }
        sum 
    }

    pub fn maximum_sum(a: Vec<i32>) -> i32 {
        /**
            Initialize: max_sum_of_2_digits_that_satisfy_the_condition
            Create a hashmap to store sumofdigits for each number. in
            each of these indexes, store an array of 2 numbers which 
            contain the largest 2 numbers that have that sum.

            Iterete over the hashmap, and for any element that has exactly
            2 elements in an array, get their sum. Update the global sum
            with it and then return the global sum
        **/
        let A = a.len();
        let mut max_sum = -1;
        let mut smd_nums: HashMap<i32, Vec<i32>> = HashMap::new();

        for i in 0..A {
            let sm = Self::sum_of_digits(a[i]);
            let mut nums_of_sm = smd_nums.entry(sm).or_insert(vec![]);
            
            nums_of_sm.push(a[i]);
            nums_of_sm.sort_unstable_by( |a, b| b.cmp(a) );
            nums_of_sm.truncate(2);
        }

        for nums in smd_nums.values() {
            if nums.len() != 2 { continue; }
            max_sum = max_sum.max( nums[0]+nums[1] );
        }

        max_sum
    }

    // pub fn maximum_sum(a: Vec<i32>) -> i32 {
    //     /**
    //         Initialize: max_sum_of_2_digits_that_satisfy_the_condition
    //         Find all possible (i,j) such that:
    //             sum_of_digits(a[i]) = sum_of_digits(a[j])
    //             update: max_sum_of_2_digits_that_satisfy_the_condition
    //                     with a[i]+a[j]
    //     **/
    //     let A = a.len();
    //     let mut max_sum_of_2_valid_elems = -1;

    //     for i in 0..A {
    //         for j in i+1..A {
    //             let s1 = Self::sum_of_digits(a[i]);
    //             let s2 = Self::sum_of_digits( a[j] );

    //             if s1 == s2 {
    //                 max_sum_of_2_valid_elems = cmp::max( max_sum_of_2_valid_elems,
    //                                              a[i]+a[j] );
    //             }
    //         }
    //     }
    //     max_sum_of_2_valid_elems
    // }
}
