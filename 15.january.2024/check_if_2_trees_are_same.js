/* since, values in the tree are small signed numbers. assigning
 this ensures that the values will not match with any of the node*/
let INT_MAX = Number.MAX_SAFE_INTEGER;

var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if ( (!p && q) || (p && !q) ) return false;

    /* ensured that both nodes are present
       hence, you can do p.val and q.val without worrying.
     */


    /* compare root; */
    let roots = (p.val == q.val);
    if (!roots) return false;

    /* root is same, compare children */
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);

    /* optimization */
    //let lc = isSameTree(p.left, q.left);
    //if (!lc) return false;
    //
    //else return isSameTree(p.right, q.right);
}
