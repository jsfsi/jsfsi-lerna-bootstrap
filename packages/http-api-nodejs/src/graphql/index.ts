import { ApolloServerExpressConfig, gql } from 'apollo-server-express'
import HealthSchema from './schemas/Health'
import HealthResolver from './resolvers/Health'

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

const graphqlConfig: ApolloServerExpressConfig = {
    typeDefs: [linkSchema, HealthSchema],
    resolvers: [HealthResolver],
    tracing: true,
}

export default graphqlConfig
