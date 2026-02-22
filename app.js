const chalk = require("chalk");
const { addNote, listNotes, removeNote, putNote} = require("./module.js");
const express = require("express")
const path = require("path")
const PORT = 3000;

// Инициализируем приложение на Express
const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")

// Кодировка
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


// Обработка GET запроса
app.get('/', async (req, res) => {

    // res.sendFile(path.join(basePath, "index.html"))
    res.render("index", {
        title: "Express App",
        notes: await listNotes(),
        created: false  
    })
})

// Обработка POST запроса
app.post("/", async (req, res) => {
    await addNote(req.body.title) 
    // res.sendFile(path.join(basePath, "index.html"))
    res.render("index", {
        title: "Express App",
        notes: await listNotes(),
        created: true
    })
})

app.put("/:id", async (req, res) => {
    console.log(chalk.bgBlue(req.body.title))
    putNote(req.body.id, req.body.title)

    res.render("index", {
        title: "Express App",
        notes: await listNotes(),
        created: false
    })
})

app.delete("/:id", async (req, res) => {

    removeNote(req.params.id)
    res.render("index", {
        title: "Express App",
        notes: await listNotes(),
        created: false
    })

})

// Слушаем сервер по порту
app.listen(PORT, () => {
    console.log(chalk.green(`HTTP server started on port ${PORT}`));
});
