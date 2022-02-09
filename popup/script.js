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
                if (response == undefined) document.getElementById("result").innerText = "Either this is not a wordle site\n or\n Try please try reloading "
                else document.getElementById("result").innerText = response
            }
        )
    }
}