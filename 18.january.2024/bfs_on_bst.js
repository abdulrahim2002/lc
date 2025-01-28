var levelOrder = function(root) {
    /** basically perform a breadth first search, on a BST */
    if (!root) return [];

    let visiting_list = [root];
    let res = [];

    while (visiting_list.length) {
        /* step one is to get all nodes in the visiting_list */
        const tmp = [];
        let VL = visiting_list.length;

        for (let i=0; i < VL; i++) {
            let node = visiting_list.shift();
            tmp.push(node.val);
            if (node.left) visiting_list.push(node.left);
            if (node.right) visiting_list.push(node.right);
        }

        res.push([...tmp]);
    }

    return res;
};
