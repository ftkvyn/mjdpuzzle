var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

function findById(id, fn) {
  User.findOne(id).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByFacebookId(id, fn) {
  User.findOne({
    fb_id: id
  }).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByEmail(email, fn) {
  User.findOne({
    email: email
  }).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.PUZZLE_FB_APP_ID,
    clientSecret: process.env.PUZZLE_FB_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {

    findByFacebookId(profile.id, function (err, user) {
      // Create a new User if it doesn't exist yet
      if (!user) {
        findByEmail(profile.emails[0].value, function (err, user) {
          if(user){
            // console.log('Connect fb to user user');
            user.fb_id = profile.id;
            user.fb_token = profile.accessToken;
            user.profilePicSmall = 'http://graph.facebook.com/' + profile.id + '/picture';
            user.profilePicLarge = 'http://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.save(function(err, user){
              if(err){
                return done(err, null, {
                  message: 'There was an error logging you in with Facebook'
                });
              }
              return done(null, user, {
                message: 'Logged In Successfully'
              });
            });    
          }else{
              User.create({
                fb_id: profile.id,
                fb_token: accessToken,
                name: profile.displayName,
                team: req.session.team,
                email: profile.emails[0].value,
                profilePicSmall: 'http://graph.facebook.com/' + profile.id + '/picture',
                profilePicLarge: 'http://graph.facebook.com/' + profile.id + '/picture?type=large',
              }).exec(function (err, user) {
                if (user) {            
                  user.isNew = true;
                  return done(null, user, {
                          message: 'Logged In Successfully'
                        });
                } else {                  
                  return done(err, null, {
                    message: 'There was an error logging you in with Facebook'
                  });
                }
              });
          }
        });
        

      // If there is already a user, return it
      } else {
        user.fb_token = accessToken;
        user.save(function(){
          return done(null, user, {
            message: 'Logged In Successfully'
          });
        });
      }
    });
  }
));