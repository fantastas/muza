// Script to generate filenames and url's of assets dir
// Usage: node generateFiles.js 
// Copy output in app.module.ts files array

const fs = require('fs');
fileArr = [];
fs.readdir('./assets', function (err, files) {
   files.forEach(function (file) {
       // ignore version control files
        if(!file.startsWith(".")){                              
            fileArr.push({url: './assets/' + file, name: file});
        }
    });
    console.log('files = ')
    console.log(fileArr);
});



