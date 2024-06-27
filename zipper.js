const fs = require('fs');
const path = require('path');
const process = require('node:process');
const cp = require('child_process');

const zipFileName = path.basename(process.cwd()) + '.zip';
let hasZip = false;
const files = fs.readdirSync('./').filter(e => {
    if(e == zipFileName) {
        hasZip = true;
        return false;
    } else {
        return e != 'images';
    }
    
}).map(e => `"` + e + `"`);



if(hasZip) {
    fs.rmSync(zipFileName);
    setTimeout(() => makeZip(), 100);
} else {
    makeZip()
}

function makeZip() {
    const command = `powershell -Command "Compress-Archive -Path ` + files.join(',') + ' -DestinationPath ' + zipFileName + `"`;
    console.log(command)

    cp.exec(command, (a, b, c) => {
        if(a) {
            console.log(a)
        }
        if(b) {
            console.log(b)
        }
        if(c) {
            console.log(c)
        }
    });
}


//npx pkg .\zipper.js -t node14-win-x64
// for mac or linux, use node shebang





