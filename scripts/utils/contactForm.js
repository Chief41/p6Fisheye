// DOM Elements


function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

}

// Arboresence du formulaire
const modal = document.getElementById("contact_modal");
const myForm = document.querySelector("form");
const divSansNom = document.querySelector("form > div");

modal.style.position = "absolute";
modal.style.top = '6rem';
modal.style.left = '8rem';
modal.style.width = '80%';

const labelNom = document.createElement('label');
const inputNom = document.createElement('input');
labelNom.innerHTML = "Nom";

const labelMail = document.createElement('label');
const inputMail = document.createElement('input');
labelMail.innerHTML = 'Email';

const comLabel = document.createElement('label');
const comPut = document.createElement('input');
comPut.style.height = '170px';
comLabel.innerHTML = "Message";

// éléments parents
divSansNom.appendChild(labelNom);
divSansNom.appendChild(inputNom);
divSansNom.appendChild(labelMail);
divSansNom.appendChild(inputMail);
divSansNom.appendChild(comLabel);
divSansNom.appendChild(comPut);