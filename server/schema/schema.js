const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// dummy data
var books = [
  { name: 'The Ink Black Heart', genre: 'Crime Mystery', id: '1', authorId: '1'},
  { name: 'A Flicker in the Dark', genre: 'Crime Mystery', id: '2', authorId: '2'},
  { name: 'Where the Crawdads Sing', genre: 'Fantasy', id: '3', authorId: '3'},
  { name: 'The Paper Palace', genre: 'Romance', id: '4', authorId: '3'},
  { name: 'Carrie Soto Is Back', genre: 'Romance', id: '5', authorId: '1'},
  { name: 'The Rising Tide', genre: 'Crime Mystery', id: '6', authorId: '2'}
];

var authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1'},
  { name: 'Brandon Sanderson', age: 42, id: '2'},
  { name: 'Terry Pratchett', age: 66, id: '3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        // console.log('type =', typeof(args.id));

        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
