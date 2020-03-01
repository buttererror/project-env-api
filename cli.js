#! /usr/bin/env node

const {exec} = require("child_process");
const fs = require("fs");
const yargs = require("yargs");
const lineReader = require('line-reader');
const readline = require('readline');
let envObj = {};

async function readLineByLine() {
   const readInterface = readline.createInterface({
      input: fs.createReadStream('./.env'),
      output: process.stdout,
      console: false,
      terminal: false
   });
   for await (const line of readInterface) {
      // Each line in input.txt will be successively available here as `line`.
      if (line) {
         let envLine = line.split("=");
         envObj[envLine[0]] = envLine[1];
      }
      // console.log(`Line from file: ${line}`);
   }
   // await readInterface.on('line', function(line) {
   //    if(line) {
   //       let envLine = line.split("=");
   //       env[envLine[0]] = envLine[1];
   //    }
   // });
   // console.log(env);
}


const npm = yargs
   .command("npm", "run npm install command")
   .help()
   .argv;
const env = yargs
   .command("env", "modify .env")
   .help()
   .argv;
console.log(npm)
if (npm._[0] === "npm") {
   exec("npm install");
}
if (!fs.existsSync("./.env")) {
   fs.copyFile("./.env.example", "./.env", (err) => {
      if (err) throw err;
      console.log("file  copied");
   });
}
readLineByLine().then(() => {
   if (env._[0] === "env") {
      for (let prop in env) {
         if (envObj.hasOwnProperty(prop)) {
            envObj[prop] = env[prop];
         }
      }
      let file = '';
      for (let prop in envObj) {
         file += prop + "=" + envObj[prop] + "\n";
      }
      try {
         const data = fs.writeFileSync('./.env', file)
         //file written successfully
      } catch (err) {
         console.error(err)
      }
   }

});
// fs.open('./.env',"r+", (err, fd) => {
//    console.log(fd);
//    //fd is our file descriptor
// });


// var readStream = fs.createReadStream('./.env', 'utf8');
// var data = '';
//
// readStream.on('data', function(chunk) {
//    console.log("chunk____________chunk");
//    console.log(chunk);
//    console.log("chunk_______________chunk");
//    data += chunk;
// }).on('end', function() {
//    console.log(data);
// });
