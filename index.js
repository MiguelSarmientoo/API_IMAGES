const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const upload = multer({ 
  dest: 'uploads/'  
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/images/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ninguna imagen.' });
  }
  
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

app.get('/api/images/logo', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'logo.jpg'));
});

app.get('/api/images/background', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'background.png'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
