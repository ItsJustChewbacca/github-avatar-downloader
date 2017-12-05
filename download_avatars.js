var request = require("request");
var secrets = require("./secrets.js");
console.log("welcome to the github avatar downloader");

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
    callback(error, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(error, result) {
  if (error) {
    console.log("Get absolutely wrecked by", error);
    return;
  }
  console.log("Mad hacks:", result);
});
