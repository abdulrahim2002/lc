class Solution(object):
    def twoSum(self, nums, target):
        """:type nums: List[int]
        :type target: int
        :rtype: List[int]

        traverse the array linerly. For each_value, find a value:
            delta = target - this_value

        then query using a hash_map if a value = delta exists which is not at
        the position of this_value itself. If so then return its index.

        then [index of this_value, value returned by hash_map] would be the
        answer.

        For this implementation, we did not need a hashmap. But this particular
        implementation is actually slow since it uses .index and .__contains__
        which may use internal searching which in itself takes linear time.

        Time complexity: O(n)
        Space complexity: O(n)
        """

        for i in range(len(nums)):
            delta = target - nums[i]
            if (nums.__contains__(delta)):
                j = self.find_index(nums, delta, i)
                if j != -1:
                    return i,j

        return []

    def find_index(self, ls, value, excluding):
        """
        Finds index of delta in list ls where the index != excluding>
        ### In situations where delta == nums[i] ensure that nums.index
        ### does not return i, since we canot return the same element.
        ### i.e. nums[2]+nums[2] == target ###
        """
        try:
            index = ls.index(value)
            if index == excluding:
                ### it returned index of this element itself ###
                try:
                    if index+1 < len(ls):
                        index = ls.index(value, index+1)
                        return index
                    else:
                        return -1

                except ValueError:
                    return -1
            else:
                return index

        except ValueError:
            return -1
