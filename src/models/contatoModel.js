import  Mongoose  from "mongoose";
import validator from "validator";

const ContatoSchema = new Mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
  });
  
  const ContatoModel = Mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body= body
    this.errors=[]
    this.contato=null
}


Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  };

Contato.prototype.valida= function(){
    this.cleanUp()
    //*validação
    //*email inválido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.nome) this.errors.push(' nome é um campo obrigatório')
    if(!this.body.email && !this.body.telefone){ 
        this.errors.push(' adicione pelo menos um telefone ou email do contato')
}
    
}


Contato.prototype.register = async function(){
    this.valida()
    if (this.errors.length>0) return
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.edit= async function(id){

    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

//* método estático
Contato.buscaId= async function(id){
    if(typeof id !== 'string') return;
  const contatos = await ContatoModel.findById(id);
  return contatos;
}
Contato.buscaContatos= async function(id){
    ;
  const contatos = await ContatoModel.find()
  .sort({criadoEM:-1})
  return contatos;
}
Contato.delete= async function(id){
    if(typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({_id:id})
  
  return contato;
}
export default Contato