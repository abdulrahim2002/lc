/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];

    let operators = {
        "+": 1,
        "-": 1,
        "*": 1,
        "/": 1
    }

    for ( token of tokens ) {

        // token is an operator
        if ( operators[token] === 1 ) {
            // get left and right operands
            let op2 = stack.pop();
            let op1 = stack.pop();

            // invalid expression
            if ( op1 === undefined || op2 === undefined )
                return undefined;

            // evaluate the result and push back
            let res;

            switch (token) {

            case "+":
                res = op1 + op2;
                break;
            case "-":
                res = op1 - op2;
                break;
            case "*":
                res = op1 * op2;
                break;
            case "/":
                res = op1 / op2;
                break;
            default:
                raise: Error("Operator not supported");
                break;

            }

            // truncate towards 0
            res = ( res < 0 ) ? -1*Math.floor(-res) : Math.floor(res);

            stack.push( res );
        }
        // token is an operand. Just push it into stack as integer
        else {
            stack.push(+token);
        }
    }

    return stack[0];
};
