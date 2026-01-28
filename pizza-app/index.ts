// Static values
const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];
// console.log(`Initial menu: ${menu}`); // Why this don't work?
// console.log(`Initial menu:`, menu);
const cashInRegister = 100;
// console.log(`Initial cash: ${cashInRegister}`);
const orderQueue = [];
// console.log(`Initial order queue: ${orderQueue}`);
const globalID = 1;

/**
 * Challenge: Add a utility function "addNewPizza" that takes a pizza object
 * and adds it to the menu.
 */

// addNewPizza({ name: "jony", price: 5 });
function addNewPizza(obj) {
  menu.push(obj);
  //   console.log(`${obj.name} pizza added to menu!`);
}

/** addNewPizza(name: string, price: number) */
// function addNewPizza(name, price) {
//   menu.push({ name: name, price: price });
//   console.log(`${name} pizza added to menu!`);
// }

/**
 * Write another utility function, placeOrder, that takes a pizza name parameter and:
 * 1. finds that pizza object in the menu,
 * 2. adds the income to the cashInRegister,
 * 3. pushes a new "order object" to the orderQueue
 *    (e.g. { pizza: selectedPizzaObjectFromStep1, status: "ordered" })
 * 4. returns the new order object (just in case we need it later)
 */

function placeOrder(pizzaName) {
  const pizzaOrdered = menu.find((obj) => obj.name === pizzaName);
  // console.log("Pizza ordered:", pizzaOrdered);
  cashInRegister = cashInRegister + pizzaOrdered.price;
  // console.log(`Updated cash: ${cashInRegister}`);
  const newOrder = { id: globalID++, pizza: pizzaOrdered, status: "ordered" };
  orderQueue.push(newOrder);
  // console.log(`Updated order queue:`, orderQueue);
  return;
}

/**
 * Challenge: write another utility function, completeOrder, that takes an orderId as a parameter
 * finds the correct order in the orderQueue, and marks its status as "completed". For good measure,
 * return the found order from the function.
 *
 * Note: you'll need to ensure that we're adding IDs to our orders when we create new
 * orders. You can use a global `nextOrderId` variable and increment it every time a new order
 * is created to simulate real IDs being managed for us by a database.
 */

function completeOrder(orderId) {
  const order = orderQueue.find((obj) => obj.id === orderId);
  order.status = "completed";
  // console.log(order);
  return order;
}

function removePizzaFromQueue() {
  // remove every thing that is completed
  orderQueue = orderQueue.filter((obj) => obj.status !== "completed");
}

console.log("cashInRegister:", cashInRegister);

addNewPizza({ name: "Chicken", price: 8 });
addNewPizza({ name: "Chilli", price: 5 });
addNewPizza({ name: "Paner", price: 6 });
console.log("menu", menu);

placeOrder("Veggie");
placeOrder("Chilli");
placeOrder("Pepperoni");

console.log("orderQueue", orderQueue);

console.log("cashInRegister:", cashInRegister);

completeOrder("1");
completeOrder(3);

console.log("orderQueue", orderQueue);
