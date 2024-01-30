// Import required modules
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Use Inquirer to prompt the user for input
inquirer
  .prompt([{ message: 'Type in your URL: ', name: 'url' }])
  .then((answers) => {
    // Extract the URL from the user's input
    const url = answers.url;

    // Generate a QR code image for the provided URL
    var qr_svg = qr.image(url);

    // Pipe the QR code image to a file named 'qr_image.png'
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Write the URL to a file named 'URL.txt'
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    // Handle errors during the inquirer prompt
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error('Something else went wrong');
    }
  });
