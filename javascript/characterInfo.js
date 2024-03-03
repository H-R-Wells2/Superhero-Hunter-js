window.onload = function () {
  let wrapper = document.getElementById("characterWrapper");

  // Extract character ID from the URL, default to 1017100 if not found
  let winurl = window.location.href;
  let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;

  // Construct the API URL for fetching character details
  let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=c2ec70b4872f45bef91879871decd969&hash=37b2e7b0e15490ae106fda542389611d`;

  // Fetch character details from the Marvel API
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Extract relevant details from the API response
      let character = data.data.results[0];
      const { name, description, thumbnail } = character;

      // Create and populate a div element with character information
      let div = document.createElement("div");
      div.className = "flex-col w-1/2 shadow-md shadow-teal-300 justify-center items-center rounded-lg bg-red-300 p-5";

      div.innerHTML = `
        <div class="flex justify-center items-center">
          <img class="flex w-72 m-4 rounded-lg" src="${thumbnail.path}.${thumbnail.extension}" alt="">
        </div>
        <div class="flex-col justify-center items-center">
          <h3 class="text-center font-semibold text-3xl font-serif">${name}</h3>
          <h3 class="font-semibold text-xl mb-2">Description:</h3>
          <p class="flex justify-center items-center">${description || "description not found"}</p>
        </div>
      `;
      // Clear and append the div to the character details wrapper
      wrapper.innerHTML = "";
      wrapper.appendChild(div);
    })
    .catch((error) => {
      console.log(error);
    });

  // Get reference to the comics wrapper
  let comicsWrapper = document.getElementById("comics");
  comicsWrapper.innerHTML = "";

  // Construct the API URL for fetching character comics
  url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=c2ec70b4872f45bef91879871decd969&hash=37b2e7b0e15490ae106fda542389611d`;

  // Fetch character comics from the Marvel API
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      // Extract relevant details from the API response
      let comics = res.data.results;

      // Loop through the comics and create div elements for each
      for (let comic of comics) {
        const { title, thumbnail, description } = comic;
        let div = document.createElement("div");
        div.className = "bg-gray-600 shadow-md shadow-teal-300 text-white flex-col justify-center items-center rounded-lg w-1/5";

        div.innerHTML = `
        <div class="flex rounded-md overflow-hidden">
          <img class="" src="${thumbnail.path}.${thumbnail.extension}" alt="">
        </div>
        <div class="flex-col justify-center p-3 items-center">
          <h3 class="font-semibold text-xl border-b">${title}</h3>
          <p class="mt-2">${description || "description not found"}</p>
        </div>
      `;
        // Append each comic div to the comics wrapper
        comicsWrapper.appendChild(div);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
