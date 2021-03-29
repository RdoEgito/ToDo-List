let nItems = 0

function addItem() {
    const itemName = "item" + nItems.toString()
    const checkBox = document.createElement("input")
    checkBox.classList.add(itemName)
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("onclick", "checkBoxClicked(this)")

    const textBox = document.createElement("input")
    textBox.classList.add(itemName)
    textBox.setAttribute("onchange", "setCookie(this.classList[0], this.value, 800)")
    textBox.setAttribute("type", "text")

    const divItem = document.createElement("div")
    divItem.classList.add(itemName)
    divItem.classList.add("item")
    divItem.appendChild(checkBox)
    divItem.appendChild(textBox)

    const divActiveItems = document.querySelector("#activeItems")
    divActiveItems.appendChild(divItem)

    nItems++
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

function setCookie(cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    let cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    document.cookie += cookie
    console.log(cookie)
}