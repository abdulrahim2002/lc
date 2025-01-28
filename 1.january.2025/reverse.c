int reverse(int x)
{
	/* *
	* provides INT_MIN and INT_MAX defined as -2147483648,	+2147483647
	* range of int (4 bytes).
	* */
	bool sign = x < 0 ? true : false;

	/* 2^31 is 214 748 3648 which has 10 digits. Hence
	 * it will never have more than 10 */
	char y[10] = {0};
	int _y = 0;

	/* All can negate without an overflow except -2147483648
	 * (INT_MIN) which negates to +2147483648 > INT_MAX, hence
	 * causing OVERFLOW */
	if (sign)
		if (!(x <= INT_MIN || x > INT_MAX))
			x = -x;
		else
			return false;

	/* Construct the number in a string backwords. At each
	 * iteration, get the units place and truncate the rightmost
	 * number until x becomes 0 */
	while (x && _y < 10) {
		int units = x%10 + 48;
		x = x/10;
		y[_y++] = units;
	}

	bool nine_digits = _y == 10 ? true:false;

	/* x is now 0 and y points to '\0' character  and we shall
	 * reconstruct the number +2147 4836 47 */
	for (int i = 0; i < _y; i++) {
		/* If the number occupies all the places available, then
		 * we need to check the number by each number otherwise
		 * we can be sure that no overflow will occur */
		if (nine_digits) {
			switch (i) {
				/* The maximum number that we can accomodate is
				 * 2^31 = 2147 483 647*/
				case 0:
					if (y[i] > '2')
						return false;
					else if (y[i] < '2')
						nine_digits = false;
					break;
				case 1:
					if (y[i] > '1')
						return false;
					else if (y[i] < '1')
						nine_digits = false;
					break;
				case 2:
					if (y[i] > '4')
						return false;
					else if (y[i] < '4')
						nine_digits = false;
					break;
				case 3:
					if (y[i] > '7')
						return false;
					else if (y[i] < '7')
						nine_digits = false;
					break;
				case 4:
					if (y[i] > '4')
						return false;
					else if (y[i] < '4')
						nine_digits = false;
					break;
				case 5:
					if (y[i] > '8')
						return false;
					else if (y[i] < '8')
						nine_digits = false;
					break;
				case 6:
					if (y[i] > '3')
						return false;
					else if (y[i] < '3')
						nine_digits = false;
					break;
				case 7:
					if (y[i] > '6')
						return false;
					else if (y[i] < '6')
						nine_digits = false;
					break;
				case 8:
					if (y[i] > '4')
						return false;
					else if (y[i] < '4')
						nine_digits = false;
					break;
				case 9:
					if (y[i] > '7')
						return false;
					else if (y[i] < '7')
						nine_digits = false;
					break;
				default:
					return false;
			};
		}
		x += (y[i] - 48) * pow(10, _y-i-1);
	}

	if (sign)
		return -x;
	return x;
}
