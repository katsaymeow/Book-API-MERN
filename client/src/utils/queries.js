import { gql } from '@apollo/client';

// query GET_ME will execute the me query set up using Apollo Server
export const GET_ME = gql`
    get me {
        _id
        username
        savedBook{
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;