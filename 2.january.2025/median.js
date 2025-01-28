/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var get_X_case1 = function(x, n, N, m, M) {
    /* x is the index in abstract array X made by
     * appending elements of m to n */
    if (x < N)
        return n[x];
    else
        return m[x-N];
};

var get_X_case2 = function(x, n, N, m, M) {
    /* x is the index in abstract array X made by
     * appending elements of n to m */
    if (x < M)
        return m[x];
    else
        return n[x-M];
};

var findMedianSortedArrays = function(m, n) {
    var M = m.length; var N = n.length;
    /**
     * Case 1: m is larger than n. i.e. max(n) <= min(m). since arrays are sorted
     * that would be: n[N-1] <= m[0]
     * - in this case, the arrays can be merged together to form a non
     * decreasing array of size M+N.
     * - this new array is formed by appending m to the end of n.
     * - we can calculate the median of this new array according to the medina
     * formula
     *
     * !! But if we merge the arrays together, the time complexity will go
     * linear time (adding each element at a time).
     *
     * Hence, we will imagine an abstract new array of elements of both arrays.
     * The indexing in this new array can be done using:
     *
     * algorithm: Index in imaginary merged array
     *
     * let n(len=N),m(len=M) be two arrays and X = n + m (m appended to n), then
     *
     * X[x] = {
     *      n[x]            if x < N,
     *      m[x-N]          else
     * }
     *
     * The median can be calculated just like a normal array of size M+N. But we
     * would still index in m and n to avoid appending to arrays.
     */
    if (n[N-1] <= m[0]) {
        if ((M+N)%2) {
            /* Odd case, median index = (length-1)/2 */
            return get_X_case1( (M+N-1)/2  , n, N, m, M);
        }
        else {
            /* even case, median indexes = (M+N)/2, (M+N-2)/2 */
            var v1 = get_X_case1((M+N)/2, n, N, m, M);
            var v2 = get_X_case1((M+N-2)/2,n, N, m, M);
            return (v1+v2)/2;
        }
    }
    /**
     * Case 2: n is larger than m. i.e. m[M-1] <= n[0]. All remains same, but
     * the indexing will change.
     */
    else if (m[M-1] <= n[0]) {
        if ((M+N)%2) {
            /* Odd case, median index = (length-1)/2 */
            return get_X_case2( (M+N-1)/2  , n, N, m, M);
        }
        else {
            /* even case, median indexes = (M+N)/2, (M+N-2)/2 */
            var v1 = get_X_case2((M+N)/2, n, N, m, M);
            var v2 = get_X_case2((M+N-2)/2,n, N, m, M);
            return (v1+v2)/2;
        }
    }
    /**
     * Case 3: There is an overlap between the two arrays. In this case,
     * we create 2 halves. left half and right half. The number of
     * elements in left half and right half should be equal. However,
     * how many elements are taken from m or n is not relavant as long
     * as all elements are being utilized.
     *
     * Hence, let there be two arrays n,m with N,M elements. We divide
     * each array into a window at the index i where i ∈ [-1, min(N,M))
     * Here, -1 implies that no element of the array is in the left half
     * and i=min(N,M)-1 implies maximum possible elements are in the left
     * half.
     */
    else {
        if (N>M){
            var tmp = n; n=m; m=tmp;var l = N; N=M; M=l;
        }

        if ((M+N)%2) var even = false;
        else var even = true;

        if (even) var lh = (M+N)/2; else var lh = (M+N+1)/2;

        var lo = -1;var hi = Math.min(M,N)-1;
        var i = Math.floor( (lo+hi)/2 );

        while (lo<=hi) {
            var l1 = l2 = -Infinity;
            var r1 = r2 = Infinity;

            if (i>-1) l1 = n[i];
            if ((i+1)<N) r1 = n[i+1];
            if ((lh-i-2)<M) l2 = m[lh-i-2];
            if ((lh-i-1)<M) r2 = m[lh-i-1];

            if (l1<=r2 && l2<=r1) {
                if (even) return (Math.max(l1,l2)+Math.min(r1,r2))/2;
                else return Math.max(l1,l2);
            }
            else if (!(l1<r2)) {
                hi = i-1;i =  Math.floor((lo+hi)/2);
            }
            else {
                lo = i+1;i =  Math.floor((lo+hi)/2);
            }
        }
    }

    return -Infinity;
};

