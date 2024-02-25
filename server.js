const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Configure CORS
app.use(cors()); 

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).send('Please upload an image.');
  } else {
    res.send({ filename: req.file.filename });
  }
});

// Serve the uploads directory
app.use('/uploads', express.static('uploads')); 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
