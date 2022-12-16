// typeDefs.js: Define the necessary Query and Mutation types:
const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Number
        savedBooks: [bookSchema]!
    }
    
    type Book {
        bookId: ID!
        authors: [String]!
        description: String!
        title: String
        image: String
        link: String
    }

    input BookInput {
        authors: [String]!
        description: String!
        title: String!
        bookId: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutations {
        login(email: String!, password: String!): Auth

        addUser(username: String!, email: String!, password: String!): Auth

        savedBook(input: BookInput): User

        removeBook(bookId: ID!): User
    }
    `;

module.exports = typeDefs;



