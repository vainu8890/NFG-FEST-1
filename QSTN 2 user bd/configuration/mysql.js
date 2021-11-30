var mysql = require('mysql2');
var config = require('./index')();

var connection = undefined;

exports.mysqlConnection = function () {
    if (connection) {
        console.log('Returning existing connection pool');
        return connection;
    }
    // Important: Ensure that sum of all the server node's pool connectionLimit size < db's max_connections
    connection = mysql.createPool({
        connectionLimit: config.DB_CONNECTION_LIMIT || 25,
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        port: config.DB_PORT,
        debug: config.DB_DEBUG || false
    });

    connection.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });

    connection.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });

    connection.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });

    //Flag to identify db connection type, It's required for handling transactional connections
    connection.is_pool_conn = true;
    return connection;
};

exports.transactionalConnection = function () {
    return new Promise(function (resolve, reject) {
        if (!connection) {
            return reject(new Error('Connection is not intialized.'));
        }
        if (!connection.is_pool_conn) {
            return resolve(connection);
        }
        connection.getConnection(function (err, conn) {
            if (err) {
                return reject(err);
            }
            return resolve(conn);
        });
    });
};
