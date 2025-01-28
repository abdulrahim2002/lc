var removeDuplicates = function(a) {
    /* We  have 2 pointers -> hunter and gatherer
       hunter = gets the next unique element. gatherer
       always points to the next possible element in
       the unique list should one be found
    */
    A = a.length;
    if (A<2) return a;

    var hunter = 1;
    var gatherer = 1;

    while (hunter < A && gatherer < A) {
        if (a[hunter] == a[gatherer-1]) {
            /* skip! duplicate. value hunter has already
               exists in the our unique element list
            */
            hunter++;
        }
        else {
            /* if (a[hunter] != a[gatherer-1])
              a unique element is found. append it to existing
               unique elment list.
            */
            a[gatherer++] = a[hunter++];
        }
    }

    return gatherer;

};
