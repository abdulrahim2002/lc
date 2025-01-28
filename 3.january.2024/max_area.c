#define MAX(a,b) ( ((a)>(b)) ? (a):(b))
#define MIN(a,b) ( ((a)<(b)) ? (a):(b))

int maxArea(int* y, int Y)
{
        int x1 = 0;
        int x2 = Y-1;
        int max_area = INT_MIN;

        while ( x1 < x2 ) {
                int area = (x2-x1) * MIN(y[x1], y[x2]); 
                if ( area > max_area )
                        max_area = area;
                if ( y[x1] < y[x2] )
                        x1++;
                else
                        x2--;
        }
        return max_area;
}
