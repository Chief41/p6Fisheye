document.addEventListener("DOMContentLoaded", function () {
  // Récupérer l'ID du photographe depuis le localStorage
  const selectedPhotographerId = localStorage.getItem("selectedPhotographerId");

  // Récupérer les données depuis le fichier JSON
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // Trouver le photographe avec l'ID correspondant
      const { photographers, media } = data;
      const userImages = media.filter(
        (m) => m.photographerId === Number(selectedPhotographerId)
      );
      console.table(userImages);
      const selectedProfil = photographers.find(
        (p) => p.id === Number(selectedPhotographerId)
      );

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
      const filterBox = document.createElement("div");
      const triButton = document.createElement("p");
      const selectTri = document.createElement("select");
      const btnPoupularity = document.createElement("option");
      const btnDate = document.createElement("option");
      const btnTitre = document.createElement("option");

      // Création des filtres trier par
      filterBox.classList.add("boxFilter");
      filterBox.style.display = "flex";
      filterBox.style.alignItems = "center";

      triButton.innerText = "Trier par";
      triButton.style.fontSize = "larger";
      triButton.style.fontWeight = "bold";
      triButton.style.marginLeft = "80px";

      selectTri.style.marginLeft = "20px";
      selectTri.style.width = "150px";
      selectTri.style.height = "50px";
      selectTri.style.backgroundColor = "#901C1C";
      selectTri.style.border = "#901C1C";
      selectTri.style.borderRadius = "5px";
      selectTri.style.fontWeight = "bold";
      selectTri.style.color = "white";
      selectTri.style.fontSize = "large";

      btnPoupularity.textContent = "Popularité";
      btnPoupularity.style.fontSize = "large";
      btnPoupularity.style.fontWeight = "bold";
      btnPoupularity.style.color = "white";

      btnDate.textContent = "Date";
      btnDate.style.fontSize = "large";
      btnDate.style.fontWeight = "bold";
      btnDate.style.color = "white";
      btnDate.style.borderTop = "2px solid white";

      btnTitre.textContent = "Titre";
      btnTitre.style.fontSize = "large";
      btnTitre.style.fontWeight = "bold";
      btnTitre.style.color = "white";

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

      // Fonction pour mettre à jour les images en fonction du tri
      function updateImages() {
        const sortedImages = userImages.slice(); // Créer une copie du tableau
        if (selectTri.value === "Popularité") {
          sortedImages.sort((a, b) => b.likes - a.likes);
        } else if (selectTri.value === "Date") {
          sortedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (selectTri.value === "Titre") {
          sortedImages.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Effacer le contenu actuel
        photoContenu.innerHTML = "";

        // Recréer les éléments avec les images triées
        sortedImages.forEach((src) => {
          const username = selectedProfil.name
            .split(" ")[0]
            .replace("-", " ");
          const baseImagePath = `assets/Sample Photos/${username}/${src.image}`;
          const baseVideoPath = `assets/Sample Photos/${username}/${src.video}`;
          const mediaElement = document.createElement(
            src.video ? "video" : "img"
          );
          const srcElement = document.createElement("source");
          const photoDiv = document.createElement("div");
          const description = document.createElement("p");
          const likeNumber = document.createElement("p");
          const boiteALike = document.createElement("div");
          const heartBox = document.createElement("div");
          const heartLike = document.createElement("i");

          if (src.video) {
            mediaElement.appendChild(srcElement);
            srcElement.src = baseVideoPath;
            srcElement.type = "video/mp4";
          } else if (src.image) {
            mediaElement.src = baseImagePath;
          }

          mediaElement.style.width = "324px";
          mediaElement.style.height = "328px";
          mediaElement.style.marginLeft = "58px";
          mediaElement.style.objectFit = "cover";
          mediaElement.style.borderRadius = "10px";

          photoDiv.style.width = "450px";
          photoDiv.style.height = "420px";
          photoDiv.style.marginBottom = "20px";
          photoDiv.style.display = "flex";
          photoDiv.style.flexDirection = "column-reverse";

          description.innerText = src.title;
          description.style.color = "#901C1C";
          description.style.fontSize = "larger";
          description.style.marginLeft = "58px";

          boiteALike.style.display = "flex";
          boiteALike.style.flexDirection = "row-reverse";
          boiteALike.style.justifyContent = "space-between";
          boiteALike.style.marginRight = "95px";

          heartBox.style.display = "flex";
          heartBox.style.flexDirection = "row-reverse";
          heartBox.style.justifyContent = "space-around";
          heartBox.style.alignItems = "center";
          heartBox.style.marginRight = "-25px";

          likeNumber.style.color = "#901C1C";
          likeNumber.innerText = src.likes;

          heartLike.classList.add("fa-regular", "fa-heart");
          heartLike.style.color = "#901C1C";
          heartLike.style.fontSize = "x-large";
          heartLike.style.marginLeft = "5px";
          heartLike.style.fontWeight = "bold";

          photoContenu.appendChild(mediaElement);
          photoDiv.appendChild(boiteALike);
          photoDiv.appendChild(mediaElement);
          photoContenu.appendChild(photoDiv);
          heartBox.appendChild(heartLike);
          heartBox.appendChild(likeNumber);
          boiteALike.appendChild(heartBox);
          boiteALike.appendChild(description);
        });
      }

      // Ajouter l'événement pour mettre à jour les images lors du changement de tri
      selectTri.addEventListener("change", updateImages);

      // Initialiser les images
      updateImages();

      mainEvent.appendChild(profilUser);
      profilUser.appendChild(profilContainer);
      profilUser.appendChild(buttonDiv);
      profilUser.appendChild(photoContainer);
      profilContainer.appendChild(nameElement);
      buttonDiv.appendChild(theButton);
      profilContainer.appendChild(cityzen);
      mainEvent.appendChild(filterBox);
      filterBox.appendChild(triButton);
      filterBox.appendChild(selectTri);
      selectTri.appendChild(btnPoupularity);
      selectTri.appendChild(btnDate);
      selectTri.appendChild(btnTitre);
      profilContainer.appendChild(myTag);
      photoContainer.appendChild(myPhoto);
      mainEvent.appendChild(photoContenu);

      console.table(selectedProfil);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );

  // Gérer mon block de likes
  const myBody = document.querySelector("body");
  const blockRose = document.createElement("div");
  blockRose.classList.add("jaimeLeRose");
  myBody.appendChild(blockRose);

  blockRose.style.background = "#DB8876";
  blockRose.style.width = "15%";
  blockRose.style.height = "33px";
  blockRose.style.position = "absolute";
  blockRose.style.bottom = "5%";
  blockRose.style.right = "5%";
  blockRose.style.zIndex = "999"; // Mettre le bloc au-dessus des autres éléments
  myBody.style.zIndex = "1";

  // événements de défilement
  window.addEventListener("scroll", function () {
    // Obtenir la position de défilement actuelle
    const scrollPosition = window.scrollX;

    // Régler la position du bloc en fonction de la position de défilement
    blockRose.style.bottom = 1 + scrollPosition + "px";
  });
});
