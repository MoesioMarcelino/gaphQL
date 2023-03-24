import { GraphQLList, GraphQLString } from 'graphql'
import { getBooks, saveBook, deleteOneBook, editOneBook } from './loader'
import { BookType } from './type'

export const queries = {
  books: {
    type: new GraphQLList(BookType),
    resolve: getBooks
  }
}

export const mutations = {
  saveBook: {
    type: BookType,
    resolve: saveBook,
    args: {
      name: { type: GraphQLString },
      author: { type: GraphQLString }
    }
  },
  editBook: {
    type: BookType,
    resolve: editOneBook,
    args: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      author: { type: GraphQLString }
    }
  },
  deleteBook: {
    type: BookType,
    resolve: deleteOneBook,
    args: {
      id: { type: GraphQLString }
    }
  }
}
