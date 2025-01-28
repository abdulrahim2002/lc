var minimumTotal = function(tree) {

    /**
       This is a dynamic programming solution. It is based on the preposition
       that if there is an optimal path from a to c:
       a -> c
       and b lies in this path
       b -> c
       Then the subpath b -> c has to be optimal, so that the overall path
       a -> c is optimal.

       Hence, if b lies between node a and c and the path between a and c is
       optimal, then the path b and c is also optimal and the cost of paths from
       a to c is given by:

       cost (a,c) = cost(a,b) + cost(b,c)

       Using this result. We will work bottom up. First we will calculate the
       minimum paths from nodes at one level up the leaf nodes. And assign them
       as optimal.
       Then for the level above it, the optimal path would be the cost of current
       node + cost of optimal path from 2 choices.
     */

    let T = tree.length;

    for (let i=T-2; i >=0; i--)
        for (let j=0; j < tree[i].length; j++)
            tree[i][j] = tree[i][j] + Math.min( tree[i+1][j], tree[i+1][j+1] );

    return tree[0][0];
};
