var find = function(a, A, x, k, S, t){
    /* Find the elements from a0 to a(k-1)
       keeping a(k) fixed.
       x(i) represents how many number of times
       a(i) is selected. Hence, at any point the sum
       is: summation[i=0, A-1]  a(i) * x(i)

       x(i) belongs in the range [0,t//a]
       hence we find x(i) using binary search.
    */
    if (k==0) return;

    let hi = Math.floor( t / a[k-1] );
    let lo = 0;

    while (lo <= hi) {
        var mid = lo + Math.floor( (hi-lo)/2 );
        x[k-1] = mid;

        let val = 0;
        for (var i=k-1; i<A; i++) val += a[i]*x[i];

        if (val > t) {
	    hi = mid-1;
		continue;
	}

        if (val < t ) {
            lo = mid+1;
            find(a, A, x, k-1, S, t);
            continue;
        }
	    if (val==t && k!=1) {
		    find (a,A,x,k-1,S,t);
		    break;
	    }

        if (val == t && k==1) {
            S.push([...x]);
            break;
        }
    }
};

var combinationSum = function(a, target) {
    var A = a.length;
    var x = new Array(A).fill(0);
    var solutions = [];

    find(a, A, x, A, solutions, target);

    for (s of solutions) console.log(`s = ${s}`);

    return solutions;
};
