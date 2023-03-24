import { BookModel } from './model'

export async function saveBook(_, newBook) {
  return await BookModel.create(newBook)
}

export async function getBooks() {
  return await BookModel.find()
}

export async function editOneBook(_, { id, name, author }) {
  const data = await BookModel.findByIdAndUpdate(id, { name, author })
  return {
    id,
    name,
    author,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt
  }
}

export async function deleteOneBook(_, { id }) {
  return await BookModel.findOneAndRemove({ _id: id })
}
