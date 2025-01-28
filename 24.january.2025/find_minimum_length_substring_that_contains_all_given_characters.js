var minWindow = function(s, t) {
    if (s.length < t.length) return "";

    let tMap = {};
    // Create a frequency map for characters in t
    for (const char of t) {
        tMap[char] = (tMap[char] || 0) + 1;
    }

    let start = 0;
    let end = 0;
    let minLength = Infinity;
    let minStart = 0;
    let required = Object.keys(tMap).length; // Number of unique characters in t
    let formed = 0; // To count how many unique characters meet their required frequency
    let windowCounts = {}; // Current window character frequency map

    while (end < s.length) {
        const char = s[end];
        // Add character to the current window
        windowCounts[char] = (windowCounts[char] || 0) + 1;

        // Check if the character's frequency in the window matches the required frequency in tMap
        if (tMap[char] && windowCounts[char] === tMap[char]) {
            formed++;
        }

        // Try to shrink the window if all required characters are formed
        while (start <= end && formed === required) {
            const currentLength = end - start + 1;
            if (currentLength < minLength) {
                minLength = currentLength;
                minStart = start;
            }

            // Remove the start character from the window
            const startChar = s[start];
            windowCounts[startChar]--;
            if (tMap[startChar] && windowCounts[startChar] < tMap[startChar]) {
                formed--;
            }
            start++;
        }

        end++;
    }

    return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
};
