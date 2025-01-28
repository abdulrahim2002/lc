var isBalanced = function(root) {
    if (!root) return true;
    let check = (node) => {
        if (!node) return 0;

        let left = check(node.left);
        if (left===-1) return -1;
        let right = check(node.right);
        if (right===-1) return -1;

        if ( Math.abs(left-right) <= 1 )
            return (1 +
                    Math.max( left, right)
            );
        else return -1;
    };
    return check(root)!==-1;
};
