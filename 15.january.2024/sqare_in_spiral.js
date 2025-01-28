var generateMatrix = function(n) {
    if (n==0) return [[]];

    let a = new Array(n).fill(null).map( () => new Array(n).fill(undefined) );

    let RIGHT = -2;
    let DOWN = -1;
    let LEFT = 1;
    let TOP = 2;

	let i=0;
	let j=0;

	var is_valid = (x,y) => {
		return ( ( 0 <= x && x < n  ) && ( 0 <= y && y < n ) );
	};

	let dirs = [RIGHT, DOWN, LEFT, TOP];
	let d=0;

	let deadlock = false;
    let prev = 0;

	while (!deadlock) {
        deadlock = true;
		switch ( dirs[ d%4 ] ) {
			case RIGHT : {
				while (is_valid(i,j) && a[i][j]==undefined ) {
					a[i][j++] = ++prev;
					deadlock = false;
				}
				i++;j--;
				break;
			}
			case DOWN : {
				while (is_valid(i,j) && a[i][j]==undefined ) {
					a[i++][j] = ++prev;
					deadlock = false;
				}
				i--;j--;
				break;
			}
			case LEFT : {
				while (is_valid(i,j) && a[i][j]==undefined ) {
					a[i][j--] = ++prev;
		                    	deadlock = false;
				}
				i--;;j++;
				break;
			}
			case TOP : {
				while (is_valid(i,j) && a[i][j]==undefined ) {
					a[i--][j] = ++prev;
					deadlock = false;
				}
				i++;j++;
				break;
			}
		}
		d++;
	}

	return a;
};
