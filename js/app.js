const $formProduct = document.getElementById("product-form");
const $formCustomer = document.getElementById("customer-form");
const $btnAddProducts = document.getElementById("addProductToSale")

let productsArray = [];
let customerArray = [];
let currentSale = null;

function handleNewProduct(event) {
   event.preventDefault();
   const form = event.target;
   const product = new Product(
      form.productName.value,
      parseFloat(form.productPrice.value),
      parseInt(form.productStock.value)
   );
   productsArray.push(product);
   const list = document.getElementById("products-list");
   list.innerHTML = "";
   productsArray.forEach(element => list.appendChild(element.renderUI()));
   form.reset();
   updateSalesSelect()
}

function handleNewCustomer(event) {
   event.preventDefault();

   const form = event.target;
   const customer = new Customer(
      form.customerName.value,
      form.customerEmail.value
   );
   customerArray.push(customer);
   const list = document.getElementById("customers-list");
   list.innerHTML = "";
   customerArray.forEach(element => list.appendChild(element.renderUI()));
   form.reset();
   updateSalesSelect()
}

function updateSalesSelect() {
   const saleCustomerSelect = document.getElementById("saleCustomer")
   const saleProductSelect = document.getElementById("saleProduct")

   if (saleCustomerSelect) {
      saleCustomerSelect.innerHTML = `<option value="">Seleccione un cliente</option>`
      for (const customer of customerArray) {
         const option = document.createElement('option')
         option.value = customer.id;
         option.textContent = `${customer.name} ${customer.email}`
         saleCustomerSelect.appendChild(option)
      }
   }

   if (saleProductSelect) {
      saleProductSelect.innerHTML = `<option value="">Seleccione un producto</option>`
      for (const product of productsArray) {
         const option = document.createElement('option')
         option.value = product.id;
         option.textContent = `${product.getProductInfo()}`
         saleProductSelect.appendChild(option)
      }
   }
}

function handleProductToSale() {
   const customerId = parseInt(document.getElementById("saleCustomer").value);
   const productId = parseInt(document.getElementById("saleProduct").value);
   const quantity = parseInt(document.getElementById("saleQuantity").value);

   if (!customerId || !productId || !quantity) {
      return alert("Por favor llena los campos")
   }

   // Buscado al cliente y el producto
   const customer = customerArray.find((elemnt) => elemnt.id === customerId)
   const product = productsArray.find((elemnt) => elemnt.id === productId)

   if (!currentSale) {
      currentSale = new Sale(customer);
   }

   currentSale.addProduct(product, quantity);
   updateSaleProductsList();
   document.getElementById("saleProduct").value = "";
   document.getElementById("saleQuantity").value = "";
}

function updateSaleProductsList() {
   const saleProductsList = document.getElementById("sale-products-list");
   saleProductsList.innerHTML = "";

   if (!currentSale || currentSale.products.length === 0) {
      saleProductsList.innerHTML = "<li class='list-group-item'>No hay productos agregados</li>";
      return;
   }

   for (const item of currentSale.products) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <div>
              <span>${item.product.name}</span>
              <span class="badge bg-primary rounded-pill mx-2">x${item.quantity}</span>
              <span class="text-success">
                  ${item.product.getFormattedPrice()} c/u
              </span>
          </div>
          <button 
              onclick="removeProductFromSale(${item.product.id})" 
              class="btn btn-danger btn-sm">
              Eliminar
          </button>
      `;
      saleProductsList.appendChild(li);
   }
}


$formProduct.addEventListener("submit", handleNewProduct);
$formCustomer.addEventListener("submit", handleNewCustomer);
$btnAddProducts.addEventListener("click", handleProductToSale)