const pb = require('../proto/greet_pb');

// call -> allows us to acces the request
// callback -> allows us to access the response
exports.greet = (call, callback) => {
    console.log('Gret was invoked');
    const res = new pb.GreetResponse().setResult(`Hello ${call.request.getFirstName()}`);

    // we send null on the call since we dont want to stream backwards
    callback(null, res);
}