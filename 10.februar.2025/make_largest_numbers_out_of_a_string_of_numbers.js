var largestNumber = function(nums) {
    /**
       How can we select the numbers in such a fashion that they form the
       largest integer.

       Sorting lexicographically?
       3,30,34,5,9
       9,5,34,30,3 -> lexicographically
       9,5,34,3,30 -> max number formed

       Here we need to change the sort function. The sort function is such that
       whenever you compare 2 digits, while sorting, and comparing. when you
       compare. Compare them accordign to the rules:

       a concatenated with b produces bigger number then b concatinated with a
       then a is larger. i.e. make it appear first

       else: b is larger
    */

    return nums.map( (x) => x.toString() ).sort(
        (a,b) => +(b+a) - +(a+b)
        ).join('').replace(/^0+/, '') || '0';
};
