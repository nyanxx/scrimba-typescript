type Pizza = {
  id: number
  name: string,
  price: number
}

type Order = {
  id: number,
  pizza: Pizza, // Nested object type
  status: "ordered" | "completed"
}

const menu: Pizza[] = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "Hawaiian", price: 10 },
  { id: 4, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let orderQueue: Order[] = [];
let globalID = 1;


function addNewPizza(obj: Pizza) {
  menu.push(obj);
}

function setMenuId() {
  return menu.length + 1
}

function placeOrder(pizzaName: string) {
  const pizzaOrdered = menu.find((obj) => obj.name === pizzaName);
  if (!pizzaOrdered) {
    console.log(`${pizzaName} not found! can't place the order.`)
    return
  }
  cashInRegister = cashInRegister + pizzaOrdered.price;
  const newOrder: Order = { id: globalID++, pizza: pizzaOrdered, status: "ordered" };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((obj) => obj.id === orderId);
  if (!order) {
    console.error(`Order with id ${orderId} not found!`)
    return
  }
  order.status = "completed";
  return order;
}

function removePizzaFromQueue() {
  orderQueue = orderQueue.filter((obj) => obj.status !== "completed");
}


/**
 * Challenge: create a new utility function called getPizzaDetail. It will take
 * a parameter called `identifier`, but there's a twist: we want this identifier
 * to be allowed to either be the string name of the pizza (e.g. "Pepperoni"),
 * OR to be the number ID of the pizza (e.g. 2).
 * 
 * Don't worry about the code inside the function yet, just create the function
 * signature, making sure to teach TS that the `identifier` parameter is allowed
 * to either be a string or a number.
 */


function getPizzaDetail(identifier: string | number) {
  /**
  * Challenge: write the code to check if the parameter is a string
  * or a number, and use the menu.find() method accordingly
  */
  // let pizzaDetail;
  if (typeof identifier === "string") {
    return menu.find(obj => obj.name.toLowerCase() === identifier.toLowerCase())
  } else if (typeof identifier === "number") {
    return menu.find(obj => obj.id === identifier)
  } else {
    throw new TypeError("Parameter 'identifier' must be either a string or a number")
  }
  // if (!pizzaDetail) {
  //   console.error(`Pizza not found with ${(typeof identifier === "string" ? "name" : "id")} "${identifier}"`)
  //   return
  // }
  // return pizzaDetail
}
console.log(getPizzaDetail(1))

// console.log("cashInRegister:", cashInRegister);

addNewPizza({ id: setMenuId(), name: "Chicken", price: 8 });
addNewPizza({ id: setMenuId(), name: "Chilli", price: 5 });
addNewPizza({ id: setMenuId(), name: "Paner", price: 6 });
// console.log("menu", menu);

placeOrder("Veggie");
placeOrder("Chilli");
placeOrder("Pepperoni");

// console.log("orderQueue", orderQueue);
// console.log("cashInRegister:", cashInRegister);

completeOrder(1);
completeOrder(3);

// console.log("orderQueue", orderQueue);

getPizzaDetail(1)
getPizzaDetail("Chilli")
// getPizzaDetail(34)
