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
    textBox.setAttribute("oninput", "setCookies(this.classList[0], this.value, this.classList[1], 100)")

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
    const divInactiveItems = document.querySelector("#inactiveItems")

    if (itemStatus == "active") divActiveItems.appendChild(divItem)
    else {
        checkBox.checked = true
        divInactiveItems.appendChild(divItem)
    }

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
    setCookies(e.classList[0], "", -1)
}

function checkBoxClicked(e) {
    const itemName = e.classList[0]
    const containerDiv = document.querySelector("div." + itemName)
    const textValue = containerDiv.querySelector("input.itemText").value
    const divActiveItems = document.querySelector("#activeItems")
    const divInactiveItems = document.querySelector("#inactiveItems")

    console.log(textValue)

    if (e.checked) {
        document.querySelectorAll("." + itemName).forEach(item => {
            item.classList.add("inactive")
            item.classList.remove("active")
        })
        divInactiveItems.appendChild(containerDiv)
        setCookies(itemName, textValue, "inactive", 100)
    } else {
        document.querySelectorAll("." + itemName).forEach(item => {
            item.classList.add("active")
            item.classList.remove("inactive")
        })
        divActiveItems.appendChild(containerDiv)
        setCookies(itemName, textValue, "active", 100)
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

        if (patternItem.test(cookieName)) {
            cookieItem = cookieName
            cookieText = cookieValue
        } else if (patternStatus.test(cookieName)) {
            cookieStatus = cookieValue

            addItem(cookieItem, cookieText, cookieStatus)
        }
    })
}

function clearAllCookies() {
    let cookies = document.cookie.split(";")

    cookies.map(c => {
        let cookieName = c.split("=")[0]
        setCookie(cookieName, "", -1)

        console.log("Deleted cookie name: ", cookieName)
    })
}

function setCookies(itemName, itemText, itemStatus, exdays) {
    console.log("")
    setCookie(itemName, itemText, exdays)
    setCookie(itemName + "Status", itemStatus, exdays)
}

function setCookie(cname, cvalue, cstatus, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    let cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    document.cookie = cookie
    console.log(cookie)
}

function getCookie(cname) {
    var name = cname + "="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}