var getRow = function(n) {
    let row = [1];
    for ( let i=0; i < n; i++ ) {
        for ( let j=1; j < row.length )
            row[j] = row[j] + row[j-1];
        row.push(1);
    }
    return row;
};
