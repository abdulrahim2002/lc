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

    for (var i=lo; i <= hi; i++) {
        x[k-1] = i;
        let val = 0;
        for (let j=k-1; j<A; j++) val += a[j]*x[j];
        find(a, A, x, k-1, S, t);

        if (val > t) break;

        if (val == t && k==1) {
            let tmp = [];
            for (let i=0; i<A; i++) {
                for (let count=0; count<x[i]; count++) tmp.push(a[i]);
            }
            S.push(tmp);
            break;
        }
    }
};

var combinationSum = function(a, target) {
    var A = a.length;
    var x = new Array(A).fill(0);
    var sol = [];

    find(a, A, x, A, sol, target);

    return sol;
};
