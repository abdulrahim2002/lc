var rob = function(a) {
    let A = a.length;
    if (A < 3) return Math.max(...a);

    let test_rob = (x, y, a) => {
        if (y - x + 1 == 1) return a[x];
        if (y - x + 1 == 2) return Math.max(a[x], a[y]);

        let prev_2 = a[x];
        let prev_1 = Math.max(a[x], a[x+1]);
        let loot = prev_1;

        for (let i = x + 2; i <= y; i++) {
            loot = Math.max(prev_2 + a[i], prev_1);
            prev_2 = prev_1;
            prev_1 = loot;
        }

        return loot;
    };

    return Math.max(test_rob(0, A-2, a),
                    test_rob(1, A-1, a));
};
