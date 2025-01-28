var zigzagLevelOrder = function(root) {
    if (!root) return [];

    let visiting_list = [root];
    let res = [];
    let RIGHT = true;

    while (visiting_list.length) {
        let level = [];
        let V = visiting_list.length;

        if (RIGHT)
            for (let i=0; i < V; i++) {
                let node = visiting_list.shift();
                level.push(node.val);
                if (node.left) visiting_list.push(node.left);
                if (node.right) visiting_list.push(node.right);
            }
        else {

            /**
               The problem here is that if you are popping elements from a list,
               then you cannot push to the same list, since you pushed nodes (children)
               will then be picked in next pop(). Hence, you need to make a new array.
               store the values of child nodes in this array and reinitialize the queue
               with this array for the next level.

               Next: If you pop elements and then start pushing them into another array
               of children in the order node.left, node.right. You will find that the
               order of child nodes is corrupted.
               To avoid this problem, you push in order: node.right, node.left
               then you will need to reverse this list because it will contain elements
               from right to left.
               */

            let tmp = []
            for (let i=0; i < V; i++) {
                let node = visiting_list.pop();
                level.push(node.val);
                if (node.right) tmp.push(node.right);
                if (node.left) tmp.push(node.left);
            }
            visiting_list = tmp.reverse();
        }
        RIGHT = !RIGHT;
        res.push([...level]);
    }

    return res;
};
