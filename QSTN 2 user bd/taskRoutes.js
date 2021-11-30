const express = require('express');
const taskService = require('taskServices');
const Token = require('../../../utils/token');

module.exports = function () {
    let RouteHelper = require('../../../utils/routeHelper')();
    const Router = express.Router();
        Router.post('/task',
        function (req, res) {
            return userService.create(req.body).then(resp => {
          return RouteHelper.sendResponse(res, {
                        "data": resp,
                        "msg" : "task created  success",
                       'status': 200
                    });
                });
            });
            }
        
        
        
    Router.put('/updateTask',
    function (req, res) {
        return userService.update(req.body).then(resp => {
            return RouteHelper.sendResponse(res, {
                "data": resp,
                 "msg" : "updation of data completed",
                'status': 200
            });
        });//->api/v1/product/updateuser
    });

    return Router;
