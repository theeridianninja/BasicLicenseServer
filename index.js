const express = require("express");
const NoSQLClient = require('oracle-nosqldb').NoSQLClient;

let client = new NoSQLClient({
    region: require('oracle-nosqldb').Region.US_ASHBURN_1,
        auth: {
        iam: {
            tenantId: myTenancyOCID,
        userId: myUserOCID,
        fingerprint: myPublicKeyFingerprint,
        privateKeyFile: myPrivateKeyFile,
        passphrase: myPrivateKeyPassphrase
        }
    }
        });

const app = express();

app.get("/", async (request, response) => {
    if (!request.body.key || !request.body.pin) {
        response.send(404)
    } else {
        children = await client.get("children", { key: request.body.key, pin: request.body.pin});
        response.send(children)
    }
});

app.listen(3000, () => {
    console.log("Activation server online on port 3000");
});