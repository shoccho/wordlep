let board = document.querySelector('game-app').shadowRoot.querySelector('#board')
let rows = board.childNodes
let alreadyFiltered = []
let leftChars = "[abcdefghijklmnopqrstuvwxyz]"
let positionsFound = Array(5).fill(leftChars)
let regex = null
function bery_optimized_function() {
    rows.forEach(element => {
        if (element.getAttribute("letters").length == 5) {

            let tiles = element.shadowRoot.querySelectorAll("game-tile")
            tiles.forEach((tile, idx) => {
                let char = tile.getAttribute("letter")
                let eval = tile.getAttribute("evaluation")
                
                if (eval == "correct") {
                    regex = found(idx, char)
                    wordList = wordList.filter(word => word.match(regex))
                    alreadyFiltered.push(char)

                } else if (eval == "present") {
                    regex = present(idx, char)
                    alreadyFiltered.push(char)
                    wordList = wordList.filter(word => word.includes(char))
                }

            });
            tiles.forEach((tile, idx) => {
                let char = tile.getAttribute("letter")
                let eval = tile.getAttribute("evaluation")
                if (alreadyFiltered.includes(char)) return
                else if (eval == "absent") {
                    regex = absent(char)
                }
                alreadyFiltered.push(char)
                wordList = wordList.filter(word => word.match(regex))
            });
        }
    });
    let header = ""
    let list =[]
    if (wordList.length < 50) {
        header = "Remaining words:"
        list  = wordList
    } else {
        header += "Words left = " + wordList.length
        header += "\nSuggestions"
        list = wordList.sort(() => .5 - Math.random()).slice(0, 30)
    
    }
    return {header,list}
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
function listener(message, sender, sendResponse) {
    if (message.command === "run") {

        sendResponse(bery_optimized_function())
    }


}
browser.runtime.onMessage.addListener(listener);