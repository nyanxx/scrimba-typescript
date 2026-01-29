type Pizza = {
  id: number
  name: string,
  price: number
}

type Order = {
  id: number,
  pizza: Pizza,
  status: "ordered" | "completed"
}

let cashInRegister = 100;
let orderQueue: Order[] = [];
let globalOrderId = 1;
let globalPizzaId = 1;

const menu: Pizza[] = [
  { id: globalPizzaId++, name: "Margherita", price: 8 },
  { id: globalPizzaId++, name: "Pepperoni", price: 10 },
  { id: globalPizzaId++, name: "Hawaiian", price: 10 },
  { id: globalPizzaId++, name: "Veggie", price: 9 },
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = { id: globalPizzaId++, ...pizzaObj }
  menu.push(newPizza);
  return newPizza
}

function placeOrder(pizzaName: string): Order | undefined {
  const pizzaOrdered = menu.find((obj) => obj.name === pizzaName);
  if (!pizzaOrdered) {
    console.log(`${pizzaName} not found! can't place the order.`)
    return
  }
  cashInRegister = cashInRegister + pizzaOrdered.price;
  const newOrder: Order = { id: globalOrderId++, pizza: pizzaOrdered, status: "ordered" };
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

addNewPizza({ name: "Chicken", price: 8 });
addNewPizza({ name: "Chilli", price: 5 });
addNewPizza({ name: "Paner", price: 6 });

placeOrder("Veggie");
placeOrder("Chilli");
placeOrder("Pepperoni");

completeOrder(1);
completeOrder(3);

console.log("Cash In Register:", cashInRegister);
console.log("Menu:", menu);
console.log("Order Queue: ", orderQueue);
console.log(getPizzaDetail(7))
console.log(getPizzaDetail("chilli"))