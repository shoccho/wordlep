browser.tabs.query({
    currentWindow: true,
    active: true
}).then(sendMessageToTabs)

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { command: "run" },
            function (response) {
                if (response == undefined) document.getElementById("result").innerText = "Not Wordle"
                else document.getElementById("result").innerText = response
            }
        )
    }
}