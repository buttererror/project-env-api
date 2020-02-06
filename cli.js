// const { exec } = require("child_process");
//
// exec("npm install", (error, stdout, stderr) => {
//    if (error) {
//       console.log(`error: ${error.message}`);
//       // return;
//    }
//    if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       // return;
//    }
//    console.log(`stdout: ${stdout}`);
// });
const npm = require('npm');
npm.load(function(err) {
   // handle errors

   // install module ffi
   npm.commands.install(['ffi'], function(er, data) {
      // log errors or data
   });

   npm.on('log', function(message) {
      // log installation progress
      console.log(message);
   });
});
