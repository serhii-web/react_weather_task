export const getWeather = (url) => (
  fetch(`https://api.openweathermap.org/data/2.5/${url}&appid=348d3054b4f5732453d1ab4bd9d80eca`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res)
      }

      return res.json()
    })
)

export const getCitys = (name) => (
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=pk.eyJ1Ijoic2VyaGlpdWEiLCJhIjoiY2t1d2hhNnpvMXg3ejJ1bG5tbHdmeGtnciJ9.ddqlI9No9vaqKynBUQviWg`)
  .then(res => res.json())
)