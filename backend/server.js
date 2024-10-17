const express = require('express');
const app = express();
const port = 3000;

async function main() {
    app.listen(port, () => {
        console.log('Server listening on port ' + port);
    });
}

main();