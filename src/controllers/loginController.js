
import Login from "../models/LoginModel.js"

export function login (req,res){
  if(req.session.user) return res.render('login-logado')  
  return res.render('login')
}

export async function register(req, res){

    try{
        const login = new Login(req.body)
         await login.register()
   
         if(login.errors.length > 0) {
           req.flash('errors', login.errors);
           req.session.save(()=>{
            return res.redirect('/login/cadastro');
           });
           return;
         }

         req.flash('success','seu perfil foi criado com sucesso');
         req.session.save(()=>{
          return res.redirect('/login/cadastro');
         });
   
   }catch(e){
        console.log(e)
     return    res.render('404')
    }
}



export async function loginEnter(req, res){

 
  try{
        const login = new Login(req.body)
         await login.login()
   
         if(login.errors.length > 0) {
           
           req.flash('errors', login.errors);
           req.session.save(()=>{
            return res.redirect('/login/index');
           });
           return;
         }

     
         req.flash('success', 'Você entrou no sistema.');
         req.session.user = login.user;
         req.session.save(function() {
        return res.redirect('/login/index');
    });
   
   }catch(e){
        console.log(e)
     return    res.render('404')
    }
}

export const logout = (req, res)=>{
  req.session.destroy()
  res.redirect('/')
}