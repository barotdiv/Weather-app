    const API_KEY = import.meta.env.VITE_API_KEY;;

    const icons = {
      Clear: "☀️", Clouds: "⛅", Rain: "🌧️",
      Drizzle: "🌦️", Thunderstorm: "⛈️",
      Snow: "❄️", Mist: "🌫️", Fog: "🌫️",
      Haze: "🌁", Smoke: "🌫️"
    };

    document.getElementById("cityInput").addEventListener("keydown", e => {
      if (e.key === "Enter") getWeather();
    });

    async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      if (!city) return;

      show("loading");

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=gandhinagar&units=metric&appid=441fc3c6098d416f081cfd2b39a1935d`;
        const res  = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) throw new Error(data.message);

        document.getElementById("cityName").textContent   = `${data.name}, ${data.sys.country}`;
        document.getElementById("dateTime").textContent   = new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
        document.getElementById("temp").innerHTML         = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.getElementById("icon").textContent       = icons[data.weather[0].main] || "🌡️";
        document.getElementById("desc").textContent       = data.weather[0].description;
        document.getElementById("feels").textContent      = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById("humidity").textContent   = `${data.main.humidity}%`;
        document.getElementById("wind").textContent       = `${Math.round(data.wind.speed)} m/s`;
        document.getElementById("visibility").textContent = `${(data.visibility / 1000).toFixed(1)} km`;

        show("weather");
      } catch (err) {
        document.getElementById("error").textContent = `⚠ ${err.message}`;
        show("error");
      }
    }
    function show(id) {
      ["loading", "weather", "error"].forEach(el => {
        document.getElementById(el).style.display = el === id ? "block" : "none";
      });
    }