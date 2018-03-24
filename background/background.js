console.log("🐱" + "meow")

// key = API KEY, part = snippet (required), q = the query
const reqUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCK1LvFVfX_G8fPXtWagZSfNChyMi2UcKk&part=snippet&q=kitten&maxResults=25"
const videoUrl = "https://www.youtube.com/watch?v="
// use Kitten Academy Live Stream as default
const defaultUrl = "https://www.youtube.com/watch?v=X2gcLUZ7qnw"

const getRandomInt = () => {
    let num = Math.random()
    //range 0 - 24
    return Math.floor(num * 24)
}

const getCatUrl = () => {
    let req = new XMLHttpRequest()
    req.open("GET", reqUrl, true)
    req.send()
    req.onload = () => {
        if (req.readyState === 4 && req.status === 200) {
            let res = JSON.parse(req.responseText)
            //want results to be random
            let i = getRandomInt()
            let videoId = res["items"][i]["id"]["videoId"]
            let url = videoUrl + videoId
            console.log(url)
            return url
        } else {
            console.log("request got status: " + req.status + "error: " + req.statusText)
            return defaultUrl
        }
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        return {redirectUrl: defaultUrl}
    },
    {urls: ["*://www.facebook.com/*", "*://facebook.com/*"]},
    ["blocking"]
)

