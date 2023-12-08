document.addEventListener("DOMContentLoaded", function () {
  // Récupérer l'ID du photographe depuis le localStorage
  const selectedPhotographerId = localStorage.getItem("selectedPhotographerId");

  // Récupérer les données depuis le fichier JSON

  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // Trouver le photographe avec l'ID correspondant
      const { photographers, media } = data;
        const userImages = media.filter((m) => m.photographerId ===  Number(selectedPhotographerId));
        console.table(userImages)
      const selectedProfil = photographers.find(
        (p) => p.id === Number(selectedPhotographerId)
      );
      // Si le profil n'est pas trouvé alors la console retourne aucun photographe séléctionné
      if (!selectedProfil) {
        console.log("Aucun photographe sélectionné.");
        return; //empêche de lire le reste du code
      }

      // Arboresence
      const mainEvent = document.getElementById("main")
      const profilContainer = document.createElement("div");
      const buttonDiv = document.createElement("div");
      const photoContainer = document.createElement("div");

      // boite de nos 3 éléments photo de profil/Nom/bouton
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
      console.log(selectedProfil.tagline);

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

      // Solution pour intégrer notre video 
      //const imgNotVideo = userImages.filter(v => v.keys("image"))
      //console.log(imgNotVideo)
      userImages.map(src =>{
        
        
        const username = selectedProfil.name.split(" ")[0].replace("-", " ")
        const baseImagePath = `assets/Sample Photos/${username}/${src.image}`
        const baseVideoPath = `assets/Sample Photos/${username}/${src.video}`
        const photoElement = document.createElement("img");
        const videoElement = document.createElement("video");
        let mediaElement;
        
        if (src.video) {
            mediaElement = videoElement;
            mediaElement.src = baseVideoPath;
        }else if (src.image) {
            mediaElement = photoElement;
            mediaElement.src = baseImagePath;
        }

        
        mediaElement.style.display = "flex";
        mediaElement.style.flexWrap = "wrap"
        mediaElement.style.width = "200px";
        mediaElement.style.height = "100%";
        mediaElement.style.marginRight = "10px";
        mainEvent.appendChild(photoContenu);
        mainEvent.style.display = "flex";
        mainEvent.style.flexDirection = "column-reverse";
        mainEvent.style.justifyContent = "space-between";
        photoContenu.appendChild(mediaElement);
      })

      mainEvent.appendChild(profilUser);
      profilUser.appendChild(profilContainer);
      profilUser.appendChild(buttonDiv);
      profilUser.appendChild(photoContainer);
      profilContainer.appendChild(nameElement);
      buttonDiv.appendChild(theButton);
      profilContainer.appendChild(cityzen);
      profilContainer.appendChild(myTag);
      photoContainer.appendChild(myPhoto);
      

      console.table(selectedProfil);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );
});
