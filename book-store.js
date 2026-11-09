
const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8000

// function loggerMiddleware (req, res, next){
//     fs.appendFileSync('log.txt', log, 'utf-8')
//     next()
// }
app.use(express.json())
app.use(function (req, res, next) {
    const log = `[${Date.now()}, ${req.method}, ${req.path}]`
    fs.appendFileSync('log.txt', log, 'utf-8')
    next()
})

const books = [
    {id:'1', title: 'book 1 title', author:'author 1'},
    {id:'2', title: 'book 2 title', author:'author 2'}
]

app.get('/books', (req, res) => {
    return res.json(books)
})

app.get('/books/:id', (req, res) => {
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

app.post('/books', (req, res) => {
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

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id))
    return res.status(400).json({ error: 'id must be of type number'})

  const indexToDelete = books.findIndex((e) => e.id === id)

  if (indexToDelete < 0)
    return res.status(404).json({error: `Book with ${id} does not exist`})

  books.splice(indexToDelete, 1)
  return res.status(200).json({ message: 'Bood deleted'})
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
})