const pool = require('./pool')

exports.getUser = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows
}

exports.addUser = async ({ username, password, first, last }) => {
    await pool.query('INSERT INTO users (username, password, first_name, last_name, member, admin) VALUES ($1,$2,$3,$4,$5,$6)', 
        [username, password, first, last, false, false]
    )
}

exports.getPosts = async () => {
    const { rows } = await pool.query('SELECT p.title, p.timestamp, p.text, u.username, u.first_name, u.last_name, u.member FROM posts p JOIN users u ON p.author_id = u.id')
    return rows
}

exports.addPost = async ({ title, text, author_id }) => {
    await pool.query('INSERT INTO posts (title, text, author_id) VALUES ($1,$2,$3)', 
        [title, text, author_id]
    )
}