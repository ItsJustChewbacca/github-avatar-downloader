var request = require("request");
var secrets = require("./secrets.js");
var fs = require("fs");
console.log("welcome to the github avatar downloader");
//I need to get each image url
//I need to save the image to a filepath
function downloadImageByURL(url, filepath) {
  request
    .get(url)
    .on("error", function(error) {
      console.log("get wrecked:", error);
    })
    .on("response", function(response) {
      console.log("ResponseStatusCode:", response.statusCode);
      console.log("ResponseStatusMessage:", response.statusMessage);
      console.log("ResponseContentType:", response.headers);
    })
    .pipe(fs.createWriteStream(filepath));
}

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url:
      "https://api.github.com/repos/" +
      repoOwner +
      "/" +
      repoName +
      "/contributors",
    headers: {
      "user-agent": "request",
      Authentication: secrets
    }
  };
  request(options, function(error, response, body) {
    callback(
      error,
      JSON.parse(body).forEach(function(key) {
        console.log(key.avatar_url);
        downloadImageByURL(key.avatar_url, "./avatars/" + key.login + ".jpg");
      })
    );
  });
}

getRepoContributors("jquery", "jquery", function(error, result) {
  if (error) {
    console.log("Get absolutely wrecked by", error);
    return;
  }
  console.log("Mad hacks:", result);
});
