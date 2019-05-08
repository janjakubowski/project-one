# project-one
## **First group project for Guardians of the GitHub**

### **The user starts at a welcome page**
     * At this page the user can either sign in or search as a guest
### **Search functionality**
     * The user will enter a parameter for the search, such as character
     * The comic book information will be grabbed from the Marvel API
        * https://developer.marvel.com
     * The information will also grab a video, potentially a trailer, from YouTube for the character
        * https://www.youtube.com/yt/dev/api-resources/
### **Sign in functionality**
     * The user can sign in with a unique user ID that will be saved to the database
     * The database will inform the user if the name is already taken and prompt them to choose another
     * After sign in, any information under the user is available to them
### **Adding comic to inventory functionality**
     * There will be an 'add' button on each comic that the user can press
     * This button will be grayed out if they are not signed in
     * If a guest tries to click the 'add' button it will prompt them to sign in
     * If the user is signed in, the added comic will be saved to the database to be displayed in the user's inventory list
### **The inventory list**
     * If the user selects their inventory list they will be able to see their current inventory
     * The user will be able to remove items in their inventory in the case they no longer have the item
## **Enhancements**
     * Using OMDB to include movies available to be added to their inventory
     * Adding a favorites/wish list for them to reference
     * Adding Ebay so they can see listings for their items in their favorites
     * Username suggestions when they one they want is already taken