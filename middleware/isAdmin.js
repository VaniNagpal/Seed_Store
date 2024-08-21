module.exports.isAdmin = (req, res, next) => {
   
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next(); 
    } else {
        res.status(403).send('Access denied. You need to be an admin to access this route.'); // Send an error response if not an admin
        
    }
};