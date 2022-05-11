const express = require('express')
const { send } = require('express/lib/response')
const app = express()
const { userList }= require('./userList')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
//3-get
app.get('/users',(req,res)=>{
    res.json(userList)
})
app.post('/users',(req,res)=>{
    const newuser =  req.body
    const newuserList =[...userList,newuser] 
    res.json(newuserList)
})
//5-delete
app.delete('/user/:id',(req,res)=>{
    const newuserlist = userList.filter(user=>user.id!==req.params.id)
    res.json(newuserlist)
})
//6-put
app.put('/user/:id',(req,res)=>{
    const newupdateduserlist=userList.map(user=>user.id==req.params.id?{...user,...req.body}:user)
    res.json(newupdateduserlist)
})
//4-post
// app.post('users',(req,res)=>{
    
//  const newuser =  req.body

//  const newuserList =[...userList,newuser] 
//  res.json(newuserList)
// })
//2-middleware
// const authMiddleware = (req,res,next)=>{
//     const auth=true
//     if(auth){
//         console.log('user authorized')
//         next();
//     }else{
//         res.send('user is not authorized')
//     }
// }

//1-routes
// app.get('/',authMiddleware,(req,res)=>{
//     res.sendFile(__dirname+'/public/home.html')
// })
// app.get('/contact',(req,res)=>{
//     res.sendFile(__dirname+'/public/contact.html')
// })
app.use('/views',require('./routes/view'))
app.listen(5000,(err)=>{
    if(err) throw err
    else console.log('server is running on port 5000')
})
