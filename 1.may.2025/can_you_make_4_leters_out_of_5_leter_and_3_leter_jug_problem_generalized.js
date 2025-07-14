/**
 * @param {number} x
 * @param {number} y
 * @param {number} target
 * @return {boolean}
 */
var canMeasureWater = function(capA, capB, target) {
    /**
       The idea is to explore all possible states. If for any state, the sum of
       both containers is target then return true, else return false. We must
       ensure that we systematically explored all possible states.
       Start with the state (0, 0).

       Let me ask you, what are the possible values of states. Value in left
       container ranges from 0 - capA, and in the right container ranges from 0
       - capB. Therefore, if you put that into perspective, we can declare a 2d
       array.

       For each state we have the following options, to generate next states.

       - Fill either jug completely with water
       - Completely empty either jug
       - Pour water from one jug into another until the receiving jug is full,
       or the transferring jug is empty
    **/
    const visited = Array.from({length:capA+1},
                               ()=>new Array(capB+1).fill(false));

    const bt_search = ( left, right ) => {
        if ( left + right === target ) return true;
        if ( visited[left][right] || left < 0 || right < 0 ||
             left > capA || right > capB )
            return false;

        visited[left][right] = true;

        if ( bt_search(capA, right) || bt_search(left, capB) )
            return true;
        if ( bt_search(0, right) || bt_search(left, 0) )
            return true;

        const pourLTR = Math.min( left, capB - right );
        if ( bt_search( left - pourLTR, right + pourLTR ) )
            return true;
        const pourRTL = Math.min( capA - left, right );
        if ( bt_search( left + pourRTL, right - pourRTL ) )
            return true;

        return false;
    }

    return bt_search(0, 0);
};
