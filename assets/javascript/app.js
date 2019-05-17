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

// database related global variables
var userid = "";
const dbRefUsers = firebase.database().ref().child('users');
var comicbookRef = ""; // database reference to user's comicbooks after login

// jQuery
var characterImage = $("#character-image");
var groupImage = $("#group-image");
var issueImage = $("#issue-image");
var youtubeVideo = $("#youtube-video");
var heroInput = $("#hero-input");
var groupInput = $("#group-input");
var titleInput = $("#title-input")
var issueNumberInput = $("#issue-number-input");
var publishYearInput = $("#publish-year-input");
var confirmHeader = $("#modal-confirm-header");
var confirmMsg = $("#modal-confirm-message");

/**
 * On click function to dispaly any media associated with the character/group
 */

$(function () {

    $("#modal-search").modal();
    $("#modal-confirm").modal();

    function displayRowMedia() {
        clearMedia();
        
        var $row = $(this).closest("tr"),        
        $hero = $row.find("#hero-name"); 
        $group = $row.find("#group-name"); 
        $title = $row.find("#title-name"); 
        $issue = $row.find("#issue-number"); 
        $year = $row.find("#publish-year"); 
    
        hero = $hero.text().replace(/the /ig, "");
        group = $group.text().replace(/the /ig, "");
        title = $title.text().replace(/the /ig, "");
        issueNumber = $issue.text();
        publishYear = $year.text();
    
        getCharacterDetails();
        getYoutubeTrailerForCharacter(hero);
        if (group) {
            getGroupDetails();
        }
        if (title && issueNumber) {
            getComicDetails();
        }
    }

    function clearMedia() {
        $("#character-image").empty();
        $("#group-image").empty();
        $("#issue-image").empty();
        $("#youtube-video").empty();
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
        desc.attr("id", "char-desc");
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
        desc.attr("id", "group-desc");
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
        desc.attr("id", "issue-desc");
        desc.text(description);
        $("#issue-image").append(desc);
    }

    /**
     * Call YouTube API for official trailer for hero
     */
    function getYoutubeTrailerForCharacter(hero, group) {

        if (group) {
            searchTopic = group;
        }
        else {
            searchTopic = hero;
        }

        event.preventDefault();
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTopic + "+official+trailer&type=video&videoCaption=closedCaption&key=" + youTubeApiKey;

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
        var youtubeFrame = $("<iframe>", { src: video, frameborder: "0", height: "315", width: "560", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" })
        $("#youtube-video").append(youtubeFrame);
    }

    /**
       * Populate a new table cell, assign an id, and return the value
       * @param id 
       * @param value 
       */
    function displayTableEntry(id, value) {
        var newEntry = $("<td>");
        newEntry.attr("id", id);
        newEntry.text(value);
        return newEntry;
    }

    /** On-Click for Enter Hero */
    $(document).on("click", "#row-entry", addComicbook);

    /** On-Click for Select*/
    $(document).on("click", "#table-entry", displayRowMedia);

    // login or register new user
    $(document).on("click", ".add-new-user", addUser);
    $(document).on("click", ".login-user", loginUser);

    // **
    // * add a new user 
    // * userid is retrieved from the form input  
    // *
    function addUser() {

        var newUserInput = $("#addUser");
        userid = newUserInput.val().trim();

        dbRefUsers.child(userid).once("value").then(snapshot => {
            if (snapshot.exists()) {
                confirmHeader.text("Sorry");
                confirmMsg.text("The name " + userid + " is taken, please try another one");
            } else {
                firebase.database().ref('users/' + userid).set({
                    userid: userid
                });

                // firebase.database().ref(userid).set;
                confirmHeader.text("Welcome");
                confirmMsg.text("Hi " + userid + ". You are now logged in and ready to go!");
                comicbookRef = firebase.database().ref(userid + "/comicbooks");
            };
            $("#modal-confirm").modal("open");
        });
    }

    // **
    // * login an existing user 
    // * userid is retrieved from the form input
    // *
    function loginUser() {

        var userInput = $("#loginUser");
        userid = userInput.val().trim();

        dbRefUsers.child(userid).once("value").then(snapshot => {

            if (snapshot.exists()) {
                confirmHeader.text("Welcome back!");
                confirmMsg.text("Hi " + userid + ". Click OK to see your inventory");
                comicbookRef = firebase.database().ref(userid + "/comicbooks");
                comicbookRef.on("child_added", function (snapshot) {
                    // replace console.log with table building functio
                    // console.log(JSON.stringify(snapshot.val()));
                    displayInventory(snapshot.val());

                });
                // TO DO: after usr clicks OK, where should he be directed
            } else {
                confirmHeader.text("Sorry");
                confirmMsg.text("The name " + userid + " is not registered, please register to join the fun.");
            };
            $("#modal-confirm").modal("open");
        });
    }

    // **
    // * add a new comicbook to the inventory 
    // * on.click from input form
    // *
    function addComicbook () {
        
        event.preventDefault();
        
        var newComic = {
            heroName : heroInput.val().trim(),
            teamAffiliation: groupInput.val().trim(),   
            seriesTitle: titleInput.val().trim(),
            issueNumber: issueNumberInput.val().trim(),
            publishYear: publishYearInput.val().trim()
        };
        
        if (userid !== "") {
            comicbookRef = firebase.database().ref(userid + "/comicbooks");
            comicbookRef.push(newComic);
        } else {
            displayInventory(newComic);
        };

    };

    /**
     * Function to populate the inventory table based on entries from the table
     */
    // dbRef.ref().on("child_added", function (childSnapshot) {

    function displayInventory(comicbook) {


        // Create the new row
        var newRow = $("<tr>");
        newRow.addClass("inventory-item");
        newRow.attr("id","table-entry");
        newRow.append(displayTableEntry("hero-name", comicbook.heroName));
        newRow.append(displayTableEntry("group-name", comicbook.teamAffiliation));
        newRow.append(displayTableEntry("title-name", comicbook.seriesTitle));
        newRow.append(displayTableEntry("issue-number", comicbook.issueNumber));
        newRow.append(displayTableEntry("publish-year", comicbook.publishYear));

        // Append the new row to the table
        $("#inventory-table > tbody").prepend(newRow);
    }



})