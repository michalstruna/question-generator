const isLocalhost = /^https?:\/\/localhost:/.test(window.location.pathname)

export default {
    apiUrl: isLocalhost ? 'http://localhost:8080/api/' : 'https://qgenerator.herokuapp.com/api/'
}