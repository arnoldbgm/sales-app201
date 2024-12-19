const $formProduct = document.getElementById("product-form")
const $formCustomer = document.getElementById("customer-form")

let productsArray = [];
let customerArray = [];

function handleNewProduct(event) {
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
}

function handleNewCustomer(event) {
   event.preventDefault();
   const form = event.target
   const customer = new Customer(form.customerName.value, form.customerEmail.value)
   customerArray.push(customer)

   // Renderizado
   const list = document.getElementById("customers-list");
   list.innerHTML = "";
   customerArray.forEach((element)=> {
      list.appendChild(element.renderUI())
   })
   form.reset();
}

function actualizarCorreo() {

}


// Sus addEventListener Tiene que ir al final
$formProduct.addEventListener("submit", handleNewProduct )
$formCustomer.addEventListener("submit", handleNewCustomer)