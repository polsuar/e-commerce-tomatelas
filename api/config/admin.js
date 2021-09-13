
const verifyAdmin = (req, res, next) => {
  const { isAdmin } = req.body;
  if (isAdmin === false) {
    return res.status(401).send("Not an Admin");
  }
  next();
}; 

module.exports =  verifyAdmin;