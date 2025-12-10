const pool = require('./pool')

exports.getUser = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows
}

exports.postUser = async (user) => {
    await pool.query('INSERT INTO users (username, password, first_name, last_name, member, admin) VALUES ($1,$2,$3,$4,$5,$6)', 
        [user.username, user.password, user.first, user.last, user.member, user.admin]
    )
}

exports.getPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts')
    return rows
}

exports.postPost = async () => {
    await pool.query('INSERT INTO posts (title, text, author_id) VALUES ($1,$2,$3)', 
        [user.title, user.text, user.author_id]
    )
}