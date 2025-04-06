function WrapError(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next); // Pass the error to Express's error handler
    };
}
module.exports=WrapError;