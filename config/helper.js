exports.hash = (string) => {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
        hash *= 37
        hash += string.charCodeAt(i)
    }
    return hash % 100000
}

exports.getColor = (string) => {
    let colors = [
        '#DC143C', '#FF0000', '#B22222', '#8B0000', '#FF69B4', '#FF1493', '#C71585', '#DB7093', 
        '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#F0E68C', '#BDB76B', '#663399', 
        '#8A2BE2', '#800080', '#4B0082', '#6A5ACD', '#32CD32', '#2E8B57', '#006400', '#808000', 
        '#8FBC8B', '#20B2AA', '#008080', '#5F9EA0', '#4682B4', '#1E90FF', '#00BFFF', '#0000FF', 
        '#000080', '#DAA520', '#D2691E', '#A52A2A', '#800000', '#808080', '#708090', '#2F4F4F'
    ]
    let hash = this.hash(string) % colors.length
    return colors[hash]
}