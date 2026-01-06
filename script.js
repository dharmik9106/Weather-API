

const key = "5f2ff3ccf27a45d9a5b132242260401";

const input = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const box = document.getElementById("weatherBox");

input.addEventListener("input", async () => {
    let text = input.value.trim();

    if (text.length < 2) {
        suggestions.innerHTML = "";
        return;
    }

    const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${key}&q=${text}`
    );
    const cities = await res.json();

    suggestions.innerHTML = "";

    cities.forEach(city => {
        if (city.country === "India") {
            const li = document.createElement("li");
            li.innerText = city.name;
            li.onclick = () => loadWeather(city.name);
            suggestions.appendChild(li);
        }
    });
});

async function loadWeather(city) {
    input.value = city;
    suggestions.innerHTML = "";

    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
    );
    const data = await res.json();

    box.classList.remove("hidden");

    document.getElementById("cityName").innerText =
        `${data.location.name}, India`;

    document.getElementById("temp").innerText =
        `Temperature : ${data.current.temp_c} °C`;

    document.getElementById("condition").innerText =
        `Condition : ${data.current.condition.text}`;

    document.getElementById("humidity").innerText =
        `Humidity : ${data.current.humidity}%`;

    document.getElementById("wind").innerText =
        `Wind Speed : ${data.current.wind_kph} km/h`;

    setBackground(data.current.temp_c);
}

function setBackground(temp) {
    if (temp < 15) {
        document.body.style.background =
            "linear-gradient(to right, #4b6cb7, #182848)";
    } else if (temp < 30) {
        document.body.style.background =
            "linear-gradient(to right, #11998e, #38ef7d)";
    } else {
        document.body.style.background =
            "linear-gradient(to right, #f12711, #f5af19)";
    }
}
