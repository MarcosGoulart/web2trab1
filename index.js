const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { inspect } = require('util')
const app = express()

let produtos = [
    {
      "id": uuidv4(),
      "nome": "Camiseta Básica",
      "categoria": "Roupas"
    },
    {
      "id": uuidv4(),
      "nome": "Tênis Esportivo",
      "categoria": "Calçados"
    },
    {
      "id": uuidv4(),
      "nome": "Notebook Dell",
      "categoria": "Eletrônicos"
    },
    {
      "id": uuidv4(),
      "nome": "Smartphone Samsung Galaxy",
      "categoria": "Eletrônicos"
    },
    {
      "id": uuidv4(),
      "nome": "Cadeira de Escritório",
      "categoria": "Móveis"
    },
    {
      "id": uuidv4(),
      "nome": "Cafeteira Elétrica",
      "categoria": "Eletrodomésticos"
    },
    {
      "id": uuidv4(),
      "nome": "Livro 'A Arte da Guerra'",
      "categoria": "Livros"
    },
    {
      "id": uuidv4(),
      "nome": "Fones de Ouvido Bluetooth",
      "categoria": "Eletrônicos"
    },
    {
      "id": uuidv4(),
      "nome": "Blender de Alta Potência",
      "categoria": "Eletrodomésticos"
    },
    {
      "id": uuidv4(),
      "nome": "Relógio de Pulso Masculino",
      "categoria": "Acessórios"
    }
  ]

const autenticacao = (req, res, next) => {
    if(req.query.token) { return next() }

    res.status(401).json({erro: "Acesso negado!"})

}

const validacao = (req, res, next) => {
    if(req.body?.nome?.length == 0) return res.status(400).json({ msg: "Precisa existir um nome"})
    if(req.body?.categoria?.length == 0) return res.status(400).json({ msg: "Precisa existir uma categoria"})
    next()
}

const erros = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(autenticacao)
app.use(erros)

app.get('/nome/:nome', (req, res) => {
    res.send("Olá, " + req.params.nome)
})

app.get('/buscaTodos', (req, res) => {
    res.status(200).json(produtos)
})

app.get('/secreta', (req, res) => {
    let novosProdutos = produtos.filter((produto) => produto.categoria == req.query.categoria)
    res.status(200).json(novosProdutos)
})

app.post('/cadastro', validacao, (req, res) => {
    let produto = {} 
    produto.nome = req.body.nome
    produto.categoria = req.body.categoria
    produto.id = uuidv4()
    produtos.push(produto)
    res.status(201).json(produtos)
})

app.listen(3000, () => {
    console.log('rodando')
})