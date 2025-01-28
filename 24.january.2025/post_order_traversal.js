var postorderTraversal = function(root) {
    let post_order = [];
    let LRN = (node) => {
        if (!node) return;
        LRN(node.left);
        LRN(node.right)
        post_order.push(node.val);
    };
    LRN(root);
    return post_order;
};
