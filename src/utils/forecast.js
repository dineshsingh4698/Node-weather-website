const request=require('request');

const forecast = (lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=edd6c135aa9d5c631b5e55091d35fb15&query='+lat+','+long+'&units=';

    request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to weather service',undefined)
    }
    else if(body.error){
        callback('unable to find location',undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions[0]+". The temperature is "+ body.current.temperature+".There is "+body.current.precip+"% of rain. And the Humidity is "+body.current.humidity)
    }
    
    })
}
module.exports=forecast