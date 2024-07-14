document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    const imagesUrl = 'https://dog.ceo/api/breeds/image/random/4'; 
    const breedsUrl = 'https://dog.ceo/api/breeds/list/all';

    // Fetch images from the URL
    fetch(imagesUrl)
        .then(response => response.json())
        .then(data => {
            const images = data.message; // Access the images array within the response object
            if (Array.isArray(images)) {
                images.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = "Dog image from API";
                    imageContainer.appendChild(img);
                });
            } else {
                console.error("Error: Expected an array of images.");
            }
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });

    // Fetch breeds from the URL
    fetch(breedsUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message; // Access the breeds object within the response object
            if (breeds && typeof breeds === 'object') {
                Object.keys(breeds).forEach(breed => {
                    const li = document.createElement("li");
                    li.textContent = breed;
                    breedList.appendChild(li);

                    // Add click event listener to change font color to blue
                    li.addEventListener("click", function() {
                        li.style.color = "blue";
                    });
                });
            } else {
                console.error("Error: Expected an object of breeds.");
            }
        })
        .catch(error => {
            console.error("Error fetching breeds:", error);
        });

    // Filter breeds based on the dropdown selection
    breedDropdown.addEventListener("change", function(event) {
        const selectedLetter = event.target.value;
        const breedItems = breedList.getElementsByTagName("li");
        Array.from(breedItems).forEach(breedItem => {
            if (breedItem.textContent.startsWith(selectedLetter)) {
                breedItem.style.display = "list-item";
            } else {
                breedItem.style.display = "none";
            }
        });
    });
});
