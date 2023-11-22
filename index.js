const express = require('express');
const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const port = 3000;

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
});

app.get('/', async (req, res) => {
    res.send('Welcome to the File Manager!');
});

app.get('/upload', async (req, res) => {
    try {
        const filename = 'dog.jpeg'; // Replace with the actual filename
        const contentType = 'image/jpeg'; // Replace with the actual content type

        const command = {
            Bucket: "propacityfilemanager",
            Key: `uploads/${filename}`,
            ContentType: contentType,
        };

        const url = await getSignedUrl(s3Client, command);
        res.send(`URL for uploading: ${url}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/list', async (req, res) => {
    try {
        const command = {
            Bucket: "propacityfilemanager",
            Prefix: "uploads/",
        };

        const data = await s3Client.send({ ...command });
        const files = data.Contents.map((object) => object.Key);

        res.send('Files in the "uploads" folder: ' + files.join(', '));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/delete', async (req, res) => {
    try {
        const filename = 'image.jpeg'; // Replace with the actual filename
        const key = `uploads/${filename}`;

        const deleteCommand = {
            Bucket: "propacityfilemanager",
            Key: key,
        };

        await s3Client.send({ ...deleteCommand });

        res.send(`File ${key} deleted successfully`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




