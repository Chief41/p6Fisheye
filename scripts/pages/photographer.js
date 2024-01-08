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
      const selectedProfil = photographers.find(
        (p) => p.id === Number(selectedPhotographerId)
      );

      // Si le profil n'est pas trouvé alors la console retourne aucun photographe sélectionné
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
      const bodyCount = document.querySelector("body");
      const headerBand = document.querySelector("header");

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
      selectTri.style.border = "2px solid #901C1C"; // Ajoutez cette ligne pour la bordure
      selectTri.style.borderRadius = "5px";
      selectTri.style.fontWeight = "bold";
      selectTri.style.color = "white";
      selectTri.style.fontSize = "large";

      btnPoupularity.textContent = "Popularité";
      btnPoupularity.style.fontSize = "large";
      btnPoupularity.style.fontWeight = "bold";
      btnPoupularity.style.color = "white";
      btnPoupularity.style.borderBottom = "2px solid white"; // ligne pour la bordure
      btnPoupularity.style.cursor = "pointer";

      btnDate.textContent = "Date";
      btnDate.style.fontSize = "large";
      btnDate.style.fontWeight = "bold";
      btnDate.style.color = "white";
      btnDate.style.borderBottom = "2px solid white"; // ligne pour la bordure
      btnDate.style.cursor = "pointer";

      btnTitre.textContent = "Titre";
      btnTitre.style.fontSize = "large";
      btnTitre.style.fontWeight = "bold";
      btnTitre.style.color = "white";
      btnTitre.style.borderBottom = "2px solid white"; // ligne pour la bordure
      btnTitre.style.cursor = "pointer";

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

      // Factory pour créer des éléments média
      function createMediaElement(src, photographer) {
        const username = photographer.name.split(" ")[0].replace("-", " ");
        const baseImagePath = `assets/Sample Photos/${username}/${src.image}`;
        const baseVideoPath = `assets/Sample Photos/${username}/${src.video}`;

        const mediaElement = document.createElement(
          src.video ? "video" : "img"
        );
        const srcElement = document.createElement("source");

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
        mediaElement.style.cursor = "pointer";

        //Création de ma lightbox
        const lightBox = document.querySelector(".lightBox");
        const lightBoxNext = document.createElement("img");
        const lightBoxClose = document.createElement("img");
        const lightBoxPrev = document.createElement("img");
        let lightBoxImage;

        lightBox.style.position = "absolute";
        lightBox.style.top = "5%";
        lightBox.style.right = "5";
        lightBox.style.width = "100%";
        lightBox.style.height = "100%";
        lightBox.style.backgroundColor = "white";
        lightBox.style.zIndex = 10;
        lightBox.style.display = "block";

        mediaElement.addEventListener("click", function (e) {
          e.preventDefault()
          lightBoxImage = document.createElement("div");

          
          const srcVideo = document.createElement("source");
          const srcImage = document.createElement("img");
          
          
           if (src.video) {
            lightBoxImage = document.createElement("video");
            srcVideo.src = baseVideoPath;
            srcVideo.type = "video/mp4";
            lightBoxImage.appendChild(srcVideo);
          } else if(src.image){ 
            srcImage.src = baseImagePath;
            lightBoxImage.appendChild(srcImage);
          }

          //dimension de l'image
          lightBoxImage.style.width = "85%";
          lightBoxImage.style.height = "87%";
          lightBoxImage.style.objectFit = "cover";
          lightBoxImage.style.position = "fixed";
          lightBoxImage.style.top = "8%";
          lightBoxImage.style.left = "6%";

          mainEvent.style.display = "none";
          headerBand.style.display = "none";

          lightBoxNext.src =
            "../../../Front-End-Fisheye/assets/icons/chevron.svg";
          lightBoxNext.style.cursor = "pointer";
          lightBoxNext.style.position = "fixed";
          lightBoxNext.style.right = "3.2rem";
          lightBoxNext.style.top = "20rem";

          const photos = Array.from(
            photoContenu.querySelectorAll("img, video")
          );
          console.log(photos)
          let currentIndex = 0;
          console.log(currentIndex);

          lightBoxNext.addEventListener("click", function () {
            currentIndex++;
            if (currentIndex < 0) {
              currentIndex = photos.length + 1;
              
            }
            lightBoxImage.src = photos[currentIndex].src;
          });

          lightBoxClose.src =
            "../../../Front-End-Fisheye/assets/icons/croix.svg";
          lightBoxClose.style.cursor = "pointer";
          lightBoxClose.style.color = "black";
          lightBoxClose.style.position = "fixed";
          lightBoxClose.style.right = "4rem";
          lightBoxClose.style.bottom = "38rem";
          lightBoxClose.addEventListener("click", function () {
            lightBox.style.display = "none";
            mainEvent.style.display = "block";
            headerBand.style.display = "none";
          });

          lightBoxPrev.src =
            "../../../Front-End-Fisheye/assets/icons/prevChevron.svg";
          lightBoxPrev.style.cursor = "pointer";
          lightBoxPrev.style.position = "fixed";
          lightBoxPrev.style.left = "0.5rem";
          lightBoxPrev.style.top = "19.5rem";

          lightBoxPrev.addEventListener("click", function () {
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = photos.length - 1;
            }
            lightBoxImage.src = photos[currentIndex].src;
          });

          bodyCount.appendChild(lightBox);
          lightBox.appendChild(lightBoxImage);
          lightBox.appendChild(lightBoxNext);
          lightBox.appendChild(lightBoxPrev);
          lightBox.appendChild(lightBoxClose);
        });

        return mediaElement;
      }

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
          const mediaElement = createMediaElement(src, selectedProfil);

          const photoDiv = document.createElement("div");
          const description = document.createElement("p");
          const likeNumber = document.createElement("p");
          const boiteALike = document.createElement("div");
          const heartBox = document.createElement("div");
          const heartLike = document.createElement("i");

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
          heartLike.style.fontWeight = "none";

          // Gérer mon block de likes
          const myBody = document.querySelector("body");
          const blockRose = document.createElement("div");
          const totalLike = document.createElement("p");
          for (let i = 0; i < media.likes; i++) {
            totalLike.innerText = media.likes;
            
          }


          blockRose.classList.add("jaimeLeRose");
          blockRose.style.position = "fixed";
          blockRose.style.width = "20%";
          blockRose.style.height = "9%";
          blockRose.style.background = "#DB8876";
          blockRose.style.top = "42rem";
          blockRose.style.left = "72rem";

          heartLike.addEventListener("click", function () {
            heartLike.style.fontWeight = "bold";
          });

          //photoContenu.appendChild(mediaElement);
          photoDiv.appendChild(boiteALike);
          photoDiv.appendChild(mediaElement);
          photoContenu.appendChild(photoDiv);
          heartBox.appendChild(heartLike);
          heartBox.appendChild(likeNumber);
          boiteALike.appendChild(heartBox);
          boiteALike.appendChild(description);
          blockRose.appendChild(totalLike);
          myBody.appendChild(blockRose);
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
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );
});
