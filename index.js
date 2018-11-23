const { ApolloServer, gql } = require('apollo-server');
const { DeliveryClient } = require('kentico-cloud-delivery');


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  
  type SystemInfo {
    id: String!
    name: String!
    codename: String!
    language: String!
    type: String!
    lastModified: String!
  }
  
  type ContentItem {
    system: SystemInfo
  }

  type TextElement {
    type: String!
    name: String!
    value: String
  }

  type Article {
    system: SystemInfo
    title: TextElement
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    items: [ContentItem],
    itemsByType(type: String!): [Article]
  }
`;

const deliveryClient = new DeliveryClient({
  projectId: '975bf280-fd91-488c-994c-2f04416e5ee3',
  typeResolvers: []
});

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    items: async () => {
      const response = await deliveryClient.items()
        .getPromise();
      return response.items;
    },
    itemsByType: async (_, { type }) => {
      const response = await deliveryClient.items()
        .type(type)
        .getPromise();
      // console.log(response.debug.response.request)
      return response.items;
    }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});