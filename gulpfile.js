const gulp = require('gulp');
const fs = require('fs'); // Example of using Node.js fs module

// Define a simple task named 'licenses'
gulp.task('licenses', function() {
  return new Promise((resolve, reject) => {
    console.log('Running licenses task...');

    // Example asynchronous operation: Reading a file
    fs.readFile("/Users/ASUS/Desktop/Coding bank/aqwa-cars-Rn/Admin-Web/LICENSE", 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(data); // Do something with the file content
        resolve(); // Signal successful completion
      }
    });
  });
});
