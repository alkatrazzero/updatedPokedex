const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const config=require('config')
const app =express()
const cors=require('cors')
const bodyParser = require('body-parser')

//Без лимита слишком болшой payload при добавление покемона в любимых
app.use(bodyParser({limit: '50mb'}))
app.use(express.json({ extended: true }))
app.use(cors({credentials: true, origin: 'http://localhost:5000/'}));
app.use('/api/pokemons',require("./routes/favoritePokemons.routes"))
app.use('/api/auth',require("./routes/auth.routes"))
app.use('/api/profile',require("./routes/profileInfo.routes"))
 if(process.env.NODE_ENV==='production'){
app.use("/",express.static(path.join(__dirname, 'server','client','build')))
   app.get('*', (req,res)=>{
res.sendFile(path.resolve(__dirname,'server','client','build','index.html'))
   })
 }

const PORT=config.get('port')||5000

async function start(){
  try{
    await mongoose.connect(config.get('mongoUri'),{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
    })
    app.listen(PORT,()=> console.log(`app has been started on port ${PORT}...`))
  }catch (e){
    console.log('Server error', e.message)
    process.exit(1)
  }
}
start()

