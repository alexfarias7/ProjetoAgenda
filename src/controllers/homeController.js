import Contato from "../models/contatoModel.js"

  export async function index(req, res, ){
    const contatos= await Contato.buscaContatos()
    res.render('index', {contatos})
}

