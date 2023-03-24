import { ApolloQueryResult, OperationVariables, useMutation, useQuery } from '@apollo/client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import {
  CreateBookPayload,
  CREATE_BOOK,
  DeleteBookParams,
  DELETE_BOOK,
  EditBookParams,
  EDIT_BOOK,
  GET_BOOKS
} from '../queries'

export type Book = {
  id: string
  name: string
  author: string
  createdAt: string
  updatedAt: string
}

type BookContextProps = {
  books: Book[]
  loading: boolean
  createBook(currentBook: Partial<Book>): Promise<Book>
  saveBookEditted(payload: Partial<Book>): Promise<Book>
  deleteBook(bookId: string): Promise<Book>
}

const BookContext = createContext<BookContextProps>({} as BookContextProps)

function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const { loading, error, data, refetch } = useQuery<{ books: Book[] }>(GET_BOOKS)

  const [createNewBook, { error: errorCreateBook }] = useMutation<Book, CreateBookPayload>(
    CREATE_BOOK
  )
  const [editOneBook, { error: errorSaveEdittionBook }] = useMutation<Book, EditBookParams>(
    EDIT_BOOK
  )
  const [deleteOneBook, { error: errorDeleteBook }] = useMutation<Book, DeleteBookParams>(
    DELETE_BOOK
  )

  if (error) {
    console.error('Error to load books', error)
  }

  if (errorCreateBook) {
    console.error('Error to save book', errorCreateBook)
  }

  if (errorDeleteBook) {
    console.error('Error to delete book', errorDeleteBook)
  }

  if (errorSaveEdittionBook) {
    console.error('Error to save book edittion', errorSaveEdittionBook)
  }

  useEffect(() => {
    if (data) {
      setBooks(data.books as Book[])
    }
  }, [data, error])

  async function createBook(payload: Partial<Book>) {
    const { author, name } = payload
    const { data: bookCreated } = await createNewBook({
      variables: { author: author!, name: name! }
    })

    refetch()
    return bookCreated as Book
  }

  async function saveBookEditted(payload: Partial<Book>) {
    const { id, name, author } = payload
    const { data: bookEditted } = await editOneBook({
      variables: { id: id!, name: name!, author: author! }
    })

    refetch()
    return bookEditted as Book
  }

  async function deleteBook(bookId: string) {
    const { data: bookDeleted } = await deleteOneBook({ variables: { id: bookId } })
    refetch()
    return bookDeleted as Book
  }

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        createBook,
        saveBookEditted,
        deleteBook
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

function useBook() {
  const context = useContext(BookContext)

  if (!context) {
    throw new Error('useBook must be used with BookProvider')
  }

  return context
}

export { BookProvider, useBook }
