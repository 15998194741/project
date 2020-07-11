const {  buildSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList } =require('graphql');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
let schemaone = buildSchema(`
type Query {
    hello(name : String, time : String):String,
    super:String
}
`);

const value = require('../servers/index');

module.exports =  mount('/api', graphqlHTTP({
	schema: schemaone,
	rootValue: value,
	graphiql: true,
}));