var connect = function(root) {
    if (!root) return null;
    /**
       BFS approach. At each iteration, the list contains all the nodes that we
       n are will encounter at this level. turn this list into a linked list. Then
       iterate like the usual BFS algorithm.

       The complexity can be improved by using moris traversal algorithm. We just need
       to find where we need to return.
    */
    let h = root;

    while ( h.left ) {  // will run unitl height of the tree = log(n)
        let next_level = h.left;
        let prev_h = null;

        while ( h ) { // will run until the end of each level: max can be (n/2)
            h.left.next = h.right;
            if (prev_h) prev_h.right.next = h.left;
            prev_h = h;
            h = h.next;
        }
        h = next_level;
    }

    return root;

//    let visiting_list = [root];
//
//    while (visiting_list.length) {
//        let L = visiting_list.length;
//        for ( let i=0; i < L-1; i++)
//            visiting_list[i].next = visiting_list[i+1];
//        visiting_list[L-1].next = null;
//
//        for (let i=0; i < L; i++) {
//            let node = visiting_list.shift();
//            if (node.left) visiting_list.push(node.left);
//            if (node.right) visiting_list.push(node.right);
//        }
//    }
//
//    return root;
};
