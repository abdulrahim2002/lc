#include <sys/param.h>

int trap(int* height, int heightSize)
{

        /*
          Call them buildings for convenience. The simple approach is that to
          iterate thruogh the buildings cumulating the height of water above
          each building.

          The height of water above each building can be calculated as follows:
          water@i = minimum(height of tallest building to left of current
          building, height of tallest building to the right of current building)
          - height of current building
         */

        int max_to_left[heightSize];
        int max_to_right[heightSize];

        max_to_left[0] = height[0]; // to avoid indexing out of bonds
        for (int i = 1; i < heightSize; i++)
                max_to_left[i] = MAX(max_to_left[i-1], height[i]);

        max_to_right[heightSize-1] = height[heightSize-1]; // to avoid indexing out of bonds
        for (int i = heightSize-2; i >=0; i--)
                max_to_right[i] = MAX(max_to_right[i+1], height[i]);

        int water = 0;
        for (int i = 0; i < heightSize; i++)
                water += MIN(max_to_left[i], max_to_right[i]) - height[i];

        return water;
}
