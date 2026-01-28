// Static values
const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];
// console.log(`Initial menu: ${JSON.stringify(menu, null, 2)}`);
let cashInRegister: number = 100;
let orderQueue: { id: number, pizza: object, status: string }[] = [];
let globalID: number = 1;


function addNewPizza(obj: { name: string, price: number }) {
  menu.push(obj);
  //   console.log(`${obj.name} pizza added to menu!`);
}

/** addNewPizza(name: string, price: number) */
// function addNewPizza(name: string, price: number) {
// menu.push({ name: name, price: price });
//   console.log(`${name} pizza added to menu!`);
// }


function placeOrder(pizzaName: string) {
  const pizzaOrdered = menu.find((obj) => obj.name === pizzaName);
  if (!pizzaOrdered) {
    console.log(`${pizzaName} not found! can't place the order.`)
    return
  }
  cashInRegister = cashInRegister + pizzaOrdered.price;
  const newOrder: { id: number, pizza: object, status: string } = { id: globalID++, pizza: pizzaOrdered, status: "ordered" };
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
