const router = require('express').Router()
const Todo = require('../../models/index').Todo

router.route('/new').get((req, res) => {
  res.render('new')
})

router.route('/:id').get((req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.route('/:id').put((req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo
    .findByPk(id)
    .then(todo => todo.update({ name, isDone }))
    .then(todo => todo.save())
    .then(todo => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.route('/:id').delete((req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo
    .findByPk(id)
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.route('/:id/edit').get((req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.route('/').post((req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  Todo
    .create({ name, UserId })
    .then(todo => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

module.exports = router
