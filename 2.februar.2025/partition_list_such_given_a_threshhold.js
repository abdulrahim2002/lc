var partition = function(head, x) {
    if (!head) return null;

    let res_gs = {next:null};
    let gs = res_gs;

    let res_gl = {next:null};
    let gl = res_gl;

    let h = head;

    while ( h ) {
        if (h.val < x) {
            gs.next = h;
            gs = gs.next;
            h = h.next;
        }
        else {
            gl.next = h;
            gl = gl.next;
            h = h.next;
        }
    }

    gs.next = res_gl.next;
    gl.next = null;

    return res_gs.next;
};
