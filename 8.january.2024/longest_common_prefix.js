var longestCommonPrefix = function(strings) {
	let S = strings.length;
	var max_ind = 0;

	while (max_ind < strings[0].length) {
		c = strings[0][max_ind];
		for (var i=0; i<S; i++) {
			if ( c ^ strings[i][max_ind] )
				return strings[0].slice(0,max_ind);
		}
		max_ind++;
	}
	return strings[0];
};
