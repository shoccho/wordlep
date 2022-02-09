chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "run" }, function (response) {
        if (response == undefined) document.getElementById("header").innerText = "Either this is not wordle\n or\n Try please try reloading "
        else {
            document.getElementById("header").innerText = response.header
            let ulElem = document.getElementById("list")
            response.list.forEach(element => {
                let tempElem = document.createElement("p")
                tempElem.innerText = element
                ulElem.appendChild(tempElem)
            });
        }
    })
});
