var majorityElement = function(a) {
    /**
       Return all elements that appear more than A/3 times

       Approach 1:
       Initialize a hashmap
       iterate through the array and calculate freq. of each
       element
       iterate through the array and record the elements that
       have freq more than A/3
       return these elements

       Time: O(n)
       Space: O(n)
       --
       Can you do it in O(1) time
       Something like the majority element algorithm can be applied
       here. But the problem is that the majority element algorithm
       returns only one  element. However, there can be multiple
       elements with freq more than A/3

       Almost all problems that can be done in O(n) space and time
       can be done in O(n^2) time and O(1) space

       The idea is, to iterate the array in 2 loops. To count the freq
       of each element. If this element has freq more than A/3. record it
       return all such elements
       --

       Approach:
       Iterate through the array,
       for each element, calculate its frequency using another nested
       loop
       if the freq is more than A/3, save this element.
       return all such elemnets

       Time: O(n^2)
       Space: O(1)

       --
       Obviously there has to be someones magical solution
       that does it in O(n) time and O(1) space


       The solution is based on the majority element algorithms.
       It is based on the fact that there cannot be more than
       2 elements with frequency more than A/3.
       33.33 + 33.33 = 66.66
       66.66 + 33.33 = 99.99
       --



    **/
    let A = a.length; if (!A) return [];
    let freq_map = {};
    let threshhold = A/3;
    let solution_set = new Set();



//    /** without hashmap, nested loops **/
//    for ( let i=0; i < A; i++ ) {
//        let freq = 0, val = a[i];
//        if ( solution_set.has(val) ) continue;
//        for ( let j=0; j < A; j++ ) if ( a[j] == val ) freq++;
//        if ( freq > threshhold ) solution_set.add( val );
//    }
//    return [...solution_set];

//    /** with hashmap **/
//    for ( let i=0; i < A; i++ )
//        freq_map[a[i]] = (freq_map[a[i]]|0) + 1;
//
//    for ( let [val, freq] of Object.entries(freq_map) )
//        if ( freq > threshhold ) solution_set.add(+val);
//
//    return [...solution_set];
};
