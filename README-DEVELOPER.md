# Readme for Developer

## Introduction

This repository contains the source code and content for the next generation of Serlo's exam preparation. It is designed as a standalone app for practicing math. The app is implemented as a web application. The web framework used is [next.js 14](https://nextjs.org/), and for native wrappers, [ionic 8](https://ionicframework.com/) and [capacitor 7](https://capacitorjs.com/docs) are also integrated. The primary target is currently the web.

## Getting Started

[node.js v20](https://nodejs.org/en) or higher is required. After cloning the repository, run `npm start` in the main directory. This will install all dependencies and start the development server at [http://localhost:3000/](http://localhost:3000/). You can also run `npm install` and `npm run dev` separately.

Create a production build with `npm run build`. The repository is linked to the Serlo account on [vercel.com](https://vercel.com), and the prototype is hosted there at [https://testtiger-nine.vercel.app/](https://testtiger-nine.vercel.app/). Push to `main` for a new deployment.

The repository also includes a backend server component in the `/backend` directory. Run `npm install` separately in this directory and then `npm start`. The backend is currently hosted on the Asteroid `testtige` of the Serlo-Uberspace. A directory named `backend-testtiger` has been created there. A new version of the server can be deployed using the `./deploy.sh` script in the `backend-testtiger` directory. To access the Uberspace, [create a new ssh-key](https://manual.uberspace.de/basics-ssh/) via the Uberspace dashboard.

The backend is storing profiles in a database. Use https://mysql.uberspace.de/phpmyadmin/index.php?route=/sql&pos=0&db=testtige_backend&table=Profiles&server=117 to get access to the data, username is `testtige` and the mysql passwort can be found by typing `cat .my.cnf` in the root of the uberspace.
