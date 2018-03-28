console.log("🐱" + "meow")

const baseUrl = "https://www.youtube.com/watch?v="

// Default kitten live streams from YouTube 
const videoIds = ["X2gcLUZ7qnw","r9xlYrOzu0c","izTaPcZZAXs", "Rb4l1vntCeM"]

// Get a random integer to use as index for defaultUrls array
const getRandomInt = () => {
	let i = [Math.floor(Math.random() * videoIds.length)]
	return parseInt(i)
}

const getUrl = () => {
	let i = getRandomInt()
	return baseUrl + videoIds[i]
}

// Look for requests to Facebook, redirect to a cat video
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
		let url = getUrl()
        return {redirectUrl: url}
    },
    {urls: ["*://www.facebook.com/*", "*://facebook.com/*"]},
    ["blocking"]
)
