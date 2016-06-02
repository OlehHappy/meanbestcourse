var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {


  var token = jsonwebtoken.sign({
                id: user._id,
                name: user.name,
                username: user.username
              }, secretKey, {
                expiresIn: 86400000 // 1 day

  });

  return token;
}

        //----------Destination A (above MIDDLEWARE) --------------------------

module.exports = function(app, express, io) {
  var api = express.Router();
  api.get('/all_stories', function(req, res){
      Story.find({}, function(err, stories){
        if(err) {
          res.send(err);
          return;
        }
        res.json(stories);
      });
  });

  api.post('/signup', function(req, res) {
    var user = new User({
                  name: req.body.name,
                  username: req.body.username,
                  password: req.body.password
    });
    var token = createToken(user);

    user.save(function(err) {
      if(err) {
        res.send(err);
        return;
      }
      res.json({

        success: true,
        message: 'User has been created!',
        token: token

        });
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
      }).select('name username password').exec(function(err, user) {

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


      api.use(function(req, res, next) {
      console.log("Somebody just came to our app!");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        //CHECK if token exist
          if(token) {
              jsonwebtoken.verify(token, secretKey, function(err, decoded) {
              if(err) {
                res.status(403).send({
                  success: false,
                  message: "Fail to authenticate user"
                });

                } else {

                  req.decoded = decoded;

                  next();
                }
              });//jsonwebtoken.verify(token, secretKey, function(err, decoded)
            } //if(token)
              else{

                res.status(403).send({
                  success: false,
                  message: "No token provided"
                });
              } //else

       }); //app.use.function



            //--------Destination B --------//provide ligitimage toke


            api.route('/')

            .post(function(req, res) {

                var story = new Story({
                    creator: req.decoded.id,
                    content: req.body.content,

                }); //var Story = new St...

              story.save(function(err, newStory ) {
                    if(err) {
                      res.send(err);
                      return
                    }
                    io.emit('story', newStory)
                  res.json({ meassage: "New story created"});

              }); //story.save(functi....

            }) //.post(function(re...

              .get(function(req, res){

                Story.find({ creator: req.decoded.id }, function(err, stories) {

                  if(err) {
                    res.send(err);
                    return
                  }
                    res.json(stories);

                }); //Story.find({ crea..

              }); //.get(functi...


      api.get('/me', function(req, res) {

        res.json(req.decoded);


      });



  return api
}
