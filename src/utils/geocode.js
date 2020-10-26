const request=require('request');


const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGluZXNoc2luZ2hhYmhpIiwiYSI6ImNrZmFxYTdxOTBpczkyeG84N3FvbjRleDcifQ.DkKu2nCk1QuEoUF92Zk8zw&limit=1';

    request({url,json:true},(error,{body})=>{
        if(error){
            console.log('asda')
            callback('unable to connedct to location services!',undefined)
        }
        else if(body.features.length===0){
            callback('unable to find location,try another location',undefined)
        }
        else{
            const latitude=body.features[0].center[1]
            const longitude=body.features[0].center[0]
            const place_name=body.features[0].place_name
            callback(undefined,{latitude,longitude,place_name})
        }
      
    })
}

module.exports=geocode