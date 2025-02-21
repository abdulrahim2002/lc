var computeArea = function(Ax1, Ay1,
                           Ax2, Ay2,
                           Bx1, By1,
                           Bx2, By2) {
    /**
       Find the areas of 2 triangles and then
       subtract the common area once.
    */
    let area_A = Math.abs(Ay2-Ay1)*Math.abs(Ax2-Ax1);
    let area_B = Math.abs(By2-By1)*Math.abs(Bx2-Bx1);

	const overlapY = Math.max(Math.min(Ay2, By2) - Math.max(Ay1, By1), 0);
	const overlapX = Math.max(Math.min(Ax2, Bx2) - Math.max(Ax1, Bx1), 0);

	const common = overlapX * overlapY;

    return area_A+area_B-common;
};
