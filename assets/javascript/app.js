/***********************************************
 * Project: Comic Inventory
 * Team: Guardians of the GitHub
 * Date: 2019-05-09
 ***********************************************/
// Global Variables
var searchTopic;
var hero = "";
var group = "";
var title = "";
var issueNumber = "";
var publishYear = "";
var youTubeApiKey = "AIzaSyBcitIxopM2jyltwYAVk9qELClFOuHc0D8"
var apiKey = "ff8b709602975b5a96f9be6741475400";
var privateKey = "f7963e274cda4d92a76dd0c475e513e5d9dc7708";

// jQuery
var characterImage = $("#character-image");
var groupImage = $("#group-image");
var issueImage = $("#issue-image");
var youtubeVideo = $("#youtube-video");
var heroInput = $("#hero-name-input");
var groupInput = $("#group-input");
var titleInput = $("#title-name-input")
var issueNumberInput = $("#issue-number-input");
var publishYearInput = $("#publish-year-input");

/**
 * On click function to dispaly any media associated with the character/group
 */
function displayCollectionMedia() {
    event.preventDefault();
    characterImage.empty();
    groupImage.empty();
    issueImage.empty();
    youtubeVideo.empty();

    //NOTE: Replace following code with a process to get the required API input fields
    //      form the data base.  The form references are for a temporary test tool
    //////Start Trash code
    hero = heroInput.val().trim();
    heroInput.val("");
    group = groupInput.val().trim();
    groupInput.val("");
    title = titleInput.val().trim();
    titleInput.val("");
    issueNumber = issueNumberInput.val().trim();
    issueNumberInput.val("");
    publishYear = publishYearInput.val().trim();
    publishYearInput.val("");
    if(hero) {
        getCharacterDetails();
    }
    if (group) {
        getGroupDetails();
    }
    if (title && issueNumber) {
        getComicDetails();
    }
    getYoutubeTrailerForCharacter(hero, group);
    ///////End Trash Code
}

/**
 * Call marvel API for basic character details
 */
function getCharacterDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name="
        + hero + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    var description = response.data.results[0].description;
                    displayCharacterImage(tnURL, description);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
* Call marvel API for basic affiliated group details
*/
function getGroupDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name="
        + group + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    var description = response.data.results[0].description;
                    displayGroupImage(tnURL, description);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Call marvel API for basic comic details
 */
function getComicDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();

    var queryURL = "https://gateway.marvel.com:443/v1/public/comics?title=" + title;
    if (publishYear) {
        queryURL += "&startYear=" + publishYear;
    }
    queryURL += "&issueNumber=" + issueNumber + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.data.results[0]) {
                    console.log(response);
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    var description = ""
                    if (response.data.results[0].textObjects[0]) {
                        description = response.data.results[0].textObjects[0].text
                    }
                    displayComicImage(tnURL, description);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Render character image from path to thumnail
 * @param url 
 * @param description
 */
function displayCharacterImage(url, description) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "character image");
    $("#character-image").append(image);
    var desc = $("<p>");
    desc.attr("id","char-desc");
    desc.text(description);
    $("#character-image").append(desc);
}

/**
 * Render group image from path to thumnail
 * @param url 
 * @param description
*/
function displayGroupImage(url, description) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#group-image").append(image);
    var desc = $("<p>");
    desc.attr("id","group-desc");
    desc.text(description);
    $("#group-image").append(desc);
}

/**
 * Render comic image from path to thumnail
 * @param url 
 * @param description 
*/
function displayComicImage(url, description) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#issue-image").append(image);
    var desc = $("<p>");
    desc.attr("id","issue-desc");
    desc.text(description);
    $("#issue-image").append(desc);
}

/**
 * Call YouTube API for official trailer for hero
 */
function getYoutubeTrailerForCharacter (hero, group) {

    if (group) {
        searchTopic = group;
    }
    else {
        searchTopic = hero;
    }

    event.preventDefault();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ searchTopic + "+official+trailer&type=video&videoCaption=closedCaption&key=" + youTubeApiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.items[0].id.videoId) {
                    var id = response.items[0].id.videoId;
                    displayYoutubeTrailer(id);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Render official trailer from response using videoId
 * @param id 
*/
function displayYoutubeTrailer(id) {
    var video = "https://www.youtube.com/embed/" + id
    var youtubeFrame = $("<iframe>", { src: video, frameborder: "0", height: "315", width: "560", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"})
    $("#youtube-video").append(youtubeFrame);
}


/** On-Click for Enter Hero */
$(document).on("click", "#row-entry", displayCollectionMedia);