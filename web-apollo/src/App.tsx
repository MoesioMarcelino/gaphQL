import { FormEvent, useState, ChangeEvent } from 'react'

import './App.scss'
import { useBook, Book } from './hooks/books'

type CurrentBook = Partial<Book>

export function App() {
  const { books, createBook, saveBookEditted, loading, deleteBook } = useBook()

  const [isEditting, setIsEditting] = useState(false)
  const [currentBook, setCurrentBook] = useState<CurrentBook>({
    name: '',
    author: ''
  } as CurrentBook)

  function resetInputs() {
    setCurrentBook({ name: '', author: '', id: undefined } as CurrentBook)
    setIsEditting(false)
  }

  async function handleSaveBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (currentBook.name && currentBook.author) {
      if (isEditting) {
        await saveBookEditted(currentBook)
      } else {
        await createBook(currentBook)
      }
      resetInputs()
    }
  }

  function handleInputChange(field: 'author' | 'name', event: ChangeEvent<HTMLInputElement>) {
    setCurrentBook(oldState => ({ ...oldState, [field]: event.target.value }))
  }

  async function handleDeleteOneBook(bookId: string) {
    await deleteBook(bookId)
    if (bookId === currentBook.id) {
      resetInputs()
    }
  }

  function handleEditOneBook({ name, author, id }: CurrentBook) {
    setIsEditting(true)
    setCurrentBook({ name, author, id })
  }

  return (
    <div className="app">
      <form
        onSubmit={handleSaveBook}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <h1>📚️ Book list</h1>
        <input
          type="text"
          name="name"
          value={currentBook.name}
          required
          onChange={e => handleInputChange('name', e)}
          placeholder="Book Name"
        />
        <input
          type="text"
          name="author"
          value={currentBook.author}
          required
          onChange={e => handleInputChange('author', e)}
          placeholder="Book Author"
        />

        <div className="buttonContainer">
          <button type="submit">{isEditting ? 'Concluir edição' : 'Criar livro'}</button>
          {isEditting && (
            <button type="button" onClick={resetInputs}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bookList">
        {loading
          ? 'Carregando...'
          : books.map(({ id, author, name }) => (
              <div key={id} className="bookItem">
                <span>
                  nome: {name} - autor: {author}
                </span>
                <div className="actions">
                  <div className="edit" onClick={() => handleEditOneBook({ id, name, author })}>
                    📝️
                  </div>
                  <div className="delete" onClick={() => handleDeleteOneBook(id)}>
                    ❌️
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
