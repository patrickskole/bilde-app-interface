import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' }); // Her lagres bildene midlertidig

// Lagrer vi de ferdige bildene her? Sjekk om mappen finnes, hvis ikke lag den.
if (!fs.existsSync('processed')){
    fs.mkdirSync('processed');
}

// Server HTML-filen og ferdige bilder
app.use(express.static('public'));
app.use('/bilder', express.static('processed'));

app.listen(3000, () => {
    console.log('Server kjører på http://localhost:3000');
});
