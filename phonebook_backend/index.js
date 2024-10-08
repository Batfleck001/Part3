const express= require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body',(req) => JSON.stringify(req.body))

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

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
    },
    { 
        id: "5",
        name: "hugh", 
        number: "7361891732"
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

app.get('/api/persons/:id',(req,res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if(person){
        res.send(person)
    }
    else{
        res.status(400).end(JSON.stringify({
            error : "No such ID"
        }))
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})




// const Idgenerator = () =>{
//     const maxId = persons.length> 0 ? Math.max(...persons.map(p => p.id)) : 0
//     return String(maxId + 1)
// }

app.post('/api/persons',(req,res)=>{
    const body = req.body   
    if(!body.name || !body.number){
        return res.status(400).end(JSON.stringify({
            error : " Name or Number is missing"
        }))
    }
    const found = persons.find(p => p.name.toLowerCase() === body.name)
    if(found){
        return res.status(400).end(JSON.stringify({
            error : "Name must be unique"
        }))
    }
    const person  = {
        name : body.name,
        number: body.number,
        id : String(Math.floor(Math.random() * 10000000))
    }
    persons = persons.concat(person)
    console.log(person)
    res.json(person)
})



app.listen(3001)