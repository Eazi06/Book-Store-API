const { pgTable, uuid, varchar, text } = require('drizzle-orm/pg-core')
const authorsTable = require('./author_schema')

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    authorID: uuid().notNull().references(() => authorsTable.id)
    
})

module.exports = booksTable