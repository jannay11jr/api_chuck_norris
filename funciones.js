let p_ = document.getElementById("parrafo");
let categoriesBtnContainer = document.querySelector(".categories-btns");

async function getData() {
    try {
        const data = await fetch("https://api.chucknorris.io/jokes/random");
        const data2 = await data.json();
        const JSONString = JSON.stringify(data2);
        json_ = JSON.parse(JSONString);
        p_.innerHTML = json_.value;
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

setInterval(getData, 3000);

window.onload = function () {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        darkMode();
    } else {
        lightMode();
    }
}

async function getCategories() {
    try {
        const response = await fetch("https://api.chucknorris.io/jokes/categories");
        const categories = await response.json();

        categories.forEach(category => {
            const button = document.createElement("button");
            button.textContent = category;
            button.addEventListener("click", async () => {
                try {
                    const response = await fetch("https://api.chucknorris.io/jokes/random?category=" + category);
                    const jokeData = await response.json();
                    displayJoke(jokeData.value);
                } catch (error) {
                    console.error("Error al obtener chiste de la categoría", category, ":", error);
                }
            });
            categoriesBtnContainer.appendChild(button);
        });
    } catch (error) {
        console.error("Error al obtener las categorías", error);
    }
}

function displayJoke(joke) {
    const jokeContainer = document.getElementById("parrafo2");
    jokeContainer.textContent = joke;
}

document.addEventListener("DOMContentLoaded", getCategories);

let container_total = document.querySelector(".container-total");
let title_web = document.querySelector(".title-web");
let container = document.querySelector(".container");
let container2 = document.querySelector(".container2");
let titles_2 = document.querySelectorAll("h2")


function darkMode() {
    container_total.style.background = "#333333";
    title_web.style.color = "white";
    container.style.background ="#000000";
    container.style.color ="pink";
    container2.style.background ="#000000";
    container2.style.color ="pink";

    titles_2.forEach(h2 => {
        h2.style.color = "white";
    });

    document.body.classList.add("dark-mode");
    localStorage.setItem('mode', 'dark');
}

function lightMode(){
    container_total.style.background = "#FE754D";
    title_web.style.color = "#000000";
    container.style.background ="white";
    container.style.color ="#FE754D";
    container2.style.background ="white";
    container2.style.color ="#FE754D";

    titles_2.forEach(h2 => {
        h2.style.color = "#000000";
    });

    document.body.classList.remove("dark-mode");
    localStorage.setItem('mode', 'light');
}

