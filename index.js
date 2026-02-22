const yargs = require("yargs");
const {
    prontListNotes,
    addNote,
    removeNote,
    listNotes,
    putNote,
} = require("./module");

yargs.command({
    command: "get",
    describe: "describe",
    handler() {
        prontListNotes()
    },
});

yargs.command({
    command: "add",
    describe: "describe",
    bulder: {
        title: {
            type: "string",
            describe: "describe",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "put",
    describe: "describe",
    bulder: {
        id: {
            type: "string",
            describe: "describe",
            demandOption: true,
        },
        title: {
            type: "string",
            describe: "describe",
            demandOption: true,
        },
    },
    handler({ id, title }) {
        putNote(id, title);
    },
});

yargs.command({
    command: "remove",
    describe: "describe",
    bulder: {
        id: {
            type: "string",
            describe: "describe",
            demandOption: true,
        },
    },
    handler({ id }) {
        removeNote(id);
    },
});

yargs.parse();
