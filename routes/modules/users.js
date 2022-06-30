const router = require('express').Router()
const passport = require('passport')
const User = require('../../models/index').User

router.route('/login').get((req, res) => {
  res.render('login')
})

router.route('/login').post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/register').post((req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User
    .findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.route('/logout').get((req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/users/login')
  })
})

module.exports = router
