var is_duplicate = function(x,S) {
    const premisis = JSON.stringify(x.sort()); /* O(3) since x of size 3 */
    for (s of S) {
         /* O(3) since all elements in S
          * are size 3 */
        const posterior = JSON.stringify(s.sort());
        if (posterior===premisis) return true;
    }
    return false;
};


var threeSum = function(nums) {
    /**
     * Algorithm:
     * S <- ∅
     * i <- 0 -- A-3
     *      j = i+1; k = A-1
     *          while (i<j && j<k)
     *              if (a[i]+a[j]+a[k]==0 && i,j,k not in solutions set)
     *                  S <- S + {a[i],a[j],a[k]}
     *              if (a[i]+a[j]+a[k] > 0)
     *                  decrease k
     *              else increase j
     */
    if (A<3) return [];

    a.sort((a,b) => a-b); var A = a.length;

    S = new Array();
    for (var i=0; i<=A-3;i++) {
        var j=i+1; var k=A-1;
        while (i<j && j<k) {
            var sol = [a[i], a[j], a[k]];
            const sum = sol.reduce( (a,c)=>a+c ,0);
            if (sum == 0 && !is_duplicate(sol,S)) {
                S.push(sol); j++;
            }
            else if (sum < 0) j++;
            else k--;
        }
    }
    return S;
};
