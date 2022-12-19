const container = document.getElementById("container")
const cards = document.getElementById("cards")
const modal = document.getElementById("modal")

//Fetches data from api
fetch("https://reqres.in/api/users/")
    .then((response) => response.json())
    .then((data) => {
        //loops through users and creates a user card for each user
        data.data.forEach((user) => {
            const div = document.createElement("div")
            div.innerHTML = `
                <div id="card">
                    <div id="card-header"></div>
                    <div id="card-body">
                        <img
                            id="card-avatar"
                            src=${user.avatar}
                            alt="avatar"
                        />
                        <h3 id="card-name">${
                            user.first_name + " " + user.last_name
                        }</h3>
                        <p id="card-email">${user.email}</p>
                    </div>
                </div>
            `

            //Adds hover effect to each card

            div.addEventListener("mouseover", function () {
                div.style.transition = "all 0.2s"
                div.style.transform = "scale(1.05)"
            })

            div.addEventListener("mouseout", function () {
                div.style.transition = "all 0.2s"
                div.style.transform = "scale(1)"
            })

            //On click effect for each user card

            div.addEventListener("click", () => {
                //Adds blur effect to background
                cards.classList.add("blur")

                //Fetches user data for modal from clicked users id
                fetch(`https://reqres.in/api/users/${user.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        modal.style.display = "block"

                        modal.innerHTML = `
                            <div id="card">
                                <div id="card-header"></div>
                                <div id="card-body">
                                    <img
                                        id="card-avatar"
                                        src=${data.data.avatar}
                                        alt="avatar"
                                    />
                                    <h3 id="card-name">${
                                        data.data.first_name +
                                        " " +
                                        data.data.last_name
                                    }</h3>
                                    <p id="card-email">${data.data.email}</p>
                                </div>
                            </div>
                        `
                    })
            })
            //Adds cards to div
            cards.appendChild(div)
        })
    })

//Hides modal and unblurs cards when clicked outside of modal

document.addEventListener("click", (event) => {
    if (modal.style.display === "block") {
        const isClickInside = modal.contains(event.target)
        if (!isClickInside) {
            // The click was OUTSIDE the specifiedElement, do something
            modal.style.display = "none"
            cards.classList.remove("blur")
        }
    }
})
