/***********************************************
 * Project: Comic Inventory
 * Team: Guardians of the GitHub
 * Date: 2019-05-09
 ***********************************************/
// Global Variables
var hero = "";
var group = "";
var title = "";
var issueNumber = "";
var publishYear = "";
var apiKey = "ff8b709602975b5a96f9be6741475400";
var privateKey = "f7963e274cda4d92a76dd0c475e513e5d9dc7708";

/**
 * On click function to dispaly any media associated with the character/group
 */
function displayCollectionMedia() {
    event.preventDefault();

    //NOTE: Replace following code with a process to get the required API input fields
    //      form the data base.  The form references are for a temporary test tool
    //////Start Trash code
    hero = $("#hero-name-input").val().trim();
    group = $("#group-input").val().trim();
    title = $("#title-name-input").val().trim();
    issueNumber = $("#issue-number-input").val().trim();
    publishYear = $("#publish-year-input").val().trim();
    getCharacterDetails();
    if (group) {
        getGroupDetails();
    }
    if (title && issueNumber) {
        getComicDetails();
    }
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
                console.log(response);
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayCharacterImage(tnURL);
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
                console.log(response);
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayGroupImage(tnURL);
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
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayComicImage(tnURL);
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
 */
function displayCharacterImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "character image");
    $("#character-image").append(image);
}

/**
 * Render group image from path to thumnail
 * @param url 
*/
function displayGroupImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#group-image").append(image);
}

/**
 * Render comic image from path to thumnail
 * @param url 
*/
function displayComicImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#issue-image").append(image);
}


/** On-Click for Enter Hero */
$(document).on("click", "#row-entry", displayCollectionMedia);