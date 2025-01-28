var dfs = (node, sum_until_now, target, sol, saves) => {
    if (!node) return;

    sum_until_now += node.val;
    sol.push(node.val);

    if (!node.left && !node.right && sum_until_now==target)
        saves.push([...sol]);

    dfs(node.left, sum_until_now, target, sol, saves);
    dfs(node.right, sum_until_now, target, sol, saves);

    sol.pop();
    sum_until_now -= node.val;
};

var pathSum = function(root, targetSum) {
    solutions = [];
    dfs(root, 0, targetSum, [], solutions);
    return solutions;
};
