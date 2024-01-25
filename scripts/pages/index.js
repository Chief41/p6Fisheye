const reponse = fetch("data/photographers.json")
.then(reponse => reponse.json())
.then(data =>  {
    for (let i = 0; i < data.photographers.length; i++) {
        const photographer = data.photographers[i];
        const photoGrid = document.querySelector(".photographer_section");
        const photographerContainer = document.createElement("article");
        photographerContainer.style.cursor = "pointer";
        const photographerId = `../../../Front-End-Fisheye/assets/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`;
        
        //creation d'une balise pour l'image
        const imageElements = document.createElement("img");
        imageElements.src = photographerId;
        imageElements.style.borderRadius = "50%";
        imageElements.style.objectFit = "cover";

        // creation du h2 pour le nom 
        const nameElement = document.createElement("h2");
        nameElement.innerText = photographer.name;

        // La ville
        const myCity = document.createElement("p");
        myCity.innerText = `${photographer.city}, ${photographer.country}`;
        myCity.style.color = "#901C1C";


        //La tagline 
        const myTagline = document.createElement("p")
        myTagline.innerText = photographer.tagline;


        // le Prix
        const price = document.createElement("p");
        price.innerText = `${photographer.price} €/jour`
        price.style.color = "#757575"

        //Notre arboresence
        photographerContainer.appendChild(imageElements);
        photoGrid.appendChild(photographerContainer);
        photographerContainer.appendChild(nameElement);
        photographerContainer.appendChild(myCity);
        photographerContainer.appendChild(myTagline);
        photographerContainer.appendChild(price);

        photographerContainer.addEventListener("click", function() {
          // Stocker l'ID du photographe dans le localStorage
          localStorage.setItem('selectedPhotographerId', photographer.id);
          // Rediriger vers une autre page après le clic
          window.location.href = "http://127.0.0.1:5500/Front-End-Fisheye/photographer.html";
      });
    }
})
.catch(error => console.error("Erreur lors du chargement du JSON :", error));




