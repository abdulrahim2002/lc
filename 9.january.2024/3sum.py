class Solution(object):
    def threeSum(self, a):
        a.sort() # O(n logn)
        A = len(a)
        S = []
        for i in range(A-2):
            j, k = i+1, A-1
            while (i<j and j<k):
                sol = [ a[i],a[j],a[k] ]
                sum_sol = sum(sol)
                if (sum_sol==0 and sol not in S): # O(n)
                    S.append(sol)
                    j+=1
                elif (sum_sol<0):
                    j+=1
                else:
                    k-=1
        return S
