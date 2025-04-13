/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function(root) {
    /**
       * We maintain a variable @trench which stores the largest depth
       * encountered so far. The algorithm works by calculating the depest level
       * from the left and right subtrees i.e. at each node we calculate the
       * depth of deepest child from left and right subtrees.
       *
       * If both the deepest children in left and right subtrees are at the
       * deepest level (trench). Then we know that this node contains the all
       * the deepest children. This node is saved in a global variable that
       * keeps track of the lca. Now suppose there is another node that is above
       * this node, and has this node as a subtree. It has another subtree that
       * has nodes in the deepest level as well. So when we go above, we will
       * find that the y(above node) also has deepest children in both left and
       * right subtree, and it will update the varilable keeping track of lca
       * once again to reflect the correct value.
       *
       * We also benefit from traversing in post order since node at higher
       * level will be evaluated last. Correcly reflecting the values.
     **/

    let trench = 0;
    let lca = null;

    let post_order = ( node, depth = 0 ) => {
        trench = Math.max(depth, trench);
        if ( !node ) return depth;
        let left = post_order( node.left, depth+1 );
        let right = post_order( node.right, depth+1 );
        if ( left == right && right == trench )
            lca = node;
        return Math.max( left, right );
    };
    post_order( root );
    return lca;
};
