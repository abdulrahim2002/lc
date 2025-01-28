var fourSum = function(a, t) {
    /**
       Return all possible pairs i,j,k,l where a[i],a[j],a[k],a[l]
       are unique and add upto target(t).
       The solution is O(n^3) in time and O(1) in space.

       Strategy:
       i <- 0 to A-1
       j=i+1
       k=j+1
       l=A-1
     */
    let A = a.length;
    if (A < 4) return [];

    let sol = [];
    a.sort( (a,b)=>a-b );

    let add_unique = (potential) => {
        for (s of sol) if (s==potential) return;
        sol.push(potential);
    };

    for (let i=0; i < A-3; i++ ) {
        for (let j=i+1; j < A-2; j++) {
            let k = j+1;
            let l = A-1;
            while ( i < j && j < k && k < l ) {
                let sum = a[i] + a[j] + a[k] + a[l];
                if ( sum == t ) {
                    add_unique( JSON.stringify([ a[i],a[j],a[k],a[l] ]) );
                    k++;
                }
                if ( sum < t ) {
                    k++;
                }
                else l--;
            }
        }
    }

    for (let i=0; i < sol.length; i++)
        sol[i] = JSON.parse(sol[i]);

    return sol;
};
