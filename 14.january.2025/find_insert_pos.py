class Solution:
    def searchInsert(self, x: List[int], target: int) -> int:
        i, j = 0, len(x)-1
        mid = i + (j-i)//2

        while i<=j:
            if x[mid] == target:
                return mid
            elif x[mid] < target:
                i = mid+1
                mid = i + (j-i)//2
            else:
                j = mid-1
                mid = i + (j-i)//2
        
        return i
