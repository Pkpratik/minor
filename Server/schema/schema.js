const _ = require("lodash");
const graphql = require("graphql");
const Book = require("./models/book");
const Author = require("./models/Author");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    isbn: { type: GraphQLString },
    name: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    genre: { type: new GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //console.log(parent);
        //console.log(parent.author);
        //console.log(parent.author[0]);
        //console.log(Author.find({ name: "Harper Lee" }));
        //return _.find(authors, { id: parent.authorId });
        //authname = [];
        //authname.push(Author.findById("5f62761f6bdefe1788871a6d"));
        //console.log(authname);
        //for (i = 0; i < parent.author.length; i++) {
        //console.log(parent.author[i]);
        //authname.push(Author.find({ name: parent.author[i] }));
        //}
        //console.log(authname);
        //return Author.findById(parent.authorId);
        return Author.find({ name: parent.author });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //console.log(parent);
        //return _.filter(books, { authorId: parent.id });
        return Book.find({ author: parent.name });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      },
    },
    genre: {
      type: new GraphQLList(BookType),
      args: { genre: { type: GraphQLString } },
      resolve(parent, args) {
        return Book.find({ genre: args.genre });
      },
    },
    rating: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.aggregate([{ $sort: { rating: -1 } }]);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLNonNull(GraphQLFloat) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        author: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          image: args.image,
          genre: args.genre,
          rating: args.rating,
          author: args.author,
          description: args.description,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
