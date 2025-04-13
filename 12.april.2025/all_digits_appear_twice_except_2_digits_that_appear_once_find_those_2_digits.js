/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    /**
    * In the first pass, we XOR all elements in the array,
    * and get the XOR of the two numbers we need to find.
    * Note that since the two numbers are distinct, so there
    * must be a set bit (that is, the bit with value '1') in
    * the XOR result. Find out an arbitrary set bit (for
    * example, the rightmost set bit).

    * In the second pass, we divide all numbers into two
    * groups, one with the aforementioned bit set, another
    * with the aforementinoed bit unset. Two different
    * numbers we need to find must fall into thte two
    * distrinct groups. XOR numbers in each group, we can
    * find a number in either group.
    **/
    // the set bits in this number will contain the bits at which both
    // the numbers differ.
    let diff = nums.reduce( (a, c) => a ^= c, 0 );

    // diff will now contain only the last set bit in diff previously
    diff &= ~(diff - 1);
    // or diff &= -diff

    // there are 2 groups. each group will yield one number.
    let res = [ 0, 0 ];
    for ( let num of nums ) {
        // group that has the bit @ diff set
        if ( num & diff ) {
            res[0] ^= num;
        }
        else res[1] ^= num;
    }
    return res;
    /**
       Why does diff &= ~(diff-1)
       gives the last set bit.

       First, this the original formula to get the last set
       bit. The diff &= -diff is just an abbreviation with
       the knowledge of ~(diff - 1) = - (diff - 1) - 1 =
       -diff.

       This uses the result that:
       -a = ~(a-1)

       If diff is set on the least significant bit, then
       this is trivially provable: the least significant bit
       is the last set bit. After the -1 operation, this
       least significant bit became 0, and is the only
       change to all bits of diff. Then we ~ the result,
       which means the least significant bit gets reverted
       to 1, while all the other bits are guaranteed to have
       been reverted. Thus the least significant bit is the
       only bit that is left unchanged and that could
       survive the & operation. If diff is unset on the
       least significant bit: let's focus on the rightmost
       occurrence of 10 in diff. The 1 bit in this 10 is the
       last set bit of diff. After -1 operation, this 10
       becomes 01. All the 0 bits to the right of this
       rightmost 10 are all change to 1 bits, and all the
       other whatever bits to the left of this rightmost 10
       would be remain unchanged:

       **..**10_00..00
       after -1:
       **..**01_11..11

       Then we do ~ operation. The **..** part would all be
       reverted, and none of them would survive the upcoming
       & operation. 01 would become back 10, and would both
       survive the & operation, although the bit 1 is the
       only one we care about. All those 11..11 part gets
       reverted back to 00..00 after the ~ operation, and
       does not matter to the & operation. Thus the only
       thing surviving the & operation would be the
       rightmost 10, or the last set bit which is within it.

       Incidentally, it does not really matter which bit we
       choose for the second pass to succeed, but since
       there is an elegant way to find the rightmost set
       bit, then let's use that.
     **/
};
