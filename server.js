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
// Håndter opplasting
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Filnavnet på det ferdige bildet
        const outputFilename = `fixed-${Date.now()}.jpg`;

        // Bruk Sharp til å endre størrelse
        await sharp(req.file.path)
            .resize(300) // Endre bredden til 300px
            .toFile(`processed/${outputFilename}`);

        // Send tilbake en lenke til bildet
        res.send(`
            <h2>Suksess!</h2>
            <p>Her er bildet ditt i 300px bredde:</p>
            <img src="/bilder/${outputFilename}" />
            <br>
            <a href="/">Prøv igjen</a>
        `);
    } catch (error) {
        console.error(error);
        res.send('Oisann, noe gikk galt med bildet!');
    }
});

app.listen(3000, () => {
    console.log('Server kjører på http://localhost:3000');
});
