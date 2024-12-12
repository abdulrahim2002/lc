"""

The problem is called 2-sum

"""


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """Approach 1: brute force -> get all elements in
        nums X nums to get the all possible (x,y)
        combinations of elements. From these eliminate those
        in which both the elements are from same index like
        (nums[1],nums[1]) then see which elements add up to
        the target. The first one that does return it

        Time complexity; O(n^2)
        Space complexity: O(1)

        """
        for x in range(len(nums)):
            for y in range(len(nums)):
                if (x != y) and ((nums[x] + nums[y]) == target):
                    return [x, y]
