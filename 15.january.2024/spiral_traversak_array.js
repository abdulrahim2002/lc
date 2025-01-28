let RIGHT = -2;
let DOWN = -1;
let LEFT = 1;
let TOP = 2;

var spiralOrder = function(a) {

	if (a.length==0) return [];

	let n = a[0].length;
	let m = a.length;

	let i=0;
	let j=0;

	var is_valid = (x,y) => {
		return ( ( 0<= x && x < m  ) && (0 <= y && y < n ) );
	};

	let res = [];

	let dirs = [RIGHT, DOWN, LEFT, TOP];
	let d=0;

	let deadlock = false;

	while (!deadlock) {
		let initial_length = res.length;
		switch ( dirs[ d%4 ] ) {
			case RIGHT : {
				while (is_valid(i,j) && a[i][j]!=undefined ) {
					res.push(a[i][j]);
					a[i][j++] = undefined;
				}
				i++;j--;
				break;
			}
			case DOWN : {
				while (is_valid(i,j) && a[i][j]!=undefined ) {
					res.push(a[i][j]);
					a[i++][j] = undefined;
				}
				i--;j--;
				break;
			}
			case LEFT : {
				while (is_valid(i,j) && a[i][j]!=undefined ) {
					res.push(a[i][j]);
					a[i][j--] = undefined;
				}
				i--;;j++;
				break;
			}
			case TOP : {
				while (is_valid(i,j) && a[i][j]!=undefined ) {
					res.push(a[i][j]);
					a[i--][j] = undefined;
				}
				i++;j++;
				break;
			}
		}
		d++;
		let final_length = res.length;
		deadlock = (initial_length==final_length);
	}

	return res;
};
