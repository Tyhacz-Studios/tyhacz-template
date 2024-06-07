import Express from 'express'
import * as path from 'path'
import apiRoutes from './routes'
import { connectToMongo } from './database/connect'
import config from './config'
import { startCronJobs } from './cronjobs'

const startServer = async () => {
    const app = Express()

    const { PORT } = config()

    await connectToMongo()

    app.use('/api', Express.json({ limit: '2mb' }))
    app.use('/api', apiRoutes)

    app.use('/assets', Express.static(path.join(__dirname, '../assets')))
    app.use('/logo', Express.static(path.join(__dirname, '../assets/logo.png')))

    // Serve the specific index.html for the root route
    app.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, '../landing-page/index.html'));
    });
    app.get('/styles.css', (_, res) => {
        res.sendFile(path.join(__dirname, '../landing-page/styles.css'));
    });

    // serve the client react app
    app.use('/', Express.static(path.join(__dirname, '../client-prod')))
    app.use('/*', Express.static(path.join(__dirname, '../client-prod/index.html')))

    app.listen(PORT, () => {
        console.log(`Application listening on http://localhost:${PORT}`)
        startCronJobs()
    })
}

startServer()
