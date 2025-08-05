require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/db/db');

// Use an async IIFE (Immediately Invoked Function Expression) to ensure
// the database connects before the server starts listening for requests.

   connectToDB();
    // The success message is expected to be logged from within connectToDB()

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  