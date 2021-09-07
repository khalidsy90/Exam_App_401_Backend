const express=require('express')
const cors=require('cors')
const axios=require('axios')
require('dotenv').config()
const ChocolateModel=require('./modules/mongo')
const server= express()

server.use(cors())
server.use(express.json())


async function updateOne(req, res){
console.log(req.body);
const {email,title,imageUrl,id} = req.body
await ChocolateModel.findByIdAndUpdate({_id:id},{title,imageUrl},(err,data)=>{
    if(err){
        res.send(err)
    }else{
        ChocolateModel.find({email:email},(error,data)=>{
            if(error){
                res.send(error)
            }else{
                console.log(data);
                res.send(data) 
            }
        })
    }
})
}

async function deleteOne(req,res){
    let {id,email}=req.params
    console.log({id});
    console.log({email});

   await ChocolateModel.deleteOne({_id:id},(error,data)=>{
        if(error){
            res.send(error)
        }else{
            ChocolateModel.find({email:email},(error,data)=>{
                if(error){
                    res.send(error)
                }else{
                    console.log(data);
                    res.send(data) 
                }
            })
        }
    })
}

async function getAllChocolate(req,res){
    let allChocolate = await axios.get('https://ltuc-asac-api.herokuapp.com/allChocolateData')
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
server.put('/Chocolate',updateOne)
server.delete('/Chocolate/:id/:email',deleteOne)
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
   