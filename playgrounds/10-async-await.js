//Look like callback function
const doWork = async () => {
  throw new Error("Something went wrong")
  return 3
}

console.log(
  doWork()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
)

//Example 2
const add = (a, b) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (a < 0 || b < 0) reject("Numbers must be non-negative")
      resolve(a + b)
    }, 2000)
  )

const doWork2 = async () => {
  // add(1, 2)
  // .then((sum) => add(sum, 50)))
  // .then((sum2) => add(sum2, 100)
  // .then((sum3) => console.log(sum3))
  try {
    let sum = await add(1, 2)
    let sum2 = await add(sum, -50)
    let sum3 = await add(sum2, 100)
    return sum3
  } catch (error) {
    //Chỉ nên try/catch khi muốn điều chỉnh output cho error
    throw new Error(error)
  }
}

console.log(
  doWork2()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
)
