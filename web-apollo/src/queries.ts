import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query {
    books {
      name
      id
      createdAt
      author
      updatedAt
    }
  }
`

export type CreateBookPayload = { name: string; author: string }
export const CREATE_BOOK = gql`
  mutation SaveBook($name: String, $author: String) {
    saveBook(name: $name, author: $author) {
      name
      id
      author
      createdAt
      updatedAt
    }
  }
`

export type EditBookParams = { id: string; name: string; author: string }
export const EDIT_BOOK = gql`
  mutation EditBook($id: String, $name: String, $author: String) {
    editBook(id: $id, name: $name, author: $author) {
      name
      id
      author
      createdAt
      updatedAt
    }
  }
`

export type DeleteBookParams = { id: string }
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String) {
    deleteBook(id: $id) {
      id
      name
      author
    }
  }
`
