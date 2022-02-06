function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { command: "run" },
            function (response) {
                console.log("Response: ", response);
                console.log(browser.runtime.id)
                browser.runtime.sendMessage({ command: "message", body: response })
            }
        )
    }
}
function onError(error) {
    console.log(`Error: ${error}`);
}

function clickHandler() {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
}
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === "pop") { clickHandler() }
});

