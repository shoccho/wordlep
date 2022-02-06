chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "run" }, function (response) {
        if (response == undefined)document.getElementById("result").innerText = "This is not wordle!"
        else document.getElementById("result").innerText = response

    })
});
