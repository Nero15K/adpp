var db = require('mysql');

module.exports = {
    initQuery: function (queries, success, fail) {
        executeQuery(queries, success, fail);
    },
    makeid: function (length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    output: function (res, status, result) {
        let response = {status: status};
        if (status === "ok") {
            response.payload = result;
        }else{
            response.message = errorCodes[result];
        }

        res.send(response);
    }
};

// exported

function executeQuery(queries, success, fail) {
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }

        console.log('init');
        queryQueue(0, connection, queries, success, fail);
    });
}


// private
let connection = initializeConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "adpp",
    //insecureAuth : true
});

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = db.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}

function queryQueue(i, connection, queries, success, fail, result) {
    if (i === queries.length) {
        connection.commit(function (err) {
            console.log(err);
            if (err) {
                console.log("rolling back");
                connection.rollback(function () {
                    fail(err);
                    console.log(err)
                });
            }

            success(result);
        });

        return;
    }

    console.log("query: " + i);
    console.log(queries[i]);

    connection.query(queries[i].sql, queries[i].params, function (error, result, fields) {
        if (error) {
            connection.rollback(function () {
                fail(error);
            });
        }

        if (queries[i].success != null) {
            queries[i].success(i, result);
        }

        queryQueue(i + 1, connection, queries, success, fail, result);
    });
}

let errorCodes = {
    "500":"internal error",
};