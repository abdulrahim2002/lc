var sumNumbers = function(root) {
    /**
       Step 1: Generate all numbers from root to leaf (all paths)
       and store them as strings.
       Step 2: convert these strings to integers and sum them
    */
    if (!root) return 0;

    let explore = (node, number_until_now, saves) => {
        if (!node.left && !node.right) {
            number_until_now += node.val;
            saves.push( number_until_now );
            return;
         }

        number_until_now += node.val.toString();

        if (node.left) explore( node.left, number_until_now, saves );
        if (node.right) explore( node.right, number_until_now, saves );
    };

    let res = [];
    explore(root, "", res );

    return res.reduce( (a, c) => a += Number(c)  , 0);
};
