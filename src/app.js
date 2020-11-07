const express = require('express')
const path=require('path')
const hbs = require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000  //to process enivronment variables

//Define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates1/views')
const partialsPath=path.join(__dirname,'../templates1/partials')
//setup handlebar engine and views location 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'dinesh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'dinesh',
        name:'dinesh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP ME',
        name:'dinesh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide an address'
        })
    }
    const address=req.query.address
    geocode(address,(error,{latitude , longitude , place_name}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            console.log(place_name)
            console.log(forecastdata)
            res.send({
                forecast:forecastdata,
                place_name,
                address:req.query.address        
        })
    })
    
       // address:req.query.address
    })
})
app.get('/help/*',(req,res)=>{
   // res.send('Help article not found')
   res.render('Error404',{errormessage:'Help article not found',name:'dinesh'})
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
           error:"Error"
        })
    }
    res.send({
        products:[]
    })
    console.log(req.query.search)
})

app.get('*',(req,res)=>{
   // res.send('404 page')
   res.render('Error404',{errormessage:'Page not found',name:'dinesh'})
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})

