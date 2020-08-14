module.exports.handler = (event, context, callback) => {
    let environment;
    if(process.env.NODE_ENV === 'production') {
        environment = 'Production'
    } else {
        environment = 'Development'
    }

    callback(null, {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify({
            status: `${environment} Lambda function working`
        })
    })

};
