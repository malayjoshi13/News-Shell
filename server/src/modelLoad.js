// const { exec } = require('child_process');
// const path = require("path")
// pathName=path.join(__dirname,"index.py")
// console.log("ghfhf");
// const executePy = (pathName) => {
//     console.log("vgfgf");
//         return new Promise((resolve, reject) => {
//         console.log("ghgh");
//         exec(`python ${pathName}`, 
//             (error, stdout, stderr) => {
//                 if(error){
//                     reject({error, stderr});
//                 }
//                 if(stderr){
//                     reject(stderr);
//                 }
//                 resolve(stdout);
//             });
//     });
// };

// module.exports = {
//     executePy,
// }