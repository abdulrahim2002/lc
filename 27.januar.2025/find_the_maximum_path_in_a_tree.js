let tree_to_graph = (graph, node, parent) => {
    if (!node) return;    
    /* this node will have 3 connections. One to its parent and 2 to its
     * children */
    graph.set( [parent , node.left, node.right] );
    
    tree_to_graph( graph, node.left, node);
    tree_to_graph( graph, node.right, node);
};

let probe = (starting_node, graph) => {
    /* Find the maximum cost path from starting_node to any node in the tree */
    if (!starting_node) return -Infinity;
    
    let path_sum = starting_node.val;

    while (starting_node) {
        let options = graph.get(starting_node);
        let max_next_node = null;
        let max_next_node_val = -Infinity;

        for (let i=0; i < options.length; i++)
            if ( options[i] && options[i].val > max_next_node_val ) {
                max_next_node = options[i];
                max_next_node_val = options[i].val;
            }

        starting_node = max_next_node;
        if (max_next_node) path_sum += max_next_node_val;
    }

    return path_sum;
};


var maxPathSum = function(root) {
    /**
       First, convert the tree into a graph structure. This is important since,
       we need connections from child nodes to parent nodes.

       We use a simple list to store all the nodes and their associations. The index
       will be generated in a dfs order. which is pre-order. Hence, the index number
       will be in preorder. But that does not matter.

       Then for each node we need to calculate the maximum path. For this we
       need to find the maximum path from every node.

       The problem is that we need to be able to find all the connections of a
       node. and a reference to their connections as will. for this we can use a
       hash map. since we can do a hash_map.get(node) to get all its connections
       in list. and for each node in the list, we can do hash_map.get(child) to
       get the childrens children, this is a powerfull approach. for each of it,
       we can also do a parent pointer and check if any connect is taking us back
       to the parent, in which case we skip.       
    */
    let graph = new Map();
    tree_to_graph(graph, root, null);

    for ( let i in graph ) {
        let conn = graph.get(i);

        for (let i=0; j < conn.length; j++) {
            if (conn[j]) console.log(`${i.val} is connected to conn[j].val`);
        }
    }

//    let max_path = -Infinity;
//
//    for (let node in graph)
//        max_path = Math.max( max_path, probe(node) );
//
//    return max_path;
};

