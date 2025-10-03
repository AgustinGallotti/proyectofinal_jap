//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProducts(array){
    
    const htmlContentToAppend = array.products.map(prod => {
        localStorage.setItem(`id_${prod.id}`, JSON.stringify(prod));

        return `
        <div class="table d-flex flex-column flex-md-row product-item" id="${prod.id}">
                <div>
                    <img src="${prod.image}" class="tableImg" alt="aa" width="150">
                </div>
                <span class="item"> ${prod.name} </span>
                <span class="item">${prod.description}</span>
                <span class="item">${prod.currency} ${prod.cost}</span>
                <span class="item">${prod.soldCount}</span>
                </div>
                `;
        }).join("");
        console.log(array);
        
        const container = document.getElementById("cat-list-container");
        container.innerHTML = htmlContentToAppend;
        
        //delegar funciones
        container.addEventListener("click", (e) => {
            const item = e.target.closest(".product-item")
            if (item) {
                console.log("id en hover: ", item.id);
                // guardo el seleccionado
                localStorage.setItem("selectedProductId", item.id)
                window.location = "product-info.html";
            }
        })
}


document.addEventListener("DOMContentLoaded", () => {
    if (productID) {
    cargarProductoDestacado(productID);
    getReviews(productID);
    /* cargarRelacionados(productID); funcion sin efecto, a chequear*/
    } else {
    document.getElementById("product-info").innerHTML = "<p>No se seleccionó ningún producto</p>";
    }
});

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showProducts() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    const catID = localStorage.getItem("selectedProductId");

    if (catID) {
        getJSONData(PRODUCTS_URL + catID + ".json").then(function(resultObj){
            if (resultObj.status === "ok") {
                categoriesArray = resultObj.data;
                showProducts(categoriesArray);
            }
            else {
                console.log("url no econtrada")

            }
        }
    )}
});

/* Funciones para los filtros, entrega 3*/

/* Buscador por nombre y descripcion, entrega 3*/

  document.getElementById("searchInput").addEventListener("input", function() {
                let buscar = this.value.toLowerCase();

                let filteredProducts = categoriesArray.products.filter(prod =>
                    prod.name.toLowerCase().includes(buscar) ||
                    prod.description.toLowerCase().includes(buscar)
                );

                showProducts({ products: filteredProducts });
            });

/* Filtro de precio, entrega 3*/

function filtrarPorPrecio() {
    let min = document.getElementById("precio-min").value;
    let max = document.getElementById("precio-max").value;

    min = min ? parseInt(min) : null;
    max = max ? parseInt(max) : null;

    if (min === null && max === null) {
        showProducts(categoriesArray);
        return;
    }

    let filteredProducts = categoriesArray.products.filter(prod => {
        let precio = prod.cost;
        return (min === null || precio >= min) && (max === null || precio <= max);
    });

    showProducts({ products: filteredProducts });
}


function limpiarFiltros() {
    document.getElementById("precio-min").value = "";
    document.getElementById("precio-max").value = "";

    showProducts(categoriesArray);
}

/* Funciones de Ordenamiento, entrega 3*/

document.getElementById("sort-desc").addEventListener("click", () => {
    categoriesArray.products.sort((a, b) => a.cost - b.cost);
    showProducts(categoriesArray);
});

document.getElementById("sort-asc").addEventListener("click", () => {
    categoriesArray.products.sort((a, b) => b.cost - a.cost);
    showProducts(categoriesArray);
});

document.getElementById("sort-relev").addEventListener("click", () => {
    categoriesArray.products.sort((a, b) => b.soldCount - a.soldCount);
    showProducts(categoriesArray);
});
