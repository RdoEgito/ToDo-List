let items = []

function addItem(itemName, itemValue) {
    items.sort()
    itemName = itemName || getItemName(items)
    itemValue = itemValue || ""

    const checkBox = document.createElement("input")
    checkBox.classList.add(itemName)
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("onclick", "checkBoxClicked(this)")

    const textBox = document.createElement("input")
    textBox.classList.add(itemName)
    textBox.setAttribute("type", "text")
    textBox.setAttribute("value", itemValue)
    textBox.setAttribute("oninput", "setCookie(this.classList[0], this.value, 800)")

    const closeButton = document.createElement("button")
    closeButton.classList.add(itemName)
    closeButton.classList.add("closeButton")
    closeButton.innerText = "✖️"
    closeButton.setAttribute("onclick", "deleteItem(this)")

    const divItem = document.createElement("div")
    divItem.classList.add(itemName)
    divItem.classList.add("item")
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
}

function checkBoxClicked(e) {
    const containerDiv = document.querySelector("div." + e.classList[0])
    const divActiveItems = document.querySelector("#activeItems")
    const divInactiveItems = document.querySelector("#inactiveItems")

    if (e.checked) {
        document.querySelectorAll("." + e.classList[0]).forEach(item => item.classList.add("inactive"))
        divInactiveItems.appendChild(containerDiv)
    } else {
        document.querySelectorAll("." + e.classList[0]).forEach(item => item.classList.remove("inactive"))
        divActiveItems.appendChild(containerDiv)
    }
}

function getSavedItems() {
    let cookie = document.cookie
    let cookiesList = cookie.split(";")

    cookiesList.map(item => {
        const cookieName = item.split("=")[0]
        const cookieValue = item.split("=")[1]

        let pattern = new RegExp(/text\d/)
        if (pattern.test(cookieName)) addItem(cookieName, cookieValue)
    })
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    let cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    document.cookie = cookie
    console.log(cookie)
}