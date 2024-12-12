#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 255

#define ASSERT_EQUALS(left, right) ( \
		(left)[0]==(right)[0] && \
		(left)[1]==(right)[1] )


/*
 *
 * How would you define the structure.
 * Well, the structure we require will contain a metadata on an array.
 * It will contain
*/


int* twoSum(int*, int, int);
/*
 * This hashmap contains individual
 */
struct map_array {
	int* this_array;
	bool init;	/* Weather initialized */
	int* indexes[];
	int* 
	bool* (initialize_map());
	int* get_index(void* );
};


int main()
{
        int nums1[] = {2,7,11,15};
        int size_nums1 = sizeof(nums1)/sizeof(nums1[0]) ;
        int target1 = 9;
        int expected_answer1[] = {0,1};

        int* out1 = twoSum(nums1, size_nums1,  target1);
        if (ASSERT_EQUALS(out1, expected_answer1)) {
		printf("nums1: ");
		for (int i = 0; i < size_nums1; i++)
			printf("%d ", nums1[i]);
		printf("\ntarget1: %d\n", target1);
		printf("out1: ");
		for (int i = 0; i < 2; i++)
			printf("%d ", out1[i]);
                printf("\nSuccess for test case 1\n");
	}
        else
                printf("Failure on test case 1\n");
        free(out1);

        
        int nums2[] = {3,2,4};
        int target2 = 6;
        int size_nums2 = sizeof(nums2)/sizeof(nums2[0]);
        int expected_answer2[] = {1,2};

        int* out2 = twoSum(nums2, 3, target2);
        if (ASSERT_EQUALS(out2, expected_answer2)) {
                printf("nums2: ");
        for (int i = 0; i < size_nums2; i++)
			printf("%d ", nums2[i]);
		printf("\ntarget2: %d\n", target2);
		printf("out2: ");
		for (int i = 0; i < 2; i++)
			printf("%d ", out2[i]);
        printf("\nSuccess for test case 2\n");
	}
        else
                printf("Failure on test case 2\n");
        free(out2);


        int nums3[] = {3,3};
        int target3 = 6;
	int size_nums3 = sizeof(nums3)/sizeof(nums3[0]);
        int expected_answer3[] = {0,1};

        int* out3 = twoSum(nums3, sizeof(nums3), target3);
        if (ASSERT_EQUALS(out3, expected_answer3)) {
		printf("nums3: ");
		for (int i = 0; i < size_nums3; i++)
			printf("%d ", nums3[i]);
		printf("\ntarget3: %d\n", target3);
		printf("out3: ");
		for (int i = 0; i < 2; i++)
			printf("%d ", out3[i]);
                printf("\nSuccess for test case 3\n");
	}
        else
                printf("Failure on test case 3\n");
        free(out3);

}

int get_index(map)
{
	
}

int* twoSum(int* nums,
            int numsSize,
            int target)
{
    /*
	 * We create a hash map, where you can query the hashmap if a
	 * particular element exists and if yes, return it's index and
	 * no then return -1.
	 * 
	 * After we create the hashmap, we traverse the array. For each
	 * element, we find Δ = if target - this_element exists in the
	 * array, using our hashmap_query. If it does, then return the 2
	 * indices else continue
	 */
	struct map_nums array;
	
	for (int i = 0; i < numsSize; i++) {
		int delta = target - nums[i];
		if ( )
	}
	
}
