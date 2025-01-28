var maxPoints = function(points) {
    if (!points) return 0;

    let INF = Number.MAX_SAFE_INTEGER;
    let max_points = 0;

    for ( let i=0; i < points.length; i++ ) {
        let slope_map = {};
        slope_map[INF] = slope_map[-INF] = slope_map[0] = 0;

        for ( let j=0; j < points.length; j++ ) {
            if ( i==j ) continue;

            let rain = points[i][0] - points[j][0];
            if (!rain) {
                slope_map[0]++;
                continue;
            }
            let rise = points[i][1] - points[j][1];
            if (!rise) {
                if ( rain > 0 ) slope_map[INF]++;
                else slope_map[-INF]++;
                continue;
            }

            let slope = rise/rain;
            if (slope_map[slope] !== undefined) slope_map[slope]++;
            else slope_map[slope] = 1;
        }

        max_points = Math.max(max_points,
                            Math.max(...Object.values(slope_map)) + 1 );
    }

    return max_points;
};
