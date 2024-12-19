const $formProduct = document.getElementById("product-form")

let productsArray = [];

$formProduct.addEventListener("submit", (event) => {
   // Aca va mi logica para que renderize
   // Tienen que caputarar los valores del formulario
   // Insertar a nuestro arreglo (  new Product ( parametros ))
   // Renderizar 
   event.preventDefault();
   // Capturar los valores del form
   const form = event.target;
   // Crear una instancia
   const product = new Product(form.productName.value, parseFloat(form.productPrice.value), parseInt(form.productStock.value))

   productsArray.push(product);

   // Renderizado
   const list = document.getElementById("products-list");

   list.innerHTML = "";

   productsArray.forEach((element) => {
      list.appendChild(element.renderUI())
   })
   form.reset();
})

