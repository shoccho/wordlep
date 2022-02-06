browser.runtime.sendMessage(browser.runtime.id,{command: "pop"},()=>{});

browser.runtime.onMessage.addListener(function(message, messageSender, sendResponse) {
    console.log("listen in script")
    if (message.command === "message") {
        console.log(message.body)
        if(message.body==undefined) document.getElementById("result").innerText="are you dumb? does this page look like wordle?"
        else document.getElementById("result").innerText=message.body
    }
});