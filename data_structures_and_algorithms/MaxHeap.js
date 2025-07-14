/**
   Implementation of a MaxHeap. Returned value is a regular array of numbers.
**/
class MaxHeap {
    constructor(arr) {
        /** define a Max Heap **/
        this.heap = arr === undefined ? [] : [...arr];
        this.heapify();
    }

    swap(i, j) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = tmp;
    }

    heapify() {
        /** construct a max heap, from array of random elements **/
        const n = this.heap.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
            this.sift_down(i);
    }

    sift_down(i) {
        /** push down the value @i until heap property is satisfied **/
        const a = this.heap;
        const n = a.length;

        if (i < 0 || i >= n)
            throw new Error(`Invalid index: ${i}`);

        while (true) {
            const lc = 2 * i + 1;
            const rc = 2 * i + 2;
            let largest = i;

            if (lc < n && a[lc] > a[largest]) largest = lc;
            if (rc < n && a[rc] > a[largest]) largest = rc;

            if (largest !== i) {
                this.swap(i, largest);
                i = largest;
            }
            else break;
        }
    }

    sift_up(ci) {
        /** Push value @ci (child index) upwards, until heap property
         * satisfied **/
        const a = this.heap;
        const n = a.length;

        if (ci < 0 || ci >= n)
            throw new Error(`Invalid index: ${ci}`);

        while (true) {
            const parent = Math.floor((ci - 1) / 2);
            if (parent >= 0 && a[ci] > a[parent]) {
                this.swap(ci, parent);
                ci = parent;
            }
            else break;
        }
    }

    extract_max() {
        /** extract the elemet at top of heap (maximum element) **/
        if (this.heap.length === 0)
            return undefined;

        this.swap(0, this.heap.length - 1);

        const max = this.heap.pop();

        if (this.heap.length > 0)
            this.sift_down(0);

        return max;
    }

    insert(value) {
        /** inserts either a single number or an array of numbers into the
         * heap **/
        if (typeof value === "number") {
            this.heap.push(value);
            this.sift_up(this.heap.length - 1);
        }
        else if (Array.isArray(value))
            for (const num of value)
                this.insert(num);
        else
            throw new Error("Invalid value type");
    }

    remove(value) {
        /** Removes the first occurence of a number if argumen is a single
         * number. If argument is an array, All values in the provided array are
         * removed. Note that this is O(n) operation just like in normal
         * array **/
        if (typeof value === "number") {
            const idx = this.heap.indexOf(value);
            if (idx === -1) return;
            if (idx === this.heap.length - 1)
                this.heap.pop();
            else {
                this.swap(idx, this.heap.length - 1);
                this.heap.pop();
                this.sift_down(idx);
            }
        }
        else if (Array.isArray(value)) {
            for (const num of value)
                this.remove(num);
        }
        else
            throw new Error("Invalid value type");
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    size() {
        return this.heap.length;
    }
}
