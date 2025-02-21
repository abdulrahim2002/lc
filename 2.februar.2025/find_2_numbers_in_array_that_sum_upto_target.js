var twoSum = function(a, target) {
    let A = a.length;
    let i = 0;
    let j = A-1;

    while ( i < j ) {
        let sm = a[i] + a[j];
        if ( sm === target )
            break; // guranteed to break, since solution exists
        else if ( sm < target )
            i++;
        else j--;
    }

    return [i+1,j+1];
};
