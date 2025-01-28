var buildTree = function(pre_order, in_order) {
    /**
       Pre order: NLR. The first node is guranteed to be next root.
       In order: LNR. The left side of a node is in left subtree
                        and right side in right subtree
     */
    if (!pre_order) return null;

    pre_order.reverse();  /* To efficiently get the next node using pop() */

    let next_node = (s, e) => {
        /**
           Construct a tree out of a pre order and post order traversals
           At each iteration, get the next node from pre_order list. and
           find it's index in in_order. The left side of this index will
           become it's left subtree and right side of it will become it;s
           right subtree.
        */
        if ( s > e ) return null;

        let node_val = pre_order.pop();
        let idx = in_order.indexOf(node_val);
        let root = new TreeNode(node_val);

        root.left = next_node( s, idx-1 );
        root.right = next_node( idx+1, e );

        return root;
    };

    return next_node(0, in_order.length-1);
};
