const { REACT_APP_KEY, REACT_APP_URL } = process.env

export const getWeather = (url) => (
  fetch(`${REACT_APP_URL}${url}&appid=${REACT_APP_KEY}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res)
      }

      return res.json()
    })
)