var rightSideView = function(root) {
    /**
       This is nothing, but the rightmost node in the breadth first search.
    */
    if (!root) return [];

    let visiting_list = [root];
    let view = [];

    while (visiting_list.length) {
        let L = visiting_list.length;

        view.push( visiting_list[L-1].val ); /* right most element on this level */

        for (let i=0; i < L; i++) {
            let node = visiting_list.shift();
            if (node.left) visiting_list.push(node.left);
            if (node.right) visiting_list.push(node.right);
        }
    }

    return view;
};
