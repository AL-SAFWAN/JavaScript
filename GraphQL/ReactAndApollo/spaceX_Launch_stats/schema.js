  const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')
const axios = require('axios')


//Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RockerType}
        

    })
})
//rocker type
const RockerType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocker_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocker_type: { type: GraphQLString }
    })
})


//root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios
                  .get('https://api.spacexdata.com/v3/launches')
                  .then(res => res.data);
              }
        },
        launch: {
            type: LaunchType,
            args: {
              flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
              return axios
                .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data);
            }
          },
          rockets: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios
                  .get('https://api.spacexdata.com/v3/rockets')
                  .then(res => res.data);
              }
        },
        rocket: {
            type: LaunchType,
            args: {
              id: { type: GraphQLInt }
            },
            resolve(parent, args) {
              return axios
                .get(`https://api.spacexdata.com/v3/launches/${args.id}`)
                .then(res => res.data);
            }
          },
      
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
})