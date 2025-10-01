
function renderRelacionados(selectedProductId) {
  const relacionadosContainer = document.getElementById("relacionados");
  relacionadosContainer.innerHTML = ""; // limpia el contenido 

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("id_")) {
      const prod = JSON.parse(localStorage.getItem(key));

      // mira, aca se evita que se repita, porque no va que se vea el mismo fitito
      if (prod.id != selectedProductId) {
        const item = document.createElement("div");
        item.classList.add("relacionados");

        item.innerHTML = `
          <img class="imgRelacionadosDOM" src="${prod.image}" alt="${prod.name}">
          <p>${prod.name}</p>
          <p><strong>${prod.currency} ${prod.cost}</strong></p>`;

        // o3o/ esto es lo que altera el link, realmente en el caso de los productos es mejor manejarlo con get, porque asi la url es visible y compartible, pero post tambien es valido para enviar. 
        item.addEventListener("click", () => {
          localStorage.setItem("selectedProductId", prod.id);
          location.reload(); // refresh de la pagina con el nuevo id
        });

        relacionadosContainer.appendChild(item);
      }
    }
  }
}

// Con esto se ejecuta, fijate que obtiene el id 
document.addEventListener("DOMContentLoaded", () => {
  const productID = localStorage.getItem("selectedProductId");
  if (productID) {
    renderRelacionados(productID);
  }
});


