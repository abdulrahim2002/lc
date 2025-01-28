var isNumber = function(s) {
    reg = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
    return reg.test(s);
};
