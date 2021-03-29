let items = []

function addItem(itemName, itemValue, itemStatus) {
    items.sort()
    itemName = itemName || getItemName(items)
    itemValue = itemValue || ""
    itemStatus = itemStatus || "active"

    const checkBox = document.createElement("input")
    checkBox.classList.add(itemName)
    checkBox.classList.add(itemStatus)
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("onclick", "checkBoxClicked(this)")

    const textBox = document.createElement("input")
    textBox.classList.add(itemName)
    textBox.classList.add(itemStatus)
    textBox.classList.add("itemText")
    textBox.setAttribute("type", "text")
    textBox.setAttribute("value", itemValue)
    textBox.setAttribute("oninput", "setCookie(this.classList[0], this.value, 800)")

    const closeButton = document.createElement("button")
    closeButton.classList.add(itemName)
    closeButton.classList.add(itemStatus)
    closeButton.classList.add("closeButton")
    closeButton.innerText = "✖️"
    closeButton.setAttribute("onclick", "deleteItem(this)")

    const divItem = document.createElement("div")
    divItem.classList.add(itemName)
    divItem.classList.add("item")
    divItem.classList.add(itemStatus)
    divItem.appendChild(checkBox)
    divItem.appendChild(textBox)
    divItem.appendChild(closeButton)

    const divActiveItems = document.querySelector("#activeItems")
    divActiveItems.appendChild(divItem)

    items.push(itemName)
    items.sort()
}

function getItemName(items) {
    for (let i in items) {
        if (items[i] != "item" + i.toString()) return "item" + i.toString()
    }

    return "item" + items.length
}

function deleteItem(e) {
    e.parentNode.remove()
    items.splice(items.indexOf(e.classList[0]), 1)
    setCookie(e.classList[0], "", -1)
}

function checkBoxClicked(e) {
    const itemName = e.classList[0]
    const containerDiv = document.querySelector("div." + itemName)
    const textValue = containerDiv.querySelector("input.itemText").nodeValue
    const divActiveItems = document.querySelector("#activeItems")
    const divInactiveItems = document.querySelector("#inactiveItems")

    if (e.checked) {
        document.querySelectorAll("." + itemName).forEach(item => {
            item.classList.add("inactive")
            item.classList.remove("active")
        })
        divInactiveItems.appendChild(containerDiv)
        setCookie(itemName, textValue, "inactive", 800)
    } else {
        document.querySelectorAll("." + itemName).forEach(item => {
            item.classList.add("active")
            item.classList.remove("inactive")
        })
        divActiveItems.appendChild(containerDiv)
        setCookie(itemName, textValue, "active", 800)
    }
}

let cookieItem, cookieText, cookieStatus

function getSavedItems() {
    let cookie = document.cookie
    let cookiesList = cookie.split(";")

    cookiesList.map(item => {
        const cookieName = item.split("=")[0].trim()
        const cookieValue = item.split("=")[1].trim()

        let patternItem = new RegExp(/item\d+$/)
        let patternStatus = new RegExp(/item\d+Status$/)
        console.log(cookieName, cookieValue, patternItem.test(cookieName), patternStatus.test(cookieName))
        if (patternItem.test(cookieName)) {
            cookieItem = cookieName
            cookieText = cookieValue
        } else if (patternStatus.test(cookieName)) {
            cookieStatus = cookieValue

            addItem(cookieItem, cookieText, cookieStatus)
        }
    })
}

function setCookie(cname, cvalue, cstatus, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    let cookie = cname + "=" + cvalue + ";" + cname + "Status=" + cstatus + ";" + expires + ";path=/"
    document.cookie = cookie
    console.log(cookie, document.cookie)
}