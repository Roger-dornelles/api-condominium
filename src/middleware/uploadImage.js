const multer = require('multer');

module.exports = (multer({
  storage:multer.diskStorage({
    destination:(eq,file,cb)=>{
      cb(null,'./public/images');
    },
    filename:(req,file,cb)=>{
      let newName = Math.floor(Math.floor(100) * 999999);
      cb(null,`${newName+Date.now()}.jpg`);
    }
  }),
  fileFilter:(req,file,cb)=>{
    const allowed = ['image/jpg','image/png','image/jpeg'];
    cb(null,allowed.includes(file.mimetype));
  }
}))