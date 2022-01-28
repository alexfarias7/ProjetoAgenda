export default function(req, res, next){
    res.locals.errors= req.flash('errors')
    res.locals.success= req.flash('success')
    res.locals.user = req.session.user
    next( )
}

  
export const outroMiddlaware=(req, res, next)=>{
next()
  }

export  const checaErro = (erro, req, res, next)=>{
    if (erro){
      return res.render('404')
    }
    next()
  }

  export const  csurfMiddlaware = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
  }

  export const loginRequired= (req,res, next)=>{
    if(!req.session.user){
      req.flash('errors', 'É necessário fazerr login')
      req.session.save(()=> res.redirect('/'))
      return
    }
    next()
  }
