var containsDuplicate = function(a) {
    /* map provides much better performance than obj, maybe
       Object searches by linear search in the backend

       looks like a.pop() is also expensive. with it the accuracy
       is 50% better, without it, it's 83%. Maybe it does do something
       linear.
     */

    let a_map = new Map();

    for (let i=0; i < a.length; i++) {
        if ( a_map.get(a[i]) == 0 ) return true;
        else a_map.set(a[i],0);
    }
    return false;
};
