import mongoose from 'mongoose'
import {NODE_ENV,DB_URI} from '../config/env.js'

const connectToDb = async () => {
    if (!DB_URI) {
        console.log(`Please Enter check the db uri in the ${NODE_ENV} local`)
    } else {
        try {
            await console.log(`Connected to Database in ${NODE_ENV} environment`)
        }
    catch (error) {
            console.log(`error : ${error}`)
            process.exit(1)
        }
    }
}

export default connectToDb