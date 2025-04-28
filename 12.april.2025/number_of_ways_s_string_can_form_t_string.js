var numDistinct = function(s, t) {
    /**
       In this problem we are required to find, the number of subsequences in s
       that are equal to t.

       First off, if s is smaller than t, no subsequence in s can be equal to t,
       hence retunr 0;

       The idea to solve this problem here is that we create a dynamic
       programming matrix. the rows in this matrix signify characters of t and
       columns signify characters in s. [i][j] tells weather at the position i,
       s[j] can be placed. Which is only possible if s[j] = t[i].

       When we find out all the positions where each character of s can be placed
       then we find out how many possible substrings are there.
       The problem with the commented approach is that finding dolutions in dp
       matrix takes O(2^n) time which is overkill for this task.

       A better appraoch is to construct a dp matrix where, of length m+1, n+1
       dp[i][j] tells you, how many subsequences of s[:j+1] can form t[:i+1]
       for example, dp[1][1] tells that given 1 character is taken from
       s, how many ways are there for it to form t[0].

       this will be equal to = number of ways s[j:j+1] can form t[i:i+1] which
       is 1 if they are equal and 0 otherwise. + number of ways s[0:j] can form
       t[0:i]. which is the information that is present in th.
    */

    let m = t.length;   /* rows = characters in t */
    let n = s.length;   /* n = columns = characters in s */
    if ( m > n ) return 0;

    let dp = new Array(m+1).fill(null).map( () => new Array(n+1).fill(0) );

    /* base case: t of length 0 can be formed in 1 way. i,e, by returning an
       empty string
    */
    for (let j=0; j <= n; j++)
        dp[0][j] = 1;

    for (let i=1; i <= m; i++)
        for (let j=1; j <= n; j++) {
            if ( t[i-1] == s[j-1] )
                dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
            else dp[i][j] = dp[i][j-1];
        }

    return dp[m][n];

//    let lasania = new Array(m).fill(null).map( () => new Array(n).fill(false) );
//
//    for ( let i=0; i < m; i++  )
//        for ( let j=i; j < n; j++ )
//            if ( s[j]==t[i] ) lasania[i][j] = true;
//
//    /** count the number of solutions. for row in the matrix, we need to see if
//        there is a path which when extended to the last row yields all true. its
//        hard to explain but this is similar to how we were checking n queens
//    */
//
//    let res = 0;
//
//    let count = (row, column) => {
//        /* no it is not guranteed that you will visit each node exactly once
//           :)
//           This algorithm is something like generate and test and in the worst
//           case it will have to go through each cell below its row for ceach
//           column in current row for every cell. Making it's time complexity
//           O(2^n)
//        */
//        if (row == m) {
//            res++;
//            return;
//        }
//        for ( let col=column; col < n; col++ )
//            if ( lasania[row][col] ) count(row+1, col+1);
//    };
//
//    count(0,0);
//    return res;
};
