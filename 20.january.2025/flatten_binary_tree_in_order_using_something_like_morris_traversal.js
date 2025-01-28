var flatten = function(root) {
    /**
       Use this as reference:
       https://upload.wikimedia.org/wikipedia/commons/7/75/Sorted_binary_tree_ALL_RGB.svg

       The algorithm is based on the idea of Moris traversal. In moris traveral,
       we traverse until the rightmost node of left subtree, and create a link
       to be able to go back to that node after we are done traversing. The idea
       here is that instead of creating a node to go back, we basically shift all
       nodes on the right of the (boss node) to the end of rightmost child of left
       subtree. This is because in pre-order traversal, those are the nodes that we
       will be visiting anyway.

       This algorithm instead of tryign to traverse the algorithm, changes the tree
       itself to avoid going back and hence saving time. The complexity here is proper

       Time: O(n)
       Space: O(1)
       Which is superior for this problem.

       Algorithm:
       For the current node, find the rightmost child of the left subtree. say tmp
       put right of current node to the end of tmp node. (In accordance with pre order)
       lastly, change the left of current to right of current node and move on the right
       of current node.
     */
    if (!root) return null;

    let cur = root;

    while ( cur ) {
        if ( cur.left ) {
            let tmp = cur.left;
            while ( tmp.right ) tmp = tmp.right;
            tmp.right = cur.right;
            cur.right = cur.left;
            cur.left = null;
        }
        cur = cur.right;
    }
};
