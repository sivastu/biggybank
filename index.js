const express = require('express')
const app = express()
const cors = require('cors');
const mongoose  = require('mongoose')

//register view engine
app.set('view engine','ejs')

//cross orgin
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

//middleware
app.use(cors(corsOptions))
mongoose.connect("mongodb+srv://siva:siva@cluster0.8mvie.mongodb.net/buggy?retryWrites=true&w=majority"
  ,{ useNewUrlParser: true,useUnifiedTopology: true},() => {
    console.log('conected to dp')
});   
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongoo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use(express.json())

app.get('/', (req, res) => {
     res.json({
            "status" : false
        })
})

//user
app.use(require('./src/user/user'))
//app.use(require('./src/routes/admin_api'))

//web

//app.use(require('./src/routes/home_api'))

app.listen(5000,()=>console.log('Server up and running',5000));

