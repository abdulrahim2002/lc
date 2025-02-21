var lowestCommonAncestor = function(root, p, q) {
    /** the below approach is good but not the best. This question can be done
        in O(n) time and O(1) memory. The below approach works for all types of
        trees. But you are given a binary search tree.

        Let's try to utilize it's properties. What we are doing is essentially
        looking for 2 values p and q in a search tree.

        Oh oh oh! You can just binary search, and as long as both p and q ask
        you to go into the same direction, you move on. As soon as they point to
        2 different directions, this is the common node.

        This works even in cases when the ancestor is one of p and q. since at
        that p/q one of them will say we found the target while other will
        ask you to go in some direction hence producting conflict.
        Time: log n
        Space: 1
    */
    let low_ancestor = root;
    let node = root;

    while ( node ) {
        if ( p.val < node.val && q.val < node.val )
            node = node.left;
        else if ( p.val > node.val && q.val > node.val )
            node = node.right;
        else return node;
    }

    return low_ancestor;
};

//let is_ancestor = ( node, p, q, found={p:false, q:false} ) => {
//    if ( node === p ) found.p = true;
//    if ( node === q ) found.q = true;
//
//    if ( node.left && is_ancestor( node.left, p, q, found ) )
//        return true;
//    if ( node.right && is_ancestor( node.right, p, q, found ) )
//        return true;
//
//    if ( found.p && found.q ) return true;
//    return false;
//};
//
//var lowestCommonAncestor = function(root, p, q) {
//    /**
//       The absolute brute force is:
//       1. for every node in the tree
//       2. Check if p and q are it;s ancestors. this is accomplished by an exhaustive
//       dfs. mark the node as an ancestor
//       3. For all ancestors, return the one that has the lowest levels.
//       Time: DFS for each node:
//       Time: O(n ^ 2) and Space: O(n)
//       Maybe not to bad, lets implement.
//       But the better idea here is that we can prune the children of the nodes that we
//       know do not have p and q. Also, we only keep one variable low_ancestor that holds
//       the lowest level ancestors instead of keeping track of the levels seperately since
//       we know, that we are moving from high levels to low levels and the future ancestors
//       nodes will be lower in level that current nodes. Ja
//    */
//    let visiting_list = [root];
//    let low_ancestor = null;
//
//    while ( visiting_list.length ) {
//        let node = visiting_list.shift();
//
//        /* The children of the nodes that do not have p and q will not have
//           p and q either. Hence, prune them by not adding them to visinting
//           list. */
//        if ( !is_ancestor(node, p, q) ) continue;
//        if (node.left) visiting_list.push( node.left );
//        if (node.right) visiting_list.push( node.right );
//        low_ancestor = node;
//
//    }
//
//    return low_ancestor;
//};
