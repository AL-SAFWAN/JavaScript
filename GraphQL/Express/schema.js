const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

//hardcoded test data 

const customers = [
    { id: '1', name: 'Bob', email: 'Bob@gamil.com', age: 21 },
    { id: '2', name: 'Bob2', email: 'Bob2@gamil.com', age: 22 },
    { id: '3', name: 'Bob3', email: 'Bob3@gamil.com', age: 23 },
]

//Customer type 
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }

    })
})

//root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id == args.id) {
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers
            }
        }}
})



module.exports = new GraphQLSchema({
    query: RootQuery
})

