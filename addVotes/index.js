const client = require('redis').createClient(6379, "learn-redis.qoauvk.0001.aps1.cache.amazonaws.com");
exports.handler = (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const name = event.for;

        client.get(name, (err, value) => {
            if (err) {
                throw err;
            }

            let bdy = {};
            if (!value) {
                client.set(name, 1);
                bdy = {};
                bdy[name] = 1;
                const response2 = {
                    statusCode: 200,
                    body: bdy
                };
                callback(null, response2);
            } else {
                client.incr(name, (err2, value2) => {
                    if (err2) {
                        throw err2;
                    }
                    bdy = {};
                    bdy[name] = value2;
                    const response = {
                        statusCode: 200,
                        body: bdy
                    };
                    callback(null, response);
                });
            }
        });

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
};
