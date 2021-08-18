const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
       cb(null, 'C:/Nodejs/multer-test');  
     },
     filename(req, file, cb) {
       cb(null, `fileBook`);  
     }});
module.exports = multer({ storage });