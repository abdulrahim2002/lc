var longestValidParentheses = function(s) {
    /**
       What is the size of longest valid parantheses
       substring.

       Input: (()
       Output: 2 i.e. ()

       Input: )()())
       Output: 4 i.e. ()()

       The method to solve this question is to use a stack
       initialized with -1

       for each opening paranthesis: add index to tos
       for each closing paranthesis: pop stack.

       if stack not empty
       update max <- current index - top of stack

       Input: ())()
       i=0 -> stack=[-1,0]
       i=1 -> stack=[-1], len=1-(-1) = 2
       i=2 -> stack=[] -> stack=[2] // hence putting a new start is
                                    // imp here
       i=3 -> stack=[2,3]
       i=4 -> stack=[2] -> len=2 or 4-2=2
       end
    **/

    let len = 0;
    let stack = [-1];

    for ( let i=0; i < s.length; i++ ) {
        let tos = stack.lenght-1;
        // opening paranthesis
        if ( s[i] === '(' ) {
            stack.push(i);
        }
        // closing paranthesis
        else {
            // stack is empty
            stack.pop();
            if ( stack.length > 0 )
                len = Math.max(len, i - stack[stack.length-1] );
            else stack.push(i);
        }
    }

    return len;
};
