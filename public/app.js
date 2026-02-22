console.log("Client...")


document.addEventListener("click", event => {
    if (event.target.dataset.type == "remove") {

        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest("li").remove()  
            window.location.href = "http://localhost:3000/";
        })
    } else if (event.target.dataset.type == "edit") {

        const id = event.target.dataset.id

        const title = prompt("New title")
        console.log("Client ", title)

        title && edit(id, title).then(() => window.location.href = "http://localhost:3000/")
    }


})


async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function edit(id, title) {
    console.log(id, title)
    await fetch(`http://localhost:3000/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id,
            title
        })
    })
}