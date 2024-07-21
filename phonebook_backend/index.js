const express= require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]
app.get('/',(req,res) => {
    res.send("Hello World")
})

app.get('/api/persons',(req,res) =>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    res.send(`<p>Phone Book has info for ${persons.length} people <br/> ${Date()}</p>`)
})


// const Idgenerator = () =>{
//     const maxId = persons.length> 0 ? Math.max(...persons.map(p => p.id)) : 0
//     return String(maxId + 1)
// }

// app.post('/api/persons',(req,res)=>{
//     const body = req.body   
//     if(!body.name){
//         return res.status(400).end(JSON.stringify({
//             error : " Name is missing"
//         }))
//     }
//     const person  = {
//         name : body.name,
//         number: body.number,
//         id : Idgenerator()
//     }
//     persons = persons.concat(person)
//     console.log(person)
//     res.json(person)
// })



app.listen(3001)