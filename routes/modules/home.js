const router = require('express').Router()
const Todo = require('../../models/index').Todo

router.route('/').get((req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
