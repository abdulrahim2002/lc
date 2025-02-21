var kthSmallest = function(root, k) {
    /**
       Use the fact that the in order traversal of a binary search tree is
       sorted. Keep a position variable that increments one, each time a node is
       encountered.
    **/
    let pos = 0;
    let ans = -1;

    let in_order = (node) => {
        if ( !node || pos > k ) return;

        in_order(node.left);

        pos += 1;
        if( pos === k ) ans = node.val;

        in_order(node.right);
    };

    in_order(root);
    return ans;
};
