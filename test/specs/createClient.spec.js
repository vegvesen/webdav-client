"use strict";

const path = require("path");
const fs = require("fs")

const TARGET_TXT = path.resolve(__dirname, "../testContents/newFile.txt");


describe("createClient", function() {
    beforeEach(function() {
        this.client = createWebDAVClient(
            "http://localhost:9988/webdav/server",
            null,
            null,
            {Authorization: "Basic " + Buffer.from(createWebDAVServer.test.username + ":" + createWebDAVServer.test.password).toString("base64")}
        );
        clean();
        this.server = createWebDAVServer();
        return this.server.start();
    });

    afterEach(function() {
        return this.server.stop();
    });


    it("writes text files", function() {
        const text = "this is\nsome text\ncontent\t...\n";
        return this.client
            .putFileContents("/newFile.txt", text)
            .then(function() {
                const written = fs.readFileSync(TARGET_TXT, "utf8");
                expect(written).to.equal(text);
            });
    });
});
