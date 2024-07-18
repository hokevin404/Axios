import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_krEb5dso4ygUKzWug2sbfKnSbT0W91qDqKWd1LsFy6zOXKC6emWHqmP0mGKzmC2C";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// (async function initialLoad() {
//   const res = await fetch("https://api.thecatapi.com/v1/breeds");
//   const breeds = await res.json();
//   // console.log(breeds);
//   breeds.forEach((breed) => {
//     const option = document.createElement("option");
//     option.setAttribute("value", breed.id);
//     const breedName = document.createTextNode(breed.name);
//     option.appendChild(breedName);
//     document.getElementById("breedSelect").appendChild(option);
//   });

//   loadCarousel();
// })();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// breedSelect.addEventListener("change", loadCarousel);

// function initCarousel(breedData) {
//   // console.log(breedData);

//   Carousel.clear();
//   infoDump.innerHTML = "";

//   breedData.forEach((image) => {
//     const slide = Carousel.createCarouselItem(
//       image.url,
//       breedSelect.value,
//       image.id
//     );
//     Carousel.appendCarousel(slide);
//   });

//   const para = document.createElement("p");
//   para.innerText = breedData[0].breeds[0].description;
//   const para2 = document.createElement("p");
//   para2.innerText = breedData[0].breeds[0].temperament;
//   infoDump.appendChild(para).appendChild(para2);

//   Carousel.start();
// }

// async function loadCarousel() {
//   // console.log(breedSelect.value)
//   const breed = breedSelect.value;
//   const URL = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed}&api_key=${API_KEY}`;

//   const response = await fetch(URL);
//   const data = await response.json();
//   // console.log(data);

//   initCarousel(data);
// }

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

// Function to load carousel for user selection of cat breed 
(async function initialLoad() {
  // Axios GET of cat breeds from api
  const res = await axios("https://api.thecatapi.com/v1/breeds");
  // Store cat object from api to variable
  const breeds = await res.data;
  // console.log(breeds);

  // For each cat breed in breeds object:
  // 1) Create new option tag
  // 2) Set value of option tag to cat breed id
  // 3) Set Text to name of cat breed
  // 4) Append option tag to select tag
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.setAttribute("value", breed.id);
    const breedName = document.createTextNode(breed.name);
    option.appendChild(breedName);
    document.getElementById("breedSelect").appendChild(option);
  });

  // Invoke carousel
  loadCarousel();
})();

// Event listener to load carousel with cat images based on user selected cat breed
breedSelect.addEventListener("change", loadCarousel);

// Function to setup and start carousel
function initCarousel(breedData) {
  // console.log(breedData);

  // clear current carousel
  Carousel.clear();
  // restart text display
  infoDump.innerHTML = "";

  // For each image object in breedData object:
  // 1) Create a new carousel slide with an image tag with:
  //    a) Image URL to obtain image 
  //    b) Breed name for alt
  //    c) image id for favorite
  // 2) Append slide to carousel
  breedData.forEach((image) => {
    const slide = Carousel.createCarouselItem(
      image.url,
      breedSelect.value,
      image.id
    );
    Carousel.appendCarousel(slide);
  });

  // Create a new <p> tag
  const para = document.createElement("p");
  // Insert breed description into newly created <p>
  para.innerText = breedData[0].breeds[0].description;
  // Create a new <p> tag
  const para2 = document.createElement("p");
  // Insert breed temperament into newly created <p>
  para2.innerText = breedData[0].breeds[0].temperament;
  // Append both <p> tags to infoDump div
  infoDump.appendChild(para).appendChild(para2);

  // Initiate carousel
  Carousel.start();
}

// Function to load Carousel
async function loadCarousel() {
  // console.log(breedSelect.value)

  // Store selected cat breed into variable
  const breed = breedSelect.value;
  // API query url for selected cat breed's images
  const URL = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed}&api_key=${API_KEY}`;

  // Axios GET of cat breed images from URL
  const response = await axios(URL);
  // Store response object of cat images into variable
  const data = await response.data;
  // console.log(data);

  // Invoke function to start carousel with cat images
  initCarousel(data);
}
