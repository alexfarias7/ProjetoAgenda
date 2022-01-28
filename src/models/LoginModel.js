import bcryptjs from "bcryptjs";
import Mongoose  from "mongoose";
import validator from "validator";

const LoginSchema= new Mongoose.Schema({
    email:{type:String, required:true},
    password: {type:String, required:true}
})

const LoginModel = Mongoose.model( 'Login', LoginSchema)

class Login {
    constructor(body){
        this.body=body;
        this.errors= [];
        this.user=null
    }

    cleanUp(){
  
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
              this.body[key] = '';
            }
        }

        this.body={
            email:this.body.email,
            password:this.body.password,
            passwordRepeat: this.body.passwordRepeat
        }

    }

    valida(){
        this.cleanUp()
        //*validação
        //*email inválido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //* senha com conteúdo
        if (!this.body.password){
            this.errors.push('senha inválida')
        } 
        
        //* senha minima 8 digitos
         if (this.body.password<6){
            this.errors.push('a senha precisa ter do minimo 8 caracteres')

        }

        //* precisa ter a mesma senha
        if (this.body.passwordRepeat && this.body.password !== this.body.passwordRepeat){
            this.errors.push(' as senhas precisam ser identicas')
        }   
    }

 async register(){
    this.valida()
    if(this.errors.length>0) return
    await this.userExist()
    
    if(this.errors.length>0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)
    this.user = await LoginModel.create(this.body)
    }

   async userExist(){
        this.user= await LoginModel.findOne({ email:this.body.email})
        if(this.user) this.errors.push('usuario já cadastrado')
    }

    async login(){
        this.valida()
        if(this.errors.length>0) return
        this.user= await LoginModel.findOne({ email:this.body.email})

        if (!this.user){
            this.errors.push('usuário  não existe')
            return
        }
        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('senha inválida')
            this.user= null
            return
        }
    }
}

export default Login