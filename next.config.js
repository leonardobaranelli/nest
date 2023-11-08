require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DEPLOY_BACK_URL: process.env.DEPLOY_BACK_URL
    }
}

module.exports = nextConfig
