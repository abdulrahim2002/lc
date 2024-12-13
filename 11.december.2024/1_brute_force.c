/**
 * Note: The returned array must be malloced, assume caller calls free().
 */

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
        /*
         * find all (x,y) possible tupes
         * if nums[x] + nums[y] = target, return  x,y
         */
        *returnSize = 2;
        for (int x = 0; x < numsSize; x++) {
                for (int y = 0; y < numsSize; y++) {
                        if (x != y && nums[x] + nums[y] == target) {
                                int* required_indices = (int*) malloc( *returnSize * sizeof(int) );
                                required_indices[0] = x;
                                required_indices[1] = y;
                                return required_indices;
                        }
                }
        }
        return returnSize;
}
