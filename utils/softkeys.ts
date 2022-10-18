function sortKeys(obj: Record<string, any>) {
    const copy = {} as Record<string, any>
    const allKeys = Object.keys(obj).sort()
    allKeys.forEach((key) => {
        copy[key] = obj[key]
    })
    return copy
}

module.exports = {sortKeys}