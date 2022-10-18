function sortKeys(obj) {
    var copy = {};
    var allKeys = Object.keys(obj).sort();
    allKeys.forEach(function (key) {
        copy[key] = obj[key];
    });
    return copy;
}
module.exports = { sortKeys: sortKeys };
