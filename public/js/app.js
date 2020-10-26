

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector ('form')
const search = document.querySelector ('input')
const messageOne = document.querySelector ('#message-1')
const messageTwo = document.querySelector ('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    messageOne.textContent='Loading'
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            messageTwo.textContent=data.error
            console.log(data.error)
        }
        else{
            messageOne.textContent=data.place_name
            messageTwo.textContent=data.forecast
            
            console.log(data.place_name)
            console.log(data.forecast)
        }
    })
})
    console.log(location)
    console.log('test')
})