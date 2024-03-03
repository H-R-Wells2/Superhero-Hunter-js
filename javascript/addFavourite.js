// Function to fetch favorite characters from local storage
function fetchFavourites() {
  let data = JSON.parse(localStorage.getItem("favourite")) || [];
  return data;
}

// Function to update the local storage with the provided data
function setStorage(data) {
  let dataString = JSON.stringify(data);
  localStorage.setItem("favourite", dataString);
}

// Function to update the favorite status of a character
function updateFavourite(e) {
  // Extract character data from the HTML element's attribute
  let data = JSON.parse(e.getAttribute("data-character"));
  let favouriteList = fetchFavourites();

  // Iterate through the favorite list to check if the character is already favorited
  for (let character = 0; character < favouriteList.length; character++) {
    if (favouriteList[character].id == data.id) {
      // Remove the character from the favorites list and update the UI
      favouriteList.splice(character, 1);
      e.setAttribute("value", "Favourite");
      setStorage(favouriteList);
      return;
    }
  }

  // Add the character to the favorites list and update the UI
  favouriteList.push(data);
  setStorage(favouriteList);
  e.setAttribute("value", "UnFavourite");
}

// Function to render the favorite characters in a given container
function renderFavourite(favouriteContainer) {
  let myFavouriteList = fetchFavourites();

  // Clear the container before rendering if there are favorites
  if (myFavouriteList.length > 0) {
    favouriteContainer.innerHTML = "";
  }

  // Iterate through the favorite list and create HTML elements for each character
  for (let character = 0; character < myFavouriteList.length; character++) {
    const { id, name, path } = myFavouriteList[character];

    let div = document.createElement("div");
    div.className = "bg-gray-600 flex-col justify-center items-center rounded-lg shadow-md shadow-teal-300 overflow-hidden w-1/5 relative";
    div.setAttribute("id", id);

    // Construct the details path for the character
    let detailsPath = `../pages/characterDetails.html#${id}`;

    // Populate the HTML structure with character details
    div.innerHTML = `
        <img class="poster" src=${path}.jpg alt="">
        <div class="flex-col justify-center items-center p-3 text-white">
          <a class="text-lg font-semibold" href=${detailsPath}>${name}</a>
          <input class="bg-blue-400 hover:bg-blue-500 px-2 py-1 text-sm flex justify-center items-center rounded-full shadow-lg shadow-red-400 absolute top-4 right-3" type="button" value="UnFavourite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavourite(this)"/>
        </div>
    `;
    favouriteContainer.appendChild(div);
  }
}

// Get reference to the favorite characters container
let favouriteContainer = document.getElementById('favourite-characters');

// Check if the container exists and render the favorite characters
if (favouriteContainer != null) {
  renderFavourite(favouriteContainer);
}
