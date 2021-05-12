const express = require('express')
let config = require('config')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const PORT = config.get('port')

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    
            app.listen(PORT, () => console.log(`>>>>>>>>>>>>>Kpela ${PORT} portin`))    

    } catch (e) {
        console.log('Servere error ', e.message);
    }
}

start()






