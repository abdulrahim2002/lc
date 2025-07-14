bool increasingTriplet(int* nums, int numsSize) {
        /*
         * The basic idea here is that we keep track of 2 variables. lowest and
         * middle. Now at each number in the input, we if:
         *
         * Current number is smaller than lowest, lowest <- current numer
         * Current number is greater than lowest but smaller than middle, middle <- current number
         * Current number is greater than both lowest and middle.
         *     This is a valid sequence -> return true
         *
         * return false at last
         */
        int first = INT_MAX, second = INT_MAX;

        for ( int i=0; i < numsSize; i++ ) {

                if ( nums[i] <= first )
                        first = nums[i];

                else if ( nums[i] <= second )
                        second = nums[i];

                else
                        return true;
        }

        return false;
}
