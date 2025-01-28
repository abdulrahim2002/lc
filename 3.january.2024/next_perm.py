class Solution:
    def nextPermutation(self, a):
        """
        algorithm next_permutation(a):
        Step 1: find the largest k such that a[k] < a[k+1]
        Step 2: find the largest l such that a[k] < a[l] i.e. the correct
        position of a[k]
        Step 3: swap(a[k], a[l])
        Step 4: reverse a from (k+1) - (A-1)
        return a
        """
        A = len(a)
        k = -inf
        for k in range(A-2, -1, -1):
            # k ∈ {A-2, A-1, A-2, A-3, ... 0}
            # k+1 is not out of bonds
            if (a[k]< a[k+1]):
                break

        l = -inf
        for l in range(A-1, k, -1):
            if (a[k] < a[l]):
                break

        tmp = a[k]
        a[k] = a[l]
        a[l] = tmp

        start, end = k+1, A-1
        while (start<=end):
            tmp = a[start]
            a[start] = a[end]
            a[end] = tmp
            start+=1
            end+=1

        return a
