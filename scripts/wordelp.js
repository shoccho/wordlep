chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === "run") {
        sendResponse(bery_optimized_function())
    }
});
let board = document.querySelector('game-app').shadowRoot.querySelector('#board')
let rows = board.childNodes
let alreadyFiltered = []
let leftChars = "[abcdefghijklmnopqrstuvwxyz]"
let positionsFound = Array(5).fill(leftChars)
function bery_optimized_function() {
    rows.forEach(element => {
        if (element.getAttribute("letters").length == 5) {
            let tiles = element.shadowRoot.querySelectorAll("game-tile")
            tiles.forEach((tile, idx) => {
                let char = tile.getAttribute("letter")
                let eval = tile.getAttribute("evaluation")
                let regex = null
                if (eval == "correct") {
                    regex = found(idx, char)

                } else if (eval == "present") {
                    regex = present(idx, char)
                    wordList = wordList.filter(word => word.includes(char))
                }
                else if (alreadyFiltered.includes(char)) return
                else if (eval == "absent") {
                    regex = absent(char)
                    wordList = wordList.filter(word => !word.includes(char))
                }
                alreadyFiltered.push(char)
                wordList = wordList.filter(word => word.match(regex))
            });
        }
    });
    let output = ""
    if (wordList.length < 20) {
        output = "Remaining words"
        wordList.forEach(el => {
            output += "\n" + el
        })
    } else {
        console.log("suggestion : ", wordList[0])
        output += "\nTry a couple more guesses!\n words left = " + wordList.length
        output += "\n\nRandom suggestions"

        let temp = wordList.sort(() => .5 - Math.random()).slice(0, 5)
        temp.forEach(el => {
            console.log(el)
            output += "\n" + el
        });
    }
    return output
}

function makeRegex() {
    let regexString = ""
    for (let i = 0; i < 5; i++) {
        regexString += positionsFound[i]
    }
    return new RegExp(regexString, 'g')
}
function found(pos, char) {
    positionsFound[pos] = char
    return makeRegex()
}
function present(pos, char) {
    positionsFound[pos] = positionsFound[pos].replace(char, '')
    return makeRegex()
}
function absent(char) {
    for (let i = 0; i < 5; i++) positionsFound[i] = positionsFound[i].replace(char, '')
    return makeRegex()
}
