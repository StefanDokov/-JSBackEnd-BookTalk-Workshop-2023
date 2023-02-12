const config = {
    development : {
        PORT: 3000,
        connectionString: 'mongodb://127.0.0.1:27017/books',
        SECRET: '8AdzLaPZ'
    }
}

module.exports = config[process.env.node_env || 'development'];