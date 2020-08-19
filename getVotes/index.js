const client = require('redis').createClient(6379, "learn-redis.qoauvk.0001.aps1.cache.amazonaws.com");
exports.handler = (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const name = event.for;
        // client.set("name", 0);
        client.get("dog", (err, value) => {
            if (err) {
                throw err;
            }

            client.get("cat", (err2, value2) => {
                if (err2) {
                    throw err2;
                }

                const response = {
                    statusCode: 200,
                    body: { "dog": value, "cat": value2 },
                };
                console.log(`response inside`);
                console.log(response);

                callback(null, response);
            });

            // client.quit();
            // return response;
        });

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
};
