export default function handler(req,res) {

    let obj = req.body

    console.log(obj)
    console.log("fetchApi")

    fetch('http://localhost:8080/fetchMoore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
    res.status(200)
}