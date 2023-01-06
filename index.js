const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end
    }
})

app.get('/info', (request, response) => {
    const hora = Date()
    const cant = persons.length

    response.send(`
        <h2>Phonebook has info for ${cant} people</h2>
        <h2>${hora}</h2>
    `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'falta algun dato'
        })
    }

    if(persons.map(person => person.name).indexOf(body.name) !== -1){
        return response.status(400).json({
            error: 'El nombre ya existe'
        })
    }

    let maxId = 0
    persons.map(person => {if(person.id > maxId){maxId = person.id}})
    console.log(maxId)

    const person ={
        id: maxId + 1,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})