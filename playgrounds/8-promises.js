const add = (a, b) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(a + b), 0))

console.log("start")
console.log(add(1, 2))

add(1, 2).then((data) => {
  add(data, 5).then((data) => {
    console.log(data)
  })
})

//Geocode:
add(1, 2)
  .then((data) => {
    //weather: Call another asynchronous function with data
    return add(data, 5)
  })
  .then((data) => console.log(data))
  .catch((error) => console.log(error))

//geocode((1)=>{
//  .....
//  weather(1,5=>{
//  ....
//      console.log(data)
//  })
//})

console.log("ending")
