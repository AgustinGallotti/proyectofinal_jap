//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    
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


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){

    // Usar url en lugar de LIST_URL
    getJSONData(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
        else {
            console.log("url no econtrada")
        }
    });
});