# Explore Cache Project Assessment


## Technologies Used
- HTML
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express.js
- MongoDB/mongoose
- Passport.js (Authentication middleware for Node.js)
- Mapbox
- Cloudinary (for media image storage)

## Steps to Run the Project

1. Download the project and explore the cache folder, then open it in VS Code.
2. Open the terminal and use the command `npm install` to install all the necessary node modules.
3. Make sure MongoDB and the Mongo shell are installed on your machine for data initialization. Change the directory to the "init" folder using the command `cd ./init` and run `node index.js` in the terminal to initialize the database.
4. After initializing the database, change the directory back using `cd ..`.
5. To run the project, use `nodemon app.js` or `node app.js`.
6. Visit the site at [http://localhost:8080/listings](http://localhost:8080/listings).

**Note**: For admin initialization, sign up with your details and follow the instructions below:
- Open the command prompt and type `mongosh`.
- Use the command `use explorecache`.
- Execute `db.users.find()` to get the user ID. Copy the ID.
- Return to VS Code, go to the "init" folder, and open the `index.js` file.
- Locate the "//A-D-M-I-N" section and comment out the existing part, replacing it with your copied ID.
- Change the directory to "init" using `cd init` and run `node index.js`.
- After initialization, change the directory back to the main project folder using `cd ..` and run the project again using `nodemon app.js` or `node app.js`.

Now, you can log in with the same ID and password to access and modify any listing.

## Features

Developed "Explore Cache," a dynamic web application similar to Airbnb, using HTML, CSS, Bootstrap, and JavaScript for the frontend. The backend is powered by Node.js, Express.js, and MongoDB, following the MVC architecture. Key features include:

- User authentication and authorization using Passport framework with cookies and cache.
- Middleware for form validation and error handling.
- CRUD operations for listings.
- Signup and login functionality.
- Integration of Mapbox API for location services.
- Implementation of a review system.
- Media image storage using Cloudinary.


**The Project is also Deployed using MongoDB Atlas for database management, and deployed/hosted the
application on Render link https://explore-cache-lphd.onrender.com/.**
