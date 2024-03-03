// Get reference to the container for displaying characters
let charactersContainer = document.getElementById("characters-container");

// Function to fetch character data from the Marvel API
async function fetchData() {
  // Constructing the API request URL
  const response = await fetch(
    `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=c2ec70b4872f45bef91879871decd969&hash=37b2e7b0e15490ae106fda542389611d&limit=20&offset=${Math.floor(
      Math.random() * 100
    )}`
  );
  const data = await response.json();
  return data;
}

// Function to fetch favorite characters from local storage
function fetchFavourites() {
  let data = JSON.parse(localStorage.getItem("favourite")) || [];
  return data;
}

// Fetching data and displaying characters
fetchData()
  .then((data) => {
    let favouriteData = fetchFavourites();
    let arr = data.data.results;
    charactersContainer.innerHTML = "";

    // Loop through the character data and create HTML elements
    for (let i = 0; i < arr.length; i++) {
      let favourite = "favourite";

      // Check if the character is in the favorites list
      for (let j = 0; j < favouriteData.length; j++) {
        if (arr[i].id == favouriteData[j].id) {
          favourite = "UnFavourite";
          break;
        }
      }

      // Extracting necessary details for each character
      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.className = "flex-col bg-gray-600 p-3 rounded-md text-white w-48 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-teal-300 my-3 relative";
      div.setAttribute("id", id);
      let path = `/Superhero-Hunter-js/pages/characterDetails.html#${id}`;

      // Creating the HTML structure for each character
      div.innerHTML = `
        <img class="rounded-lg" src=${thumbnail.path}.${thumbnail.extension} alt="">
        <div class="">
          <a href=${path}>${name}</a>
          <input class="bg-blue-400 hover:bg-blue-500 px-2 py-1 text-sm flex justify-center items-center rounded-full shadow-lg shadow-red-400 absolute top-4 right-3" type="button" value=${favourite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavourite(this)"/>
        </div>
      `;
      charactersContainer.appendChild(div);
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Get references to search-related elements
let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
  // Get the search query and reset the search box
  let query = searchBox.value;
  searchBox.value = "";

  // Constructing the API request URL for character search
  let url = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=c2ec70b4872f45bef91879871decd969&hash=37b2e7b0e15490ae106fda542389611d&nameStartsWith=${query}`;

  // Fetching search results
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Clear previous search results
      searchResult.innerHTML = "";
      let h3 = document.createElement("h3");
      h3.innerText = "Search results :";
      h3.className = "text-center text-2xl font-semibold my-16";
      searchResult.appendChild(h3);

      let resultCardSection = document.createElement("div");
      resultCardSection.className = "flex justify-around items-center flex-wrap gap-10";
      searchResult.appendChild(resultCardSection);

      // Loop through search results and create HTML elements
      data.data.results.forEach((result) => {
        const { id, name, thumbnail } = result;

        let favouriteData = fetchFavourites();
        let favourite = "favourite";

        // Check if the character is in the favorites list
        for (let j = 0; j < favouriteData.length; j++) {
          if (result.id == favouriteData[j].id) {
            favourite = "UnFavourite";
            break;
          }
        }

        // Creating the HTML structure for each search result
        let div = document.createElement("div");
        div.className = "flex-col bg-gray-600 p-3 rounded-md text-white w-48 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-teal-300 my-3 relative";
        div.setAttribute("id", id);
        let path = `/Superhero-Hunter-js/pages/characterDetails.html#${id}`;

        div.innerHTML = `
          <img class="poster" src=${thumbnail.path}.${thumbnail.extension} alt="">
          <div class="card-body">
            <a href=${path}>${name}</a>
            <input class="bg-blue-400 hover:bg-blue-500 px-2 py-1 text-sm flex justify-center items-center rounded-full shadow-lg shadow-red-400 absolute top-4 right-3" type="button" value=${favourite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavourite(this)"/>
          </div>
        `;
        resultCardSection.appendChild(div);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
