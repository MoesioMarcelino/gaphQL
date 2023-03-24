import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

export const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime as any) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime as any) }
  }
})
