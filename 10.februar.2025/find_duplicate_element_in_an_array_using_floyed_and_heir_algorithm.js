var findDuplicate = (a) => {
    /**
       This problem can be solved using many appraoches:

       1. Sort the list and find find the first element that is repeated
       Time: O(n log n)
       Space: O(1)

       2. Hashmap: Use a hashmap to store the frequencies of words
       Time: O(n)
       Space: O(n)

       3. Radix sort: Sort the list in-place in linear time using radix sort
       Time: O(n) // 32*n to be exact if the numbers are 32 bits/4 bytes
       Space: O(1)

       4. Floyed and heir algorithm: Use 2 pointers, One moves 2 steps at a time
       and the other moves 1 step. This approach is similar to finding the node
       where a cycle starts in linked list.
       Time: O(n) // 2 passes
       Space: O(1)
    **/
    // this does not work because the repeated digit can appear more than once
    //  a.reduce( (a,c)=>a+=c, 0) - ( ((a.length-1)*((a.length-1)+1))/2 );
    let slow = a[0];
    let fast = a[0];

    do {
        slow = a[slow];
        fast = a[ a[fast] ];
    } while ( slow !== fast )

    /* Move both pointers 1 step this time. This is because in the second when
     * both pointers are at the same node, then the point where the cycle starts
     * (the duplicated point) is equidistant to the length of the path between
     * the starting node and the point where the cycle starts. Hence both nodes
     * meet at the duplicated node */
    slow = a[0];
    while ( slow !== fast ) {
        slow = a[slow];
        fast = a[fast];
    }
    return slow;
};
