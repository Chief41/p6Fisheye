document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'ID du photographe depuis le localStorage
    const selectedPhotographerId = localStorage.getItem("selectedPhotographerId");
  
    // Récupérer les données depuis le fichier JSON
    fetch("data/photographers.json")
      .then((response) => response.json())
      .then((data) => {
        // Trouver le photographe avec l'ID correspondant
        const { photographers, media } = data;
        const userImages = media.filter((m) => m.photographerId === Number(selectedPhotographerId));
        console.table(userImages);
        const selectedProfil = photographers.find((p) => p.id === Number(selectedPhotographerId));
  
        // Si le profil n'est pas trouvé alors la console retourne aucun photographe séléctionné
        if (!selectedProfil) {
          console.log("Aucun photographe sélectionné.");
          return; // empêche de lire le reste du code si aucun photographes n'est trouvés
        }
  
        // Arborescence
        const mainEvent = document.getElementById("main");
        const profilContainer = document.createElement("div");
        const buttonDiv = document.createElement("div");
        const photoContainer = document.createElement("div");
  
        // Boîte de nos 3 éléments photo de profil/Nom/bouton
        const profilUser = document.querySelector(".photograph-header");
        profilUser.style.display = "flex";
        profilUser.style.justifyContent = "space-around";
  
        // Le nom
        const nameElement = document.createElement("h2");
        nameElement.innerText = selectedProfil.name;
        nameElement.style.color = "#D3573C";
        nameElement.style.fontSize = "50px";
  
        // Ville et pays
        const cityzen = document.createElement("p");
        cityzen.innerText = `${selectedProfil.city}, ${selectedProfil.country}`;
        cityzen.style.color = "#901C1C";
        cityzen.style.fontSize = "20px";
  
        // La tagline
        const myTag = document.createElement("p");
        myTag.innerText = selectedProfil.tagline;
        myTag.style.color = "#757575";
  
        // Mon bouton
        const theButton = document.querySelector(".contact_button");
        buttonDiv.style.display = "flex";
        buttonDiv.style.alignItems = "center";
  
        // La photo de profil
        const profilPhoto = `../../../Front-End-Fisheye/assets/Sample Photos/Photographers ID Photos/${selectedProfil.portrait}`;
        const myPhoto = document.createElement("img");
        myPhoto.src = profilPhoto;
        myPhoto.style.borderRadius = "50%";
        myPhoto.style.objectFit = "cover";
        myPhoto.style.width = "200px";
        myPhoto.style.height = "200px";
        photoContainer.style.display = "flex";
        photoContainer.style.alignItems = "center";
  
        // Contenu avec les photos
        const photoContenu = document.createElement("div");
        photoContenu.style.display = "flex";
        photoContenu.style.flexWrap = "wrap";
        photoContenu.style.justifyContent = "space-around";
  
        userImages.map((src) => { // Utilisation de map pour itérer sur chaque élément de userImages
          const username = selectedProfil.name.split(" ")[0].replace("-", " ");
          // Utilisation de split pour diviser le nom en un tableau de mots
         // Ensuite, on prend le premier mot (l'index 0) et on remplace les tirets par des espaces
          const baseImagePath = `assets/Sample Photos/${username}/${src.image}`;
          const baseVideoPath = `assets/Sample Photos/${username}/${src.video}`;
          const mediaElement = document.createElement(src.video ? "video" : "img");
          const srcElement = document.createElement("source");
          const description = document.createElement("p");
  
          const photoDiv = document.createElement("div");
          photoDiv.style.height = "200px";
          photoDiv.style.width = "500px";
  
          if (src.video) {
            mediaElement.appendChild(srcElement);
            srcElement.src = baseVideoPath;
            srcElement.type = "video/mp4";
          } else if (src.image) {
            mediaElement.src = baseImagePath;
          }
  
          mediaElement.style.width = "380px";
          mediaElement.style.height = "380px";
          mediaElement.style.marginRight = "10px";
          mediaElement.style.objectFit = "cover";
          mediaElement.style.borderRadius = "10px";
  
          photoDiv.style.width = "450px";
          photoDiv.style.height = "420px";
          photoDiv.style.marginBottom = "20px";
  
          photoContenu.appendChild(mediaElement);
          photoDiv.appendChild(mediaElement);
          photoDiv.appendChild(description);
          photoContenu.appendChild(photoDiv);
  
          description.innerText = src.title;
          description.style.color = "#901C1C";
          description.style.fontSize = "larger";
        });
  
        mainEvent.appendChild(profilUser);
        profilUser.appendChild(profilContainer);
        profilUser.appendChild(buttonDiv);
        profilUser.appendChild(photoContainer);
        profilContainer.appendChild(nameElement);
        buttonDiv.appendChild(theButton);
        profilContainer.appendChild(cityzen);
        profilContainer.appendChild(myTag);
        photoContainer.appendChild(myPhoto);
        mainEvent.appendChild(photoContenu);
  
        console.table(selectedProfil);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement du JSON :", error)
      );
  });
  