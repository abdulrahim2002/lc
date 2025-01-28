from math import inf

def is_palindrome(a,i,j):
    length = j+1-i
    while (i<=j):
        if (a[i]!=a[j]):
            return 0
        else:
            i+=1
            j-=1
    return length

def find_longest(a):
    """"
    Time: O(n^3)
    Space: O(n)
    """
    A = len(a)
    longest_palindrome, longest_len = None, -inf
    for i in range(A): # O(n)
        for j in range(i,A): # O(n)
            l = is_palindrome(a,i,j) # O(n)
            if (l and l>longest_len):
                longest_len = l
                longest_palindrome = a[i:j+1]
    return longest_palindrome


"""
We can avoid using is_palindrome saving O(n). And taking down the cost to O(n^2)
For this we use memoization to store precomputed values. New values are
calculated using previous computations.
"""

def longest_palindrome(a):
    """
    Make an f table. the entry at (i,j) in the f table i.e. f[i][j] tells what
    is the length of the longest palindrome in string a from i to j.

    To make the f table. Initialize with 0. traverse the f table diagonally
    from bottom left to top right.

    Start with diagnol below i=j. Initialize it to 0.

    for each value in the diagnoal. If a[i]=a[j] then the length of longest
    palindrome substring in a between i and j is length of longest palindrome
    in a between i+1 and j-1 + 2(a[i] and a[j] are now part of this
    palindrome).

    ... a(i) a[i+1] .. a[j-1] a[j] ...

    Time: O(n^2)
    Space: O(n)
    """

    A = len(a)
    f = [ [0]*A for _ in range(A)] # make an A x A table to store the lengths
    max_seen, maxi, maxj = -1, -1, -1
    d = 1
    while (d >= -A+1):
        if (d>=0):
            j=0
            i=d+j
            while (i<A and j<A):
                ## logic here
                if (i==j):
                    f[i][j]=1
                else:
                    if(a[i]==a[j]):
                        f[i][j] = f[i+1][j-1] + 2
                        if (f[i][j] > max_seen):
                            max_seen = f[i][j]
                            maxi, maxj = i,j
                    else:
                        f[i][j] = max( f[i][j-1], f[i+1][j-1], f[i][j+1] )
                ## login ends
                i, j = i+1, j+1
        else:
            i=0
            j=i-d
            while (i<A and j<A):
                ## logic here
                if (i==j):
                    f[i][j]=1
                else:
                    if(a[i]==a[j]):
                        f[i][j] = f[i+1][j-1] + 2
                        if (f[i][j] > max_seen):
                            max_seen = f[i][j]
                            maxi, maxj = i,j
                    else:
                        f[i][j] = max( f[i][j-1], f[i+1][j-1], f[i][j+1] )
                ## login ends
                i, j = i+1, j+1
        d-=1

        print(a[maxi:maxj])

    return a[maxi:maxj+1]


a = "abdulludhakimcattac"
A = len(a)

from random import randint

f = [ [0]*A for _ in range(A)] # make an A x A table to store the length

max_seen, maxi, maxj = -1, -1, -1
d = 1
while (d >= -A+1):
    if (d>=0):
        j=0
        i=d+j
        while (i<A and j<A):
            if (d==1):
                f[i][j] = 0
                break
            if (i==j):
                f[i][j] = 1
            else:
                if (a[i]==a[j]):
                    f[i][j] = f[i+1][j-1] + 2
                    if (f[i][j]>max_seen):
                        max_seen = f[i][j]
                        maxi, maxj = i,j
                else:
                    f[i][j] = max( f[i][j-1], f[i+1][j-1], f[i+1][j] )

            i, j = i+1, j+1
    else:
        i=0
        j=i-d
        while (i<A and j<A):
            if (d==1):
                f[i][j] = 0
                break
            if (i==j):
                f[i][j] = 1
            else:
                if (a[i]==a[j]):
                    f[i][j] = f[i+1][j-1] + 2
                    if (f[i][j]>max_seen):
                        max_seen = f[i][j]
                        maxi, maxj = i,j
                else:
                    f[i][j] = max( f[i][j-1], f[i+1][j-1], f[i+1][j] )

            i, j = i+1, j+1
    d-=1
