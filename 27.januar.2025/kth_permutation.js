var getPermutation = function(n, k) {
    /**
       At each iteration, get the next element's index and pop it from the list.
       really really coool.

       https://leetcode.com/problems/permutation-sequence/solutions/22507/explain-like-i-m-five-java-solution-in-o-n/


    */
    k--; /* fix for indexing */
    let a = new Array(n).fill(null).map( (x,y) => y+1 ); /* 1,2,..n */
    let res = "";

    let fact = new Array(n+1).fill(1);
    for (let i=1; i <= n; i++) fact [i] = i*fact[i-1];

    for (let i=n; i >=1; i--) {
        let idx = Math.floor( k/fact[i-1] );
        res += a.splice(idx, 1);
        k -= ( idx * fact[i-1] );
    }

    return res;
};







//let next_permutation = (a) => {
//    /* change the a such that it becomes next permutation */
//    let A = a.length;
//    let k, l;
//
//    for (k=A-2; k >= 0; k--)
//        if ( a[k] < a[k+1] )
//            break;
//
//    if ( k==-1 ) {
//        a.reverse();
//        return;
//    }
//
//    for (l=A-1; l > k; l--)
//        if ( a[k] < a[l])
//            break;
//
//    [ a[k], a[l] ] = [ a[l], a[k] ];
//
//    let start = k+1;
//    let end = A-1;
//    while ( start < end ) {
//        [ a[start], a[end] ] = [ a[end], a[start] ];
//        end--;
//        start++;
//    }
//};
//
//var nextPermutation = function(n,k) {
//    res = [];
//
//    for (let i=1; i <= n; i++)
//        res.push( String(i) );
//
//    for (let i=0; i < k-1; i++)
//        next_permutation(res);
//
//    return res.join('');
//};
