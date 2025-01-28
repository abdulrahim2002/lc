class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        last_seen = {}
        max_len, back, front = 0,0,0
        while (front < len(s)):
            if (last_seen.__contains__(s[front])):
                back = max(back, last_seen[s[front]]+1)
            last_seen[s[front]] = front
            max_len = max(max_len, front-back+1)
            front+=1

        return max_len
