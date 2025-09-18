//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    
    const htmlContentToAppend = array.products.map(prod => {
        return `
            <div class="table d-flex flex-column flex-md-row">
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

        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
     
}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    // Obtener el id de categoría desde localStorage
    const catId = localStorage.getItem("catID");

    // Construir la URL dinámica con ese id
    const url = https://japceibal.github.io/emercado-api/cats_products/${catId}.json;

    // Usar url en lugar de LIST_URL
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
});