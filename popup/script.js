chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "run" }, function (response) {
        if (response == undefined)document.getElementById("result").innerText = "are you dumb? does this page look like wordle?"
        else document.getElementById("result").innerText = response

    })
});
