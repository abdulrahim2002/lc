var combine = function(n, k) {
    /**
       1, 2, 3, ... n
       k \in (1 - n)
    */
    let res = [];
    let comb = [];

    let btsearch = (start) => {
        if (comb.length === k) {
            res.push([...comb]);
            return;
        }

        for (let i=start; i <= n; i++) {
            comb.push( i );
            btsearch( i+1 );
            comb.pop();
        }
    };

    btsearch(1);
    return res;
};
