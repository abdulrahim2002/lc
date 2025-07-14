class MinHeap {
    constructor(arr) {
        this.heap = arr === undefined ? [] : [...arr];
        this.heapify();
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapify() {
        const n = this.heap.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.sift_down(i);
        }
    }

    sift_down(i) {
        const a = this.heap;
        const n = a.length;

        if (i < 0 || i >= n) {
            throw new Error(`Invalid index: ${i}`);
        }

        while (true) {
            const lc = 2 * i + 1;
            const rc = 2 * i + 2;
            let smallest = i;

            if (lc < n && a[lc] < a[smallest]) smallest = lc;
            if (rc < n && a[rc] < a[smallest]) smallest = rc;

            if (smallest !== i) {
                this.swap(i, smallest);
                i = smallest;
            } else {
                break;
            }
        }
    }

    sift_up(ci) {
        const a = this.heap;
        const n = a.length;

        if (ci < 0 || ci >= n) {
            throw new Error(`Invalid index: ${ci}`);
        }

        while (true) {
            const parent = Math.floor((ci - 1) / 2);
            if (parent >= 0 && a[ci] < a[parent]) {
                this.swap(ci, parent);
                ci = parent;
            } else {
                break;
            }
        }
    }

    extract_min() {
        if (this.heap.length === 0) return undefined;
        this.swap(0, this.heap.length - 1);
        const min = this.heap.pop();
        if (this.heap.length > 0) {
            this.sift_down(0);
        }
        return min;
    }

    insert(value) {
        if (typeof value === "number") {
            this.heap.push(value);
            this.sift_up(this.heap.length - 1);
        } else if (Array.isArray(value)) {
            for (const num of value) {
                this.insert(num);
            }
        } else {
            throw new Error("Invalid value type");
        }
    }

    remove(value) {
        if (typeof value === "number") {
            const idx = this.heap.indexOf(value);
            if (idx === -1) return;
            if (idx === this.heap.length - 1) {
                this.heap.pop();
            } else {
                this.swap(idx, this.heap.length - 1);
                this.heap.pop();
                this.sift_down(idx);
            }
        } else if (Array.isArray(value)) {
            for (const num of value) {
                this.remove(num);
            }
        } else {
            throw new Error("Invalid value type");
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    size() {
        return this.heap.length;
    }
}

