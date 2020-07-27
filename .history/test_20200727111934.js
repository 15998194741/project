const { listenerCount } = require("process")
const { Iteration } = require("Misc/_api")

var a =[
    {a:1,b:2},
    {a:2,b:1},
    {a:4,b:3},
    {a:3,b:4}
]
a.sort((a,b) => a)

console.log()

console.log(a)
a.map(item => {
    item.a.sort
})


a.map(item => {
    item.children.sort((a,b) => a.urlid-b.urlid)
    return {...item}
})
a.sort((a,b) => a.urlid-b.urlid)