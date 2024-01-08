const errorHandler = (err, req, res, next) => { 
    const statusCode = res.statusCode ? res.statusCode : 500   //ternary operator to check statuscode in response
    res.status(statusCode)
    res.json({
        message: err.message,
        //error stack finds the position/path of the error file
        stack : process.env.NODE_ENV === "development" ? err.stack : null,
    })
}

module.exports = errorHandler