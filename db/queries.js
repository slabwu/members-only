const pool = require('./pool')
const { getColor } = require('../config/helper')

exports.getUser = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows
}

exports.addUser = async ({ username, password, first, last }) => {
    await pool.query('INSERT INTO users (username, password, first_name, last_name, member, admin, color) VALUES ($1,$2,$3,$4,$5,$6,$7)', 
        [username, password, first, last, false, false, getColor(username)]
    )
}

exports.editUser = async ({ id, username, first, last }) => {
    await pool.query('UPDATE users SET username = $1, first_name = $2, last_name = $3, color = $4 WHERE id = $5', 
        [username, first, last, getColor(username), id]
    )
}

exports.usernameTaken = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    return rows.length > 0
}

exports.grantMember = async (id) => {
    await pool.query('UPDATE users SET member = true WHERE id = $1', [id])
}

exports.grantAdmin = async (id) => {
    await pool.query('UPDATE users SET admin = true WHERE id = $1', [id])
}

exports.getPosts = async () => {
    const { rows } = await pool.query("SELECT *, p.id AS id, u.id AS user_id, u.first_name || ' ' || u.last_name AS name FROM posts p JOIN users u ON p.author_id = u.id ORDER BY p.id DESC")
    return rows
}

exports.getPost = async (id) => {
    const { rows } = await pool.query("SELECT *, p.id AS id, u.id AS user_id, u.first_name || ' ' || u.last_name AS name FROM posts p JOIN users u ON p.author_id = u.id WHERE p.id = $1", [id])
    return rows[0]
}

exports.addPost = async ({ title, text, author_id }) => {
    await pool.query('INSERT INTO posts (title, text, author_id) VALUES ($1,$2,$3)', 
        [title, text, author_id]
    )
}

exports.editPost = async ({ id, title, text }) => {
    await pool.query('UPDATE posts SET title = $1, text = $2 WHERE id = $3', 
        [title, text, id]
    )
}

exports.deletePost = async (id) => {
    await pool.query('DELETE FROM posts WHERE id = $1', [id])
}