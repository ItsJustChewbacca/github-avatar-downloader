var request = require("request");
console.log("welcome to the github avatar downloader");

function getRepoContributers(repoOwner, repoName, cb) {}

getRepoContributers("jquery", "jquery", function(err, result) {
  console.log("Get absolutely wrecked by", err);
  console.log("Mad hacks", result);
});
