const dev = import.meta.env.DEV;
window.clone = function (value) {
    if (value === undefined) return undefined;

    return JSON.parse(JSON.stringify(value));
}

window.dd = function (args) {
    if (dev) console.log(args);
    return '';
};
