<h3 align="center">NEST</h3> 
  
<p align="center">Final Group Project of the Full Stack Developer bootcamp at Soy Henry.</p>
<hr/>

**<p align="center">Main technologies used</p>**

<p align="center">      
  <img src="https://img.shields.io/badge/ Overall :--black"> 
  <img src="https://img.shields.io/badge/-Linux-108A1A"> 
  <img src="https://img.shields.io/badge/-VSCode-1366A9"> 
  <img src="https://img.shields.io/badge/-Git-A40A0A">   
</p>
<p align="center">  
  <img src="https://img.shields.io/badge/ Backend :--black"> 
  <img src="https://img.shields.io/badge/-TypeScript-1366A9"> 
  <img src="https://img.shields.io/badge/-NestJS-A40A0A"> 
  <img src="https://img.shields.io/badge/-Sequelize-1366A9"> 
  <img src="https://img.shields.io/badge/-PostgreSQL-blue">   
</p>
</p> 
<p align="center">  
  <img src="https://img.shields.io/badge/ Frontend :--black"> 
  <img src="https://img.shields.io/badge/-TypeScript-1366A9">   
  <img src="https://img.shields.io/badge/-Redux Toolkit-7A1B6C"> 
  <img src="https://img.shields.io/badge/-Next.js-8C8C8C">
  <img src="https://img.shields.io/badge/-Tailwind-B52F63">
</p>     
	
**<p align="left">Deploy</p>**

*<p align="left">https://nest-fullstack-app-frontend.vercel.app<p>*
<hr/>

**<p align="left">Installation</p>**

*1. Clone the repository:*

   ```sh
   git clone https://github.com/leonardobaranelli/nest-fullstack-app.git
   ```
*2. Create a .env file on backend directory with the following variable names, and fill it with your credentials:*
   
```sh
DB_NAME = 
DB_USER = 
DB_PASS = 
DB_HOST =

CLOUDINARY_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 

STRIPE_API_SECRET =

COINBASE_API_KEY = 
COINBASE_API_SECRET = empty

GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET = 

FACEBOOK_CLIENT_ID = 
FACEBOOK_CLIENT_SECRET = 

# (And you can leave the next URLs as they are)
FRONTEND_URL = http://localhost:3000
BACKEND_URL = http://localhost:3001

DEPLOY_FRONTEND_URL = http://localhost:3000
DEPLOY_BACKEND_URL = http://localhost:3001
```

*3. Install dependencies on backend directory and start backend:*

```sh
npm install
npm start
```

*4. Create a .env file on frontend directory with the following variable names, and fill it with your credentials:*

```sh
NEXT_PUBLIC_STRIPE_API_KEY =
NEXT_PUBLIC_COINBASE_API_KEY =

# (And you can leave the next URLs as they are)
NEXT_PUBLIC_FRONTEND_URL = http://localhost:3000
NEXT_PUBLIC_BACKEND_URL = http://localhost:3001

NEXT_PUBLIC_DEPLOY_FRONTEND_URL = http://localhost:3000
NEXT_PUBLIC_DEPLOY_BACKEND_URL = http://localhost:3001
```

*5. Install dependencies on frontend directory and start the app*

```sh
npm install
npm run dev
```
