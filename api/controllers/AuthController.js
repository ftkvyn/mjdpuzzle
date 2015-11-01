/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
var passport = require('passport');
var gravatar = require('gravatar');
var uuid = require('node-uuid');

module.exports = {
  
  logout: function (req, res){
    req.session.user = null;
    res.redirect('/');
  },

  fb_authenticate: function (req, res, next) {
  if(req.params.register){
    var captcha = req.params.captcha || '';
    captcha = captcha.toLocaleLowerCase();
  	var correctCaptcha = req.session.correctCaptcha;
  	if(captcha != correctCaptcha){
  		res.locals.message = 'Wrong captcha';
  		return res.redirect('/register');
  	}
    req.session.team = req.params.team;
    req.session.register = true;
  }
  else{
    req.session.register = false;   
  }
  passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
        function (err, user) {
  })(req, res, next);
  },

  fb_authenticate_callback: function (req, res, next) {
     passport.authenticate('facebook',
        function (err, user, info) {
          if(user){
            req.session.user = user;
            if(!user.team)
            {
              User.update({id: user.id}, {team: req.session.team || "sorcesec"})
              .exec(function(err, result){
                  req.session.team = null;
                  req.session.user = result[0];
                  return res.redirect('/profile/' + user.id);
              })
            }else{
              req.session.team = null;
              return res.redirect('/profile/' + user.id);
            }
          }
          else{
            console.log(info);
            console.log(err);
            res.serverError(info);
          }
        })(req, res, next);
  },

  // loginById: function (req, res, next) {
  //     User.findOne(req.param('id'))
  //     .exec(function(err, user){
  //     if(err || (!user)){
  //       return res.badRequest('User not found.');
  //     }
  //     req.session.user = user;
  //     return res.redirect('/');
  //   }); 
  // },

  loginByEmail: function(req, res){
      var email = req.body.email;
      var password = req.body.password;
      if(!email || !password){
        return res.send({
              success: false,
              message: 'Please, enter email and password.'
            });
      }
      User.findOne({email:email}).exec(
        function(err,user){
          if(err){
            console.log(err);
            return res.badRequest('User not found');
          }
          if(!user){
            return res.send({
              success: false,
              message: 'Given email or password is incorrect.'
            });
          }
          else if(user.fb_id && !user.password){
            return res.send({
              success: false,
              message: 'Account with the same email already exists and connected to Facebook account. Try log in using Facebook or register using the other email address.'
            });
          }else{
            //check password here.
            bcrypt.compare(password, user.password, function(err, result) {
              if (!result){ 
                return res.send({
                  success: false,
                  message: 'Given email or password is incorrect.'
                });
              }
              req.session.user = user;
              return res.send({success: true, userId: user.id});
            });
          }
        });

  },

  register: function(req, res){
      var captcha = req.body.captcha;
      var correctCaptcha = req.session.correctCaptcha;
      if(captcha != correctCaptcha){
        return res.send({
                  success: false,
                  badCaptcha: true
                });
      }
      var email = req.body.email;
      var password = req.body.password;
      if(password.length < 6){
        return res.send({
                  success: false,
                  message: 'Password should be at least 6 characters long.'
                });
      }
      User.findOne({email:email}).exec(
        function(err,user){
          if(err){
            console.log(err);
            return res.badRequest('Error.');
          }
          if(user && user.fb_id){
              return res.send({
                  success: false,
                  message: 'Account with the same email already exists and connected to Facebook account. Try log in using Facebook or register using the other email address.'
                });
          }
          if(user){
            return res.send({
                  success: false,
                  message: 'User with this email is already registered.'
                });
          }
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) {
                console.log(err);
                return res.badRequest('Error.');
              }else{
                var pic = gravatar.url(email, {
                  size:50, default:'retro'
                });
                var picLarge = gravatar.url(email, {
                  size:200, default:'retro'
                });
                var userData = {
                  email: email,
                  password: hash,
                  name: req.body.name,
                  team: req.body.team,
                  profilePicSmall:pic,
                  profilePicLarge:picLarge,
                };
                User.create(userData).exec(function (err, user) {
                  if (user) {            
                    req.session.user = user;
                    res.send({success:true, userId: user.id});
                  } else {
                    console.log(err);
                    return res.send({success:false,message:'Error occured.'});
                  }
                });
              }
            });
          });
        });
      },

  updateProfile: function(req, res){
    var saveUser = function(user){
      user.save(function (err, user) {
        if (user) {          
          req.session.user = user;  
          return res.send({success:true});
        } else {
          console.log(err);
          return res.send({success:false,message:'Error occured.'});
        }
      });
    }

    var model = req.body;
    if(!req.session.user){
      return res.send({success: false, message: 'You are not logged in.'});
    }
    if(req.session.user.id != model.id){
      return res.send({success: false, message: 'You can\'t edit given profile.'});
    }
    User.findOne({id:model.id}).exec(
      function(err,user){
         user.name = model.name;
         user.email = model.email;
         user.location = model.location;
         user.profilePicLarge = model.profilePicLarge;
         user.signature = model.signature;
         if(model.newPassword && (model.newPassword.length >= 6)){
           bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(model.newPassword, salt, function(err, hash) {
              user.password = hash;
              saveUser(user);
            })
          });
         }else{
          saveUser(user);
         }
      });
  },


  recoverPassword: function(req, res){
    var generatePass = function(length)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    var newPassword = generatePass(8);
    var sendMail = function(user){
      var mailer = require("nodemailer");

      // Use Smtp Protocol to send Email
      var smtpTransport = mailer.createTransport("SMTP",{
          service: "Mail.ru",
          auth: {
              user: "mjdpuzzle@list.ru",
              pass: "1qazxsw2"
          }
      });

      var mail = {
          from: "Balance of powers <mjdpuzzle@list.ru>",
          to: user.email,
          subject: "New password for Balance of Power",
          html: "Your new password is: <b>" + newPassword + "</b><br/>" +
          "Please, change the password as soon as possible.<br/><br/>" + 
          "Best regards,<br/>MJD.",
      }

      smtpTransport.sendMail(mail, function(error, response){
          smtpTransport.close();
          if(error){
              console.log(error);
              return res.send({success:false,message:'Error occured.'});
          }else{
              return res.send({success:true});
          }
      });   
    }

    var saveUser = function(user){
      user.save(function (err, user) {
        if (user) {          
          return sendMail(user);
        } else {
          console.log(err);
          return res.send({success:false,message:'Error occured.'});
        }
      });
    }

    var email = req.body.email;
    User.findOne({email: email}).exec(function(err, user){
      if(err){
        console.log(err);
        return res.send({message: 'Unable process request.'});
      }
      if(!user)
      {
        return res.send({message: 'User with given email not found.'});
      }
      if(user.fb_id){
        return res.send({message: 'User with given email was registered using facebok. Try to login with facebook.'}); 
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newPassword, salt, function(err, hash) {
          user.password = hash;
          saveUser(user);
        })
      });
    })
  },

  // resetPassword: function(req,res){
  //     var password = req.body.password;
  //     if(password.length < 6){
  //       return res.send({
  //                 success: false,
  //                 message: 'Password should be at least 6 characters long.'
  //               });
  //     }
  //     var key = req.session.key;

  //     User.findOne({recoveryKey:key}).exec(
  //       function(err,user){
  //         if(err){
  //           console.log(err);
  //           return res.send({
  //                 success: false,
  //                 message: 'Unable process request.'
  //               });
  //         }
  //         bcrypt.genSalt(10, function(err, salt) {
  //           bcrypt.hash(password, salt, function(err, hash) {
  //             if (err) {
  //               console.log(err);
  //               return res.badRequest('Error.');
  //             }else{
  //               user.password = hash;
  //               user.recoveryKey = null;
  //               req.session.key = null;
  //               user.save(function (err, user) {
  //                 if (user) {            
  //                   res.send({success:true, message: 'Password was changed successfuly.'});
  //                 } else {
  //                   console.log(err);
  //                   return res.send({success:false,message:'Error occured.'});
  //                 }
  //               });
  //             }
  //           });
  //         });
  //       });

  // }
};