const server = http.createServer(async (req, res) => {
    if (req.method == "GET") {
        const content = await fs.readFile(path.join(basePath, "index.html"));
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.end(content);
    } else if (req.method == "POST") {
        const body = [];
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
        });
        res.on("data", (data) => {
            body.push(Buffer.from(data));
            console.log(body)
        });
        req.on("end", () => {
            console.log("qwe")
            const title = body.toString().split("=")[1].replaceAll("+", " ");
            console.log(title)
            addNote(title);
            res.end(`Title - ${title}`);
        });
    }
});