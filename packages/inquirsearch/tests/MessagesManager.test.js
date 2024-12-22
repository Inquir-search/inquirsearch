import MessagesManager from "../src/MessagesManager";

describe("MessagesManager", () => {

    it("should initialize with default state", async () => {
        const messagesManager = new MessagesManager({ apiKey: "test" });
        await messagesManager.sendMessage({
            "indexName": "inquir-docs-1734799169495",
            "query": "what is the weather in california?"
        })
    })
});