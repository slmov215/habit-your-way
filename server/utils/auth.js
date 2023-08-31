const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // console.log('Auth middleware executed');
    // console.log('Received headers:', req.headers); 
    // allows token to be sent via  req.query or headers
    // let token = req.query.token || req.headers.authorization || req.body.token;
    let token = req.headers.authorization || '';
    
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    
    console.log('Received token:', token); 

    if (!token) {
      console.log('No token found');
      return { ...req, user: null };
    }

    // verify token and get user data out of it
    try {
      const decodedToken = jwt.verify(token, secret);
      console.log('Decoded Token:', decodedToken);
      const user = decodedToken.data; 

      console.log('User data attached to request:', user);
      return { ...req, user }; 
    } catch (err){
      console.log('Invalid token', err);
      return { ...req, user: null };
    }

    // send to next endpoint
    // return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
