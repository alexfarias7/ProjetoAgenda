import  Mongoose  from "mongoose";

const homeSchema = new Mongoose.Schema({
    titulo:{ type:String, required:true },
    descricao: String
})

const HomeModel = Mongoose.model('Home', homeSchema)

class Home{

}
export default Home