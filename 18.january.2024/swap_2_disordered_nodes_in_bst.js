let in_order = (node, saves, state) => {
    if (!node) return;

    in_order(node.left, saves, state);

    if (state.prev && state.prev.val > node.val) {
        if (!state.first) {
            state.first = state.prev;
            state.second = node;
        }
        else {
            state.second = node;
        }
    }

    state.prev = node;

    in_order(node.right, saves, state);

};

var recoverTree = function(root) {
    /**
       the key to solving this question is to first accept that
       all you need to do is to just find 2 nodes that are out
       of their place. i.e. they are placed incorrectly.

       First thigns first, lets do the savagery things.
       Conjecture:: if you traverse a binary search tree :in order:
       you will traverse it in sorted order.. for example in 2,1,4,3
       in order: 1,2,3,4 (sorted)..

       So our first approach is to traverse the tree in sorted order
       and store the elments in an array. Then we will have elements
       like:
       a0, a1, a2, ... a_n-1

       the thing is that as per this problem, 2 nodes are swapped. Hence
       there are 2 nodes in this list that when swapped will give us the
       desired sorted list. You don't need to change the linking, just change
       the values.

       Next: when traversing a just sorted array, you will find that the order
       is disturbed at exactly 2 places. (if the elements are not adjacent)
       otherwise, the order is disturbed at exactly one place.

       Just find these 2 places to get the elements, and swap their values
    */

    let state = {
        prev: null,
        first: null,
        second: null,
    };

    in_order(root, [], state);

    /* swap first and second */
    let tmp = state.first.val;
    state.first.val = state.second.val;
    state.second.val = tmp;

    return root;
};


//
//let in_order = (node, saves) => {
//    if (!node) return;
//    in_order(node.left, saves);
//    /*business*/
//    saves.push(node);
//    in_order(node.right, saves);
//};
//
//var recoverTree = function(root) {
//    /**
//       the key to solving this question is to first accept that
//       all you need to do is to just find 2 nodes that are out
//       of their place. i.e. they are placed incorrectly.
//
//       First thigns first, lets do the savagery things.
//       Conjecture:: if you traverse a binary search tree :in order:
//       you will traverse it in sorted order.. for example in 2,1,4,3
//       in order: 1,2,3,4 (sorted)..
//
//       So our first approach is to traverse the tree in sorted order
//       and store the elments in an array. Then we will have elements
//       like:
//       a0, a1, a2, ... a_n-1
//
//       the thing is that as per this problem, 2 nodes are swapped. Hence
//       there are 2 nodes in this list that when swapped will give us the
//       desired sorted list. You don't need to change the linking, just change
//       the values.
//
//       Next: when traversing a just sorted array, you will find that the order
//       is disturbed at exactly 2 places. (if the elements are not adjacent)
//       otherwise, the order is disturbed at exactly one place.
//
//       Just find these 2 places to get the elements, and swap their values
//    */
//    let nodes = [];
//    in_order(root, nodes);
//
//    let first_blood = false;
//    let brother_in_arm = false;
//    let second_blood = false;
//
//    for (let i=0; i < nodes.length-1; i++) {
//        if (nodes[i].val > nodes[i+1].val) {
//            if (!first_blood) {
//                first_blood = nodes[i];
//                brother_in_arm = nodes[i+1];
//            }
//            else {
//                second_blood = nodes[i+1];
//            }
//        }
//    }
//
//    if (!second_blood) {
//        let tmp;
//        tmp = first_blood.val;
//        first_blood.val = brother_in_arm.val;
//        brother_in_arm.val = tmp;
//    }
//    else {
//        let tmp;
//        tmp = first_blood.val;
//        first_blood.val = second_blood.val;
//        second_blood.val = tmp;
//    }
//
//    for (n of nodes) console.log(n.val);
//
//    return root;
//};
//
//
