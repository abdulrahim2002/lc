from math import inf

class Solution:
    def minSubArrayLen(self, target: int, a: List[int]) -> int:
        A = len(a)
        ans = inf
        l = 0
        cur_sum = 0

        for r in range(A):
            cur_sum += a[r]

            if cur_sum >= target:
                while cur_sum >= target:
                    ans = min(ans, r-l+1)
                    cur_sum -= a[l]
                    l+=1

        return ans if ans != inf else 0


#         # the solution is O(n^2) and exceeds time limit
#         for i in range(A):
#             cur = 0
#             for j in range(i, A):
#                 cur += a[j]
#                 if cur >= target:
#                     ans = min(ans, j-i+1)
#                     break
#
#
#         return ans if ans != inf else 0
#
