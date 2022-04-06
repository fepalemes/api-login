const express = require('express');
const cors = require('cors');
const conn = require('./src/database/conn')
const app = express();

const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const apiRoutes = require('./src/routes/api.routes');
const userRoutes = require('./src/routes/user.routes');

// ============ SWAGGER ============
const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title:"api-login",
            description: "API login",
            contact:{
                email:"joaopaulotsukimoto@gmail.com"
            },
            version:"1.0.0"
        },
        servers: [
                {
                    url: `http://localhost:3500/api`,
                    description:"API - Local"
                },
                // {
                //     url: `http://localhost:3500/api`,
                //     description:"API - Homologação"
                // }
        ],
        externalDoc: {
            description: 'Leia mais sobre a api-login',
            url: 'https://github.com/'
        },
    },
    apis:  ['./routes/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerConfig)

// config json response
app.use(express.json());

// solve cors
app.use(cors({ credentials: true }));

// public folder for images
app.use(express.static('public'))

// routes
app.use('/api', apiRoutes)
app.use('/users', userRoutes)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/api-doc-json', (req, res) => {
    res.json(swaggerDocs).status(200)
    
})

conn.sync().then(() =>{
    app.listen(3500)
}).catch((err) => {
    console.log('Error sequelize: ')
    console.log(err)
})
