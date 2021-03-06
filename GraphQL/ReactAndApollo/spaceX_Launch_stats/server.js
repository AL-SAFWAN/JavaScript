const express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');
const cors = require('cors');

const app = express();
// Allow cross-origin
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000..');
});
