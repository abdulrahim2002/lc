/* rust sorcery */
impl Solution {
    pub fn count_bad_pairs(mut nums: Vec<i32>) -> i64 {
        
        /* for each element, subtract it's index from itself
           This effectively creates the hashmap for you for free.
        */
        nums
        .iter_mut()
        .enumerate()
        .for_each(|(i, n)| *n-=i as i32);

        /* sort the values */
        nums.sort_unstable();

        ( 
            (nums.len()*(nums.len()-1)/2)       // total number of pairs  
            -  nums.chunk_by(|a, b| a == b)     // group by equal elements
                .map(|chnk| (chnk.len()*(chnk.len()-1)/2) ) // replace with number of pairs
                .sum::<usize>()                 // sum all values
        ) as i64
    }
}





// use std::collections::HashMap;
// 
// impl Solution {
//     pub fn count_bad_pairs(nums: Vec<i32>) -> i64 {
//         /**
//             A pair of indices (i, j) is a bad pair if i < j and j - i != nums[j] - nums[i].
//             The problem is O(n^2) fundamentally, but can be reduced to linear with O(n) memory.
// 
//             If ai is a part of a bad pair. And ax is the corresponding partner in the bad pair then:
//                 i-x = nums[i]-nums[x]
//                 nums[i]-i = (nums[x]-x)
// 
//                 you just have to look up if there is any other element that has (nums[x]-x) as equal
// 
//             Since, i < j. Each element is only required to be check from its previous elements
// 
//             Algorithm:
//             initialize hashmap number -> anything
//             initialize bad_pairs
//             for each element at index i
//                 find how many elements have (element-i) in hashmap
//                     increment bad_pairs by i+1 - found_num
//                 else hashmap( element-i ) += 1;
//             return bad_pairs
// 
//         **/
//         let mut good_pairs = 0i64;
//         let mut map: HashMap <i32, i32> = HashMap::new();
// 
//         for i in 0..nums.len() {
//             let gp = nums[i] - i as i32;
//             if let Some( &n_gp ) = map.get(&gp) {
//                 good_pairs += n_gp as i64 ;
//                 *map.get_mut(&gp).unwrap() += 1;
//             }
//             else {
//                 map.insert( gp , 1 );
//             }
//         }
// 
//         // for i in 0..nums.len() {
//         //     for j in i+1..nums.len() {
//         //         if j-i != nums[j] as usize -nums[i] as usize {
//         //             bad_pairs += 1;
//         //         }
//         //     }
//         // }
//         let n = nums.len() as i64;
//         (n*(n-1))/2 - good_pairs as i64
//     }
// }
