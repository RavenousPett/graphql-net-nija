const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to mongodb database
mongoose.connect('mongodb+srv://ninja:yY400gHja@cluster0.dfvk4lh.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
})
