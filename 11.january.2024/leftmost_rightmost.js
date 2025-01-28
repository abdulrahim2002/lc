var searchRange = function(a, target) {

    var MAX_INT = Number.MAX_SAFE_INTEGER;
    var MIN_INT = Number.MIN_SAFE_INTEGER;

    const A = a.length;
    var leftmost=MAX_INT;
    var rightmost=MIN_INT;

    /* Find the rightmost target */
    var i=0; var j=A-1; var mid = i + Math.floor((j-i)/2);
    while ( i<=j ) {
        if ( a[mid] < target ) {
            i=mid+1;
            mid = i + Math.floor((j-i)/2);
        }
        else if ( target < a[mid] ) {
            j=mid-1;
            mid = i + Math.floor((j-i)/2);
        }
        else {
            rightmost = (mid > rightmost) ? mid:rightmost;
            i=mid+1;
            mid = i + Math.floor((j-i)/2);
        }
    }

    /* Find the leftmost target */
    i = 0;  j = A-1; mid = i + Math.floor((j-i)/2);
    while ( i<=j ) {
        if ( a[mid] < target ) {
            i=mid+1;
            mid = i + Math.floor((j-i)/2);
        }
        else if ( target < a[mid] ){
            j=mid-1;
            mid = i + Math.floor((j-i)/2);
        }
        else {
            leftmost = (mid < leftmost) ? mid:leftmost;
            j=mid-1;
            mid = i + Math.floor((j-i)/2);
        }
    }

    leftmost = (leftmost==MAX_INT) ? -1:leftmost;
    rightmost = (rightmost==MIN_INT) ? -1:rightmost;

    return [leftmost, rightmost];
};
