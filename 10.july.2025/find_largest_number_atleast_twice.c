int dominantIndex(int* nums, int nums_size)
{
        int max_num = -1, max_idx = -1;

        for ( int i=0; i < nums_size; i++ ) {
                if ( nums[i] > max_num ) {
                        max_num = nums[i];
                        max_idx = i;
                }
        }

        for ( int i=0; i < nums_size; i++ ) {
                if ( i != max_idx && (2 * nums[i]) > max_num )
                        return -1;
        }

        return max_idx;
}
