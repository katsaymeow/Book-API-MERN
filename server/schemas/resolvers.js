// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.

// Hint: Use the functionality in the user-controller.js as a guide.
const { User, Book } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { _id, username }) => {
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

        // are these mutations?
        saveBook: async ( parent, {bookData}, context)=>{
            if(context.user) {
               const updateBook = await User.findOneAndUpdate(
                { _id: context.user_id },
                { $addToSet: { savedBooks: input } },
                { new: true }
               ).populate('savedBooks');
               return updateBook;
            } else {
                throw new AuthenticationError('You must be logged in to save your favorite books')
            }
        },
        deleteBook: async ( parent, { bookId }, context)=>{
            if (context.user) {
                const deleteBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                ).populate('savedBooks');
                return deleteBook;
            }
            throw new AuthenticationError('You must be logged in to delete this book')
        },
    }
}

module.exports = resolvers;