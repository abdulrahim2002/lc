const add = (a,b) => a+b;
const sub = (a,b) => a-b;
const mul = (a,b) => a*b;

// dispatch table
const apply = {
    "+": add,
    "-": sub,
    "*": mul,
};

var diffWaysToCompute = function(expression) {
    const memo = new Map();

    const rec_find = function(expression) {
        if ( memo.has(expression) )
            return memo.get( expression );

        // expression is a number
        if ( Number.isInteger( +expression ) )
            return (  [+expression] );

        let res = [];

        for ( let i=0; i < expression.length; i++ ) {
            const c = expression[i];

            if ( [ "+", "-", "*" ].includes(c) ) {
                /**
                    break the expression at the current character. call recursively to
                    find all possible values left subexpression and right subexpression
                    can take. then the value current expression as a whole can take is given
                    by:

                    list of possible values  =
                        all values left subexpression can take <operator> all values right subexpression can take
                **/
                let lvals = rec_find( expression.slice( 0, i ) );
                let rvals = rec_find( expression.slice( i+1 ) );

                for ( let i of lvals )
                    for ( let j of rvals )
                        res.push(  apply[c]( i, j ) );
            }
        }

        memo.set(expression, res);
        return res;
    };

    return rec_find(expression);
};
