class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        value_map_index = {}

        for i in range(len(nums)):
            delta = target - nums[i]
            if delta in value_map_index:
                return [i, value_map_index[delta]]
            value_map_index[nums[i]] = i
