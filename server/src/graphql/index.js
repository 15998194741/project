// const graphqlHTTP = require('koa-graphql');
// const {  buildSchema,
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLInt,
// 	GraphQLSchema,
// 	GraphQLList } =require('graphql');
const mount = require('koa-mount');
const koa = require('koa');
const schemaone = require('./controllers/index');

// import { resolve } from 'path';
// const dir = path => resolve(__dirname, path);
// const apiPath = dir('./controllers');



let app = new koa();


// let schematwo = buildSchema(`
//     type Query {
//         hello:String,
//         super:String
//     }
//     `);
// class valueteo{
// 	static hello(){
// 		return '2234';
// 	}
// 	static super(){
// 		return '342';
// 	}
// }
// app.use(mount('/1111', graphqlHTTP({
// 	schema: schematwo,
// 	rootValue: valueteo,
// 	graphiql: true,
// })));

app.use(schemaone);



export default mount('/graphql', app);