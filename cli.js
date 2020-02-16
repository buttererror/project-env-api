#! /usr/bin/env node

const { exec } = require("child_process");
const fs = require("fs");
const yargs = require("yargs");
const lineReader = require('line-reader');
const readline = require('readline');


const argv = yargs
   .command("npm", "run npm install command")
   .help()
   .argv;

if(argv._[0] === "npm") {
   exec("npm install");
}
if(!fs.existsSync("./.env")) {
   fs.copyFile("./.env.example", "./.env", (err) => {
      if(err) throw err;
      console.log("file  copied");
   });
}
// fs.open('./.env',"r+", (err, fd) => {
//    console.log(fd);
//    //fd is our file descriptor
// });


const readInterface = readline.createInterface({
   input: fs.createReadStream('./.env'),
   output: process.stdout,
   console: false,
   terminal: false
});
let env = {};
readInterface.on('line', function(line) {
   if(line) {
      let envLine = line.split("=");
      env[envLine[0]] = envLine[1];
      console.log(env);
   }
});

