function Sale(customer, date = new Date()) {
   if (!(customer instanceof Customer)) {
      throw new Error('Cliente inválido');
   }
   // Propiedades:
   // - id (Date.now())
   // - customer
   // - products (array vacío para iniciar)
   // - total (inicia en 0)
   // - date
   // - status ('pending' | 'completed' | 'cancelled')
   this.id = Date.now();
   this.customer = customer;
   // El products, va a ser todos los productos que mi cliente, quiera comprar
   this.products = [];
   this.total = 0;
   this.date = date;
   this.status = "pending";
}

// Sale.prototype.calculateTotal = function() {
//    this.products.reduce((total, elment)=> total + (elment.product.price * elment.qu))
// };

Sale.prototype.addProduct = function (product, quantity) {
   if (!product.hasStock(quantity)) {
      throw new Error('Stock insuficiente');
   }
   this.products.push({ product, quantity });
};
