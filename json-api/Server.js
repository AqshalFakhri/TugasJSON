const express = require('express');
const bodyParser = require('body-parser');
const xmlbuilder = require('xmlbuilder');
const app = express();
const port = 3001;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Sample data buku
let books = [
    { id: 1, title: "Menguasai Flutter", author: "Budi Santoso" },
    { id: 2, title: "JavaScript Lanjutan", author: "Rina Wijaya" },
    { id: 3, title: "Python untuk Data Science", author: "Andi Prasetyo" },
    { id: 4, title: "React Native dalam Aksi", author: "Dewi Lestari" },
    { id: 5, title: "Memahami Algoritma", author: "Siti Nurhaliza" },
];

// Endpoint GET untuk mendapatkan daftar buku
app.get('/books', (req, res) => {
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('application/xml')) {
        // Mengubah data menjadi format XML
        const xml = xmlbuilder.create('books');
        books.forEach(book => {
            xml.ele('book', { id: book.id })
                .ele('title', book.title)
                .up()
                .ele('author', book.author)
                .up();
        });
        res.header('Content-Type', 'application/xml');
        res.send(xml.end({ pretty: true }));
    } else {
        // Mengembalikan data dalam format JSON
        res.json(books);
    }
});

// Endpoint POST untuk menambahkan buku baru
app.post('/books', (req, res) => {
    console.log(req.body); // Menampilkan isi permintaan
    const newBook = req.body;
    newBook.id = books.length + 1; // Menetapkan ID baru
    books.push(newBook);
    res.status(201).json(newBook);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});