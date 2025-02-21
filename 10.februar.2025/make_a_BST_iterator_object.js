var BSTIterator = function(root) {
    this.cur = root;
    this.stack = [];
    this.save_left();
};

BSTIterator.prototype.save_left = function() {
    /* from this node to the leftmost node, put all nodes in a stack take the
       current pointer to the leftmost null */
    while ( this.cur ) {
        this.stack.push( this.cur );
        this.cur = this.cur.left;
    }
}

BSTIterator.prototype.next = function() {
    /* return the element at the top of stack and take the update stack with
     * left values */
    if ( !this.hasNext ) return undefined;

    let next = this.stack.pop();
    this.cur = next.right;
    this.save_left();
    return next.val;
};

BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0;
};

//var BSTIterator = function(node) {
//    /**
//       The next approach is to convert the tree into a linked list of in-order traversal
//       This approach builds the list in O(n) time and next and hasNext operations are O(1)
//       No memory is used. i.e. Space = O(1) und Time = O(n) // to build, O(1) otherwise
//       Drawbacks: The original tree structure is lost.
//
//       * Could you implement next() and hasNext() to run in average O(1) time
//       and use O(h) memory, where h is the height of the tree?
//       Yes, just convert it into a linked list and adjust the right pointers to
//       point to next node.
//
//       This approach uses morris traversal. It builds a linked list out of a binary search tree in O(n) time.
//       then we can use this linked list very easily.
//    */
//    let list = new TreeNode(-1);
//    let g = list;
//    let h = node;
//
//    while ( h ) {
//        if (!h.left) {
//            g.right = h;
//            g = g.right;
//            h = h.right;
//        }
//        else {
//            let ls = h.left;
//            while ( ls.right ) ls = ls.right;
//            ls.right = h;
//            let tmp = h.left;
//            h.left = null;
//            h = tmp;
//        }
//    }
//
//    this.cur = list.right;
//    return null;
//};
//
//BSTIterator.prototype.next = function() {
//    if (this.cur) {
//        let ret = this.cur.val;
//        this.cur = this.cur.right;
//        return ret;
//    }
//    return undefined;
//};
//
//BSTIterator.prototype.hasNext = function() {
//    if ( this.cur ) return true;
//    return false;
//};
//
///**
// * The task is to implement a stucture that can supply the next node of in-order
// * traversal of binary tree. To implement the in-order traversal, we first need
// * to understand how do we generate in-order traversal.
//
// In order traversal means: L N R
//
// Hence, we traversal in depth first search, and keep the nodes in-order.
//
// def in_order(node):
//    explore node.left
//    // do the stuff with node
//    explore node.right
//
//    So this is the general algorithm. Now, if we want to implement a structure
//    that can provide this order on the flow, we need to keep some pointers.
//    First we need to keep a pointer to the current node. Then we need to
//    determine weather the left subtree has been explored. If no, then explore
//    it, otherwise, explore current node,, and then explore right subtree. After
//    all of them explored, return to parent node. This is what the stack
//    implementation does. In fact, it uses O(log n) space to do it.
//
//    Now if we want to make a structure that does it on the fly, then we have a
//    few options. Either we precalculate the traversal and store it in an array.
//    Then we keep a pointer to current node. And increment this pointer whenever
//    the next node is asked for.
//    Time: O(n) // to build, O(1) after words
//    Space: O(n)
//
//    The other option is to explore the tree live. to do this, we should keep
//    track of the variables that are used on the recursive approach. I think we
//    would be required to use moris traversal here.
//    Time: O(1) // all operations
//    Space: O(1)
// */
//
//var BSTIterator = function(root) {
//    /**
//       @root: Object of TreeNode(val, left, right)
//       Naive approach: precalculate the pre-order
//       Time: O(n)
//       Space: O(n)
//
//       Better approach: Convert the tree traversal into a linked list.
//       Time: O(n) // to build, and O(1) afterwards
//       Space: O(1) // no auxiliary space
//
//       Even better approach: find out a way to keep state in the traversal, and
//       increment in a controlled manner.
//    */
//    this.pre_calculated = [];
//    let in_order = (node) => {if (!node)return;in_order(node.left);this.pre_calculated.push(node);in_order(node.right);};
//    in_order(root);
//    this.len = this.pre_calculated.length; // length of in order array
//    this.cur = 0; // pointer to current node in the list.
//
//    console.log(this.pre_calculated);
//
//    return null;
//};
//
//BSTIterator.prototype.next = function() {
//    /**
//       int next() Moves the pointer to the right, then returns the number at
//       the pointer.
//    */
//    if (this.cur >= this.len) return undefined; // they are saying that this will never be executed
//    return this.pre_calculated[this.cur++].val;
//};
//
//BSTIterator.prototype.hasNext = function() {
//    /**
//       boolean hasNext() Returns true if there exists a number in the
//       traversal to the right of the pointer, otherwise returns false.
//     */
//    if (this.cur < this.len) return true;
//    return false;
//};
//
///**
//       * BSTIterator(TreeNode root): Initializes an object of the BSTIterator
//       class. The root of the BST is given as part of the constructor. The
//       pointer should be initialized to a non-existent number smaller than any
//       element in the BST.
//*/
//
//
///**
// * Your BSTIterator object will be instantiated and called as such:
// * var obj = new BSTIterator(root)
// * var param_1 = obj.next()
// * var param_2 = obj.hasNext()
// */
