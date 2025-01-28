var numTrees = function(n) {

    let trees_at = new Array(n+1).fill(1);

    for (let i=1; i <= n; i++) {
        let total = 0;

        for (let j=1; j <= i; j++)
            total += trees_at[j-1] * trees_at[i-j];

        trees_at[i] = total;
    }

    return trees_at[n];
};
