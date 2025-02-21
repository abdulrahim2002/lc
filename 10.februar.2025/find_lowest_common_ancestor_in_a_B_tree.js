var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
};

//let is_ancestor = ( node, p, q, found={p:false, q:false} ) => {
//   if ( node === p ) found.p = true;
//   if ( node === q ) found.q = true;
//
//   if ( node.left && is_ancestor( node.left, p, q, found ) )
//       return true;
//   if ( node.right && is_ancestor( node.right, p, q, found ) )
//       return true;
//
//   if ( found.p && found.q ) return true;
//   return false;
//};
//
//var lowestCommonAncestor = function(root, p, q) {
//    /**
//       This solutions is super slow.
//     */
//   let visiting_list = [root];
//   let low_ancestor = null;
//
//   while ( visiting_list.length ) {
//       let node = visiting_list.shift();
//
//       if ( !is_ancestor(node, p, q) ) continue;
//       if (node.left) visiting_list.push( node.left );
//       if (node.right) visiting_list.push( node.right );
//       low_ancestor = node;
//
//   }
//
//   return low_ancestor;
//};
