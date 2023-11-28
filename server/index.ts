import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import data from './data.json'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const jsonParser = bodyParser.json()

const getUsersBySearchTerm = (searchTerm: string) => {
  return data.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
}

app.get('/user/:searchTerm', (req, res) => {
  const { searchTerm } = req.params || {}

  res.json(getUsersBySearchTerm(searchTerm))
})

app.post('/user', jsonParser, (req, res) => {
  const { id, ...fieldsToUpdate } = req.body

  const users = getUsersBySearchTerm(id)

  if (users.length === 1) {
    const [user] = users
    res.json(Object.assign(user, fieldsToUpdate))

    return
  }

  if(users.length > 1) {
    res.status(300).json({ message: 'Be more specific' })
  }


  res.status(404).json({ message: 'User not found' })
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})