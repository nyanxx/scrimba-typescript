/**
 * Challenge: Create a Pizza object type. It should include a `name`
 * and a `price` property.
 */

type Pizza = {
  name: string,
  price: number
}

/**
 * Challenge: Add an Order type. It should have `id`, `pizza`, and `status` properties.
 * Look through the code if you need a reminder as to what data types those should be.
 */

type Order = {
  id: number,
  pizza: Pizza, // Nested object type
  status: "ordered" | "completed"
}

const menu: Pizza[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister: number = 100;
let orderQueue: Order[] = [];
let globalID: number = 1;

/**
 * Challenge: teach TS that the pizzaObj is supposed to be a Pizza type.
 * Then like before, look through the code to see if there are any new
 * TS warnings to deal with (😉), and fix those issues
 */

function addNewPizza(obj: Pizza) {
  menu.push(obj);
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

completeOrder(1);
completeOrder(3);

console.log("orderQueue", orderQueue);
