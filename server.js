const express=require('express')
const cors=require('cors')
const axios=require('axios')
require('dotenv').config()
const ChocolateModel=require('./modules/mongo')
const server= express()

server.use(cors())
server.use(express.json())


async function deleteOne(req,res){
    let id=req.params.id
    let email=req.body

   await ChocolateModel.deleteOne({_id:id},(error,data)=>{
        if(error){
            res.send(error)
        }else{
            ChocolateModel.find({email:email},(error,data)=>{
                if(error){
                    res.send(error)
                }else{
                    res.send(data) 
                }
            })
        }
    })
}

async function getAllChocolate(req,res){
    let allChocolate = await axios.get('https://ltuc-asac-api.herokuapp.com/allChocolateData')
    // let data=[]
    // for (let i = 0; i < allChocolate.data.length; i++) {
    //     data.push(new Chocolate(allChocolate.data.title,allChocolate.data.imageUrl))
    // }   
    res.send(allChocolate.data)
}

async function addToCollection(req,res){

const {email,title,imageUrl} = req.body

new ChocolateModel({
    email:email,
    title:title,
    imageUrl:imageUrl
}).save()
ChocolateModel.find({email:email},(error,data)=>{
    if(error){
        res.send(error)
    }else{
        res.send(data) 
    }
})

}

server.delete('/Chocolate/:id',deleteOne)
server.post('/Chocolate',addToCollection)
server.get('/Chocolate',getAllChocolate)

server.get('/',(req,res)=>{
    res.send('Its ok')
})

server.listen(process.env.PORT,()=>{
    console.log('server is lestining');
})

class Chocolate{
    constructor(title,imageUrl){
        this.title=title
        this.imageUrl=imageUrl
    }
}
   