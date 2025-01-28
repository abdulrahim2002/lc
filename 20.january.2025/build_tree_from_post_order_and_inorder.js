/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(in_order, post_order) {
    /**
       In order Traversal: LNR
       Post order Traversal: LRN

       In an *in order* traversal, it is guranteed that nodes that appear on
       left in the trace appear before it and nodes that appear after the trace
       appear after it.

       In a *post order traversal* it is guranteed that the rightmost node will
       be the root of a subtree.

       Using these 2 observations, we can build the tree.

       Approach: Generate a hashmap, so position of any number can be ascertained
       in constant time.
    */
    let N = in_order.length;
    let index_of = {};      /* What about duplicate values. */
    for ( let i in in_order ) index_of[ in_order[i] ] = +i;

    let build_tree = ( von, bis ) => {
        if ( von > bis ) return null;

        let node_val = post_order.pop();
        let this_node =  new TreeNode(node_val);

        this_node.right = build_tree( index_of[node_val]+1 , bis );
        this_node.left = build_tree( von, index_of[node_val]-1 );

        return this_node;
    };

    return build_tree(0, N-1);
};
