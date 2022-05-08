const jwt = require('jsonwebtoken');

const JWT_SECRET = "Youare@#INsane";

// This is the verification file. This takes the auth token, 
// and changes it to the normal user and sets it to the request body
const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if(!token) {
    res.status(401).send({ error: "Please authenticate using a valid token"});
  }
  try {
    // verifying if the auth token we got is not tampered with.
    const data = jwt.verify(token, JWT_SECRET); 
    req.user = data.user;
    
    //  this function is the async or main function of the files.
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token"});
  }
}

module.exports = fetchuser