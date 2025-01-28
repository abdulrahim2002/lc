let reverse_list = (node, parent) => {
    if (!node.next) {
        node.next = parent;
        return node;
    }
    let next_node = node.next;
    node.next = parent;
    return reverse_list(next_node, node);
};

var reverseList = function(head) {
    if (!head) return null;
    return reverse_list(head, null);
};
