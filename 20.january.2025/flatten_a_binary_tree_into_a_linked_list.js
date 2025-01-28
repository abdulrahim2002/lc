let pre_order = (node, prev_wrap) => {
    if (!node) return;
    prev_wrap.prev.right = node;
    prev_wrap.prev = prev_wrap.prev.right;

    let right_child = node.right;  // save right
    pre_order(node.left, prev_wrap);
    pre_order(right_child, prev_wrap);
    node.left = null;
};

var flatten = function(root) {
    if (!root) return null;
    /**
       There are 2 approaches to solve this problem. First is to use an array of
       pointers to the nodes in the list to first store the in-order traversal
       of the list. Then traverse this list making each pointer point to the
       next node in the list.
       Time: O(n)
       Space: O(n) // for storing the pointersto nodes

       There is a bit of optimization that we can make here. All we need to do
       is to make the left pointer null and right pointer point to the next node
       in the list (in pre order). We can pass in a previous node pointer to the
       pre_order function to get the previous node in the list. The we can make
       previous node point to this node. Node that there is not need
       Time: O(n)
       Space: O(1)
    */

    let prev = new TreeNode(-1);
    let prev_wrap = {prev:prev};
    pre_order(root, prev_wrap);
    return root;
};
