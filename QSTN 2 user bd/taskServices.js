const userController = require('taskController');
let mysql = require('../config/mysql');
let conn = mysql.mysqlConnection();



exports.add = function(body){
    if(body.status  == "backlog" || body.status == "todo" || body.status == "done" || body.status == "in-progress" ){
        return userController.create(conn,body.status,body.description);
    }
    else{
        body.status  = "backlog"
        return userController.create(conn,body.status,body.description);
    }
   
}


exports.update = async function (conn,id,body){
    return await userController.update(conn,id,body.status,body.description)
}


