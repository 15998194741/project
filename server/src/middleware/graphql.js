const graphqlHTTP = require('koa-graphql');
const {  buildSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList } =require('graphql');
const mount = require('koa-mount');
const koa = require('koa');
let schemaone = buildSchema(`
    type Query {
        hello:String,
        super:String
    }
    `);
class value{
	static hello(){
		return 'helloworld';
	}
	static super(){
		return 'ojbk';
	}
}

let app = new koa();
app.use(mount('/api', graphqlHTTP({
	schema: schemaone,
	rootValue: value,
	graphiql: true,
})));

let schematwo = buildSchema(`
    type Query {
        hello:String,
        super:String
    }
    `);
class valueteo{
	static hello(){
		return '2234';
	}
	static super(){
		return '342';
	}
}



app.use(mount('/apione', graphqlHTTP({
	schema: schematwo,
	rootValue: valueteo,
	graphiql: true,
})));


export default mount('/apipost', app);