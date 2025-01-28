


/* surprisingly the dfs version works much faster  */
let find_paths = (node, path_until_now, saves) => {
    if (!node.left && !node.right) {
        /* leaf node */
        saves.push( path_until_now + `${node.val}`);
        return;
    }

    path_until_now += `${node.val}->`;

    if (node.left) find_paths(node.left, path_until_now, saves);
    if (node.right) find_paths(node.right, path_until_now, saves);
};

var binaryTreePaths = function(root) {
    if (!root) return [];
    let saves = [];
    find_paths(root, "", saves);
    return saves;
};

/**
// uses bfs
var binaryTreePaths = function(root) {
    if (!root) return [];

    let saves = [];
    let visiting_list = [ [root, ""] ];

    while (visiting_list.length) {
        let [node, path] = visiting_list.shift();

        if (!node.left && !node.right)
            saves.push( path + `${node.val}`);

        let newpath = path + `${node.val}->`;

        if (node.left) visiting_list.push([ node.left, newpath ]);
        if (node.right) visiting_list.push([ node.right, newpath ]);
    }

    return saves;
};
*/
