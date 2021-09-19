const path = require('path');
const fs = require('fs');
fileArr = [];
fs.readdir('./assets', function (err, files) {
   files.forEach(function (file) {
        if(file.startsWith(".")){
            console.log('su tasku');
        }else{
        fileArr.push({url: './assets/' + file, name: file});
        }
    });
    console.log('files = ')
    console.log(fileArr);
    
});



