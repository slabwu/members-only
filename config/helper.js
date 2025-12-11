exports.hash = (string) => {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
        hash *= 37
        hash += string.charCodeAt(i)
    }
    return hash % 100000
}