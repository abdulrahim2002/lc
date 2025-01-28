/**
 * @param {string} s
 * @return {number}
 */

vaxr lengthOfLongestSubstring = function(s) {
    const last_seen = new Map();
    let current_max = back = front = 0;

    while (front < s.length) {
        if (last_seen.has(s[front])) {
            back = Math.max(back, last_seen.get(s[front])+1 );
        }
        current_max = Math.max(current_max, front - back + 1);
        last_seen.set(s[front], front);
        front++;
    }

    return current_max;
};
