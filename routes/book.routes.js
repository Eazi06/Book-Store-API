const express = require('express')

const router = express.Router()

router.get('/books', (req, res) => {
    return res.json(books)
})

router.get('/books/:id', (req, res) => {
     const id = parseInt(req.params.id)

     if (isNaN(id))
        return res.status(400).json({ error: `id must be of type number`})

     const book = books.find(book => book.id === id)

     if (!book)
        return res.status(404).json({ error: `Book with ${id} does not exist`})

     if(req.params.id > books.length){
        return res.status(404).json('Not found')
     }
    return res.json(book)
})

router.post('/books', (req, res) => {
    const {title, author} = req.body
    if (!title || title === '') 
        return res.status(400).json({ error: 'title is required'})
    
    if (!author || author === '')
        return res.status(400).json({ error:  'author is required'})

    const id = books.length + 1
    const book = { id, title, author}
    books.push(book)

    return res.status(201).json({ message: 'Book created successfully'})
})

router.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id))
    return res.status(400).json({ error: 'id must be of type number'})

  const indexToDelete = books.findIndex((e) => e.id === id)

  if (indexToDelete < 0)
    return res.status(404).json({error: `Book with ${id} does not exist`})

  books.splice(indexToDelete, 1)
  return res.status(200).json({ message: 'Bood deleted'})
})

module.exports = router;