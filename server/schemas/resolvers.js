// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.

// Hint: Use the functionality in the user-controller.js as a guide.
const { User, Book } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id, username }) => {
            return User.findOne({ _id, username });
        },
        
    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ username, email });
            if(!user) {
                throw new AuthenticationError('Sorry, not a user');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Not that password');
            }
            const token = signToken(user);
            return { token, user };
        },

        // are these queries or mutations?
        saveBook: async ( parent, { username, body }, bookId)=>{

        },
        deleteBook: async ( parent, { user, params}, bookId)=>{

        },
    }
}