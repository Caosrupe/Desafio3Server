const express = require('express')
const app = express()
const Contenedor = require('./contenedor')
const productos = new Contenedor('./productos.txt')


app.get('/', (req, res) => {
    console.log("etapa1")
    res.send('<h1 style="color:blue;">Desafio #3 Servidor con Express</h1>')

})


app.get('/productos', async (req, res) => {
    const response = await productos.getAll()
    res.json({ response })
})


app.get('/productosRandom', async (req, res) => {
    const arrayContenedor = await productos.getAll()
    const min = 1
    const max = arrayContenedor.length + 1
    const num = Math.floor(Math.random() * (max - min)) + min

    const response = await productos.getById(num)
    res.json({ response })
})


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))  

