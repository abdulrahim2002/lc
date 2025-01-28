var isValidBST = function(root) {
    let prev = null; // `prev` starts as null

    let is_valid = (node) => {
        if (!node) return true; // Base case: null node is valid

        // Traverse left subtree
        if (!is_valid(node.left)) return false;

        // Business logic: Check if the current node's value is greater than `prev`'s value
        if (prev !== null && prev.val >= node.val) {
            return false; // Violation of BST property: current node must be greater than the previous node
        }


        if (prev) console.log(`prev = ${prev.val}, node = ${node.val}`);
        prev = node; // Update `prev` to the current node

        // Traverse right subtree
        return is_valid(node.right);
    };

    return is_valid(root);
};




//var isValidBST = function(root) {
//    /**
//       Traverse the tree in BFS order, if you find a node
//       that violates the condition, break and return false.
//
//       But the problem with this approach is that a BST might
//       be perfectly valid at each node level, but may not be
//       valid overall.
//
//       The other approach is to do a in-order traversal. i.e.
//       left root right.
//       Binary search trees are sorted, when traversed as in-order.
//
//       The first approach is to make a list and get all elements
//       of BST sorted, then check if the elmeents in the list are
//       sorted. if yes return ture;
//       */
//
//    if (!root) return true;
//
//    let node_list = [];
//
//    let is_valid = (node) => {
//        if (!node) return;
//        is_valid(node.left);
//        node_list.push(node.val);
//        is_valid(node.right);
//    };
//
//    is_valid(root); // populate the list
//
//
//    for (let i=1; i < node_list.length; i++)
//        if (node_list[i-1] >= node_list[i])
//            return false;
//
//    return true;
//
//};
