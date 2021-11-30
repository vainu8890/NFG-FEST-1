const DBHelper = require('../config/dbHelper');
const Task = require('Task');


exports.create = async (conn, status,description) => {
    let task = new Task(status,description);
    const taskSqlObj = DBHelper.insertQuery('user', user);
    return DBHelper.runSqlQuery(conn, taskSqlObj.sql, taskSqlObj.valueArr).then(() => {
        return user;
    });
}

exports.update = async (conn,id,status,description) => {
    const taskUpdateSql = 'UPDATE Product SET status=? ,description=?';
    return DBHelper.runSqlQuery(conn, taskUpdateSql, [id,status,description]);
}
​
