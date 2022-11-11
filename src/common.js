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

export const dateFormat = params => {
    const date = new Date(params)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let i = date.getMinutes()
    let s = date.getSeconds()

    m = m < 10 ? '0' + m : m
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    i = i < 10 ? '0' + i : i
    s = s < 10 ? '0' + s : s

    return `${y}-${m}-${d} ${h}:${i}:${s}`
}

export const timestamp = param => {
    return (new Date(param)).getTime()
}

export const today = key => {
    const date = new Date()
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()

    m = m < 10 ? '0' + m : m
    d = d < 10 ? '0' + d : d

    return ({
        start: `${y}-${m}-${d} 00:00:00`,
        end: `${y}-${m}-${d} 23:59:59`
    })[key]
}

