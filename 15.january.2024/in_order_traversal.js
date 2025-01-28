var in_order = (node, saves) => {
    if (!node) return;

    in_order(node.left, saves);
    saves.push(node.val);
    in_order(node.right, saves );

};

var inorderTraversal = function(root) {
    var visits = [];

    in_order(root,  visits);

    return visits;
};
