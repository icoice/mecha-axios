export const is = (v, t = '') => {
    if (t === 'object') return typeof v === 'object' && v !== null && !(v instanceof Array);
    if (t === 'promise' || t === Promise) return v instanceof Promise || (typeof v === 'object' && v !== null && typeof v.then === 'function' && typeof v.catch === 'function');
    if (t === 'null' || t === null) return v === null;
    if (t === 'array') return v instanceof Array;
    if (t === 'file') return v instanceof File;
    if (t === 'formData') return v instanceof FormData;
    if (typeof t !== 'string') return v instanceof t;

    return typeof v === t;
}

export const def = (v, d) => is(v, 'undefined') ? d : v;
export const loop = (v, cb = () => { }) => Object.entries(v).map(([k, v]) => cb(v, k));
export const empty = v => (v === '' || v === null || JSON.stringify(v) === '{}' || JSON.stringify(v) === '[]' || is(v, 'undefined'));
