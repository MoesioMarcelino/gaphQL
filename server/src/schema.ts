import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { queries, mutations } from './models'

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...mutations
    }
  })
})
