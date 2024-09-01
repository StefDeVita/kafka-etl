const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { writeUserDataToKafka, readMessages } = require('./alquiler.kafka')
const port = 3000
readMessages()
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
    console.log(req.body);
    await writeUserDataToKafka({ precioMensual: parseFloat(req.body.precioMensual), locatario: req.body.locatario, locador:req.body.locador })
    res.send('Hello World!')
  })


app.listen(port,()=>{
    console.log('Server running on port ' + port)
})