let btsearch = (a, A, saves, selected_numbers, k, target) => {
    /**
       @a: input array
       @A: length of input array
       @saves: saved solutions
       @selected_numbers: current solution set
       @k: find the next number in the range [k,A-1]
       @target: the next found element should either be target
       or smaller than target and then we can go on to find for k+1
    */
    for (let i=k; i<A; i++) {
        if ( i>k && i>0 && a[i]==a[i-1] ) continue;

        if ( a[i] == target ) {
            selected_numbers.push(a[i]);
            saves.push([...selected_numbers]);
            selected_numbers.pop();
        }
        else if ( a[i] < target ) {
            selected_numbers.push( a[i] );
            btsearch(a, A, saves, selected_numbers, i+1, target-a[i]);
            selected_numbers.pop();
        }
        else {
            /* a[i] if added would neved yield the answer, neither
               would any number greater then it. Hence break
            */
            break;
        }
    }
};

var combinationSum2 = function(a, target) {
    if (!a) return [];
    a.sort( (a,b)=>a-b );
    let A = a.length;
    let sol = [];
    btsearch(a, A, sol, [], 0, target);
    return sol;
};