var main = () => {
    /**
     * If there is an array a of length n, then median of an
     * array is:
     *
     * median = {
     *      a[n-1/2]                   if n is odd,
     *      (a[n-2/2] + a[n/2])/2      if n is even
     * }
     *
     * The index of median in an array can be found using
     * the formula:
     *
     * median index(s)  = {
     *      n-1/2               if n is odd,
     *      n/2, n-2/2          if n is even
     * }
     */

    //var n = [1,2,3];
    //var m = [4,5,6];
    //console.log(`n = ${n} and m = ${m}`);
    //// X = [1,2,3,4,5,6] and median = X[len-2/2]+X[l/2] /2
    //// = X[2] + X[3] / 2 = 3+4/2 = 3.5
    //var res = findMedianSortedArrays(m,n);
    //console.log(res);


    //var n = [10,11,12];
    //var m = [1,2,3];
    //console.log(`n = ${n} and m = ${m}`);
    //// X = [1,2,3,4,5,6] and median = X[len-2/2]+X[l/2] /2
    //// = X[2] + X[3] / 2 = 3+4/2 = 3.5
    //var res = findMedianSortedArrays(m,n);
    //console.log(res);

    var n = [0,0,0,0,0,0];
    var m = [-1,0,0,0,0,0,1];
    console.log(`n = ${n} and m = ${m}`);
    // X = [1,2,3,4,5,6] and median = X[len-2/2]+X[l/2] /2
    // = X[2] + X[3] / 2 = 3+4/2 = 3.5
    var res = findMedianSortedArrays(m,n);
    console.log(res);

    //var n = [4,5,6];
    //var m = [1,4,5];
    //console.log(`n = ${n} and m = ${m}`);
    //// X = [1,2,3,4,5,6] and median = X[len-2/2]+X[l/2] /2
    //// = X[2] + X[3] / 2 = 3+4/2 = 3.5
    //var res = findMedianSortedArrays(m,n);
    //console.log(res);

};
main();



/*
 * Theory:)
 * Let me walk you through a simple example, let n = [2,6,10]; N = 3
 * m = [1,3,5,7,9]; M = 5
 *
 * i ∈ [-1, 2]
 * M+N = 8;
 * lh = rh = M+N+1 // 2 = 4
 *
 *	l1 | r1
 *	-------
 *	l2 | r2
 *
 * i increases => n shifts backward and m shifts forward.
 *
 *	l1 < r2 (on fail: shift n right to decrease l1 => decrease i)
 *	and l2 < r1 (on fail: shift n left to increase l2 => increase i)
 *
 * iteration 1:
 * i = -1
 * n =        X	| 2,6,10	=> l1=-inf,l2=m[3], r1=n[0], r2=m[4]
 * m =  1,3,5,7	| 9
 *
 * Comments: l2 !< r1 hence, increase i
 *
 * i = 0
 * n = 	      2	| 6,10		=> l1=n[0], l2=m[2], r1=n[1],r2=m[3]
 * m =    1,3,5	| 7,9
 *
 * Comments: l1 < r2 && l2 < r1 => M+N even => return(max(2,5)+min(2,9))/2
 *
 * i = 1
 * n =      2,6	| 10		=> l1=n[1], l2=m[1], r1=n[2], r2=m[2]
 * m =      1,3	| 5,7,9
 *
 * Comments: l1 !< r2 hence, decrease i
 *
 * i = 2
 * n =   2,6,10	| X
 * m = 	      1	| 3,5,7,9	=> l1=n[2], l1=m[0], r1=+inf, r2=m[1]
 *
 * Comments: l1 !< r2 hence, decrease i
 *
 * at each iteration, l1 = n[i] and number of elements of n takes in lh
 * = i+1. After taking i+1 elements, the number of places left for m =
 * lh - (i+1) = lh-i-1. The last element in lh i.e. (lh-i-1)th element
 * of m is given by: l2 = m[lh-i-2].
 *
 * r1 and r2 are successive elemnts of l1 and l2 resp.
 *
 * r1 = n[i+1]
 * r2 = m[lh-i-1]
 *
 * ---
 * If M+N was odd?
 * let n = [5,7,9] N = 3
 * m = [1,2,4,8] M = 4
 *
 * i = [-1, 3-1]
 *
 * M+N = 7, lh = M+N // 2 = 4
 *
 * iteration 1:
 * i = -1
 * n = X	| 5,7,9	=> l1=-inf, l2=m[4+1-2=3], r1=[-1+1], r2=inf
 * m = 1,2,4,8	| X
 *
 * Comments: l2 < r1, increase i
 *
 * iteration 2:
 * i = 0
 * n = 5	| 7,9	=> l1=[0], l2=m[4-0-2=2], r1=n[0+1],r2[2+1]
 * m = 1,2,4	| 8
 *
 * Comments: l2<r1 && l1<r2 => return max(5,4)
 *
 * iteration 3:
 * i = 1
 * n = 5,7	| 9	=> l1=n[1], l2=m[4-1-2=1], r1=n[2], r2=[]
 * m = 1,2	| 4,8
 *
 * Comments: l1!<r2	=> decrease i
 *
 * iteration 4:i = 2
 * n = 5,7,9	| X	=> l1=n[2], l2=m[4-2-2], r1=n[3!]=Inf, l2=m[1]
 * m = 1	| 2,4,8
 *
 * Comments: l1!<r2, decrease i
 *
 * */


// n = [0,0,0, 0,0,0]; N = 6
// m = [-1,0,0,0, 0,0,1]; M = 7
//
// lh = (M+N+1)/2 = 7
//
// iteration 1:
// i = -1
// n = X                       | 0,0,0, 0,0,0
// m = -1,0,0,0,0, 0,0,1       | X
//
// Comment: l2 < r1, increase i
//
// iteration 2:
// i = 0
// n = 0                       | 0,0,0, 0,0
// m = -1,0,0, 0,0,0           | 1
//
// Comment: l2<r1> Note that this is a valid partition. Hence, we need to change the equality
//
