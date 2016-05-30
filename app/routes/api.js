var User = require('../models/user');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

<<<<<<< HEAD
var token = jsonwebtoken.sign({
    _id: user._id,
    name: user.name,
    username: user.username
  }, secretKey, {
    expiresIn: 86400000
=======
  var token = jsonwebtoken.sign({
                _id: user._id,
                name: user.name,
                username: user.username
              }, secretKey, {
                expiresIn: 86400000 // 1 day
>>>>>>> 58ad11203ebbab2437e24e522635b75415bc481c
  });

  return token;
}


module.exports = function(app, express) {
  var api = express.Router();

  api.post('/signup', function(req, res) {
    var user = new User({
                  name: req.body.name,
                  username: req.body.username,
                  password: req.body.password
    });

    user.save(function(err) {
      if(err) {
        res.send(err);
        return;
      }
      res.json({message: 'User has been created!'});
    });
  });

  api.get('/users', function(req, res) {

    User.find({}, function(err, users) {
        if(err) {
          res.send(err);
          return;
        }
      res.json(users);
    });

  });

    api.post('/login', function(req, res) {

      User.findOne({
        username: req.body.username
      }).select('password').exec(function(err, user) {

        if(err) throw err;

        if(!user){
          res.send({ message: "User doesn't exist, bro. Just smoke and try again" });
        } else if(user) {

          var validPassword = user.comparePassword(req.body.password);

          if(!validPassword) {
            res.send({ meassage: "invalid password" });
          } else {
            ////////-------TOKEN----------------------
            var token = createToken(user);
             res.json({
                success: true,
                message: "Successfuly login!",
                token: token
             });
          } // if !validPassword

        } // if !user
      });
    });

      //------------------ MIDDLEWARE part ---------------

    app.use(function(req, res, next) {

      concole.log("Somebody just came to our app!");

        var.token = req.body.token || req.param('token') || req.headers['x-acces-token'];

        //CHECK if token exist

            if(token) {

              jsonwebtoken.verify(token, secretKey, function(err, decoded) {

                  if(err) {res.status(403).send({ success: false, message: "Fail to authinticate user" });

                } else {

                  req.ecoded = decoded;

                  next();
                }
              });//jsonwebtoken.verify(token, secretKey, function(err, decoded)
            } //if(token)
              else{

                res.status(403).send({ success: false, message: "No token provided"});

                

              } //else

       }); //app.use.function











  return api;
}
