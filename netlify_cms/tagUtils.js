/**
 * @param {string} s
 */
export function parseTagProps(s) {
    const reg = /\W*(.*?)\W*=\W*"(.*?)"/g

    let result
    let props = {};
    while (result = reg.exec(s)) {
        const [_, propName, propValue] = result
        props[propName] = propValue;
    }

    return props;
}

/**
 * @param {object} o
 */
export function specialStringify(o) {
    return JSON.stringify(o).replaceAll('"', '&#x22;')
}

/**
 * @param {string} s
 */
export function specialParse(s) {
    return JSON.parse(s.replaceAll('&#x22;', '"'))
}