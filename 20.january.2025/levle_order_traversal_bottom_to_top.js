var levelOrderBottom = function(root) {
    if (!root) return [];

    /**
       Find the level order traversal from top to bottom.
       reverse the list. return.
    */
    let visiting_list = [root];
    let lot = [];

    while (visiting_list.length) {
        let level = [];
        let L = visiting_list.length;

        for (let i=0; i < L; i++) {
            let node = visiting_list.shift();
            level.push(node.val);
            if (node.left) visiting_list.push(node.left);
            if (node.right) visiting_list.push(node.right);
        }
        lot.push([...level]);
    }

    return lot.reverse();
};
