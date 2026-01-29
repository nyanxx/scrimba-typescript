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


function addNewPizza(obj: Pizza): void {
  menu.push(obj);
}

function setMenuId(): number {
  return menu.length + 1
}

function placeOrder(pizzaName: string): Order | undefined {
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

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((obj) => obj.id === orderId);
  if (!order) {
    console.error(`Order with id ${orderId} not found!`)
    return
  }
  order.status = "completed";
  return order;
}

function removePizzaFromQueue(): void {
  orderQueue = orderQueue.filter((obj) => obj.status !== "completed");
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find(obj => obj.name.toLowerCase() === identifier.toLowerCase())
  } else if (typeof identifier === "number") {
    return menu.find(obj => obj.id === identifier)
  } else {
    throw new TypeError("Parameter 'identifier' must be either a string or a number")
  }
}

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

console.log(getPizzaDetail(1))
console.log(getPizzaDetail("chilli"))
console.log(getPizzaDetail(34))
