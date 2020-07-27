var a =[
    {a:1,b:2},
    {a:2,b:1},
    {a:4,b:3},
    {a:3,b:4}
]
a.sort((a,b) => a)

console.log(a.sort((a,b) => a.a-b.a))

console.log(a)