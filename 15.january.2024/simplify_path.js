var simplifyPath = function(path) {
    let P = path.length;
    path = path.split('/');

    let dir_stack = [];

    for (dir of path) {
        if (dir == "" || dir == ".") continue;
        else if (dir == "..") {
            dir_stack.pop();
        }
        else {
            dir_stack.push(dir);
        }
    }

    return "/" + dir_stack.join("/");
};
