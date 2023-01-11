class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        return this.available = true;
    }
};

class GoodList {
    #goods = [];
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        let filteredList = [];
        for (let index = 0; index < this.#goods.length; index++) {
            if (this.filter.test(this.#goods[index].name) === true) {
                filteredList.push(this.#goods[index]);
                };
            };
        let sortedList = function(a,b) {
            if (this.sortPrice === true) {
                switch (this.sortDir) {
                    case true:
                        return a.price - b.price;
                    case false:
                        return b.price - a.price;
                };
            };
        };
        return filteredList.sort(sortedList.bind(GoodList));
    };
    add(newGood) {
        this.#goods.push(newGood);
        return this.#goods;
    };
    remove(id) {
        let idFound = false;
        this.#goods.forEach((good, index) => {
            if (id === good.id) {
                this.#goods.splice(index, 1);
                idFound = true;
            };
        });
        switch (idFound) {
            case true:
                return this.#goods;
            case false:
                return "Индекс не найден";
        };
    };
};

class BasketGood extends Good {
    constructor(thisGood, amount) {
        super(thisGood.id, thisGood.name, thisGood.description, thisGood.sizes, thisGood.price, thisGood.available);
        this.amount = amount;
    };
};

class Basket {
    constructor() {
        this.goods = [];
    };
    get TotalAmount() {
        let total = this.goods.reduce(function(totalAmount, good) {
            return totalAmount + good.amount * good.price;
        }, 0);
        return total;
    };
    get TotalSum() {
        let total = this.goods.reduce(function(totalSum, good) {
            return totalSum + good.amount;
        }, 0);
        return total;
    };
    add(good, amount) {
        switch(true) {
            case (amount <= 0):
                this.remove(good, amount);
            case (amount > 0):
                let idFound = false;
                for (let index = 0; index < this.goods.length; index++) {
                    if (this.goods[index].id === good.id) {
                        this.goods[index].amount = this.goods[index].amount + amount;
                        idFound = true;
                        break;
                    };
                };
                if (idFound === false) {
                    this.goods.push(good)
                }; 
        };        
    };
    remove(good, amount) {
        let listId = this.goods.map((thisGood) => thisGood.id);
        if (listId.includes(good.id)) {
            for (let index = 0; index < this.goods.length; index++) {
                if (this.goods[index].id === good.id) {
                    this.goods[index].amount = this.goods[index].amount + amount;   
                    };
                if (this.goods[index].amount < 0) {
                    this.goods.splice(index, 1);
                    };
            };
        };
    };
    clear() {
        this.goods.splice(0, this.goods.length);
    };
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true);
        return this.goods;
    }
};


const good1 = new Good (
    1,
    "Футболка мужская однотонная",
    "Цвет: темно-серый",
    ["40", "42", "44", "48", "50", "52", "54"],
    327,
    true,
    );

const good2 = new Good (
    2,
    "Футболка с коротким рукавом",
    "С принтом",
    ["50", "52", "54"],
    2100,
    true
    );

const good3 = new Good (
    3,
    "Брюки карго повседневные",
    "Цвет: черный",
    ["34", "44"],
    607,
    true
    );

const good4 = new Good (
    4,
    "Носки мужские зимние 3 пары",
    "Материал: шерсть",
    ["Один размер"],
    1179,
    false
    );

const good5 = new Good (
    5,
    "Носки с рисунком",
    "Материал: хлопок",
    ["Один размер"],
    185,
    true
    );

const good6 = new Good (
    6,
    "Брюки зимние утепленные",
    "Набивка: пух",
    ["XXl", "3XL", "4XL", "5XL"],
    1151,
    false
    );

const createdGoods = [];
createdGoods.push(good1);
createdGoods.push(good2);
createdGoods.push(good3);
createdGoods.push(good4);
createdGoods.push(good5);

regexp  = /(Брюки|Носки)/i;
const newGoodList = new GoodList(createdGoods, regexp, true, true);

const newBasketGood1 = new BasketGood(good1, 1);
console.log(newBasketGood1);
const newBasketGood2 = new BasketGood(good2, 2);
console.log(newBasketGood2);
const newBasketGood3 = new BasketGood(good3, 3);
console.log(newBasketGood3);
const newBasketGood4 = new BasketGood(good4, 4);
console.log(newBasketGood4);
const newBasketGood5 = new BasketGood(good5, 5);
console.log(newBasketGood5);


const newBasket = new Basket();
console.log(newBasket);

good4.setAvailable();
console.log(good4.available);

console.log(newCatalogue.list);

console.log(newCatalogue.add(good6));

console.log(newCatalogue.remove(undefined));

newBasket.add(newBasketGood1, 4);
console.log(newBasket);

newBasket.add(newBasketGood4, 3);
console.log(newBasket);

newBasket.clear()
console.log(newBasket);

newBasket.removeUnavailable()

amounts = newBasket.TotalAmount

sums = newBasket.TotalSum

console.log(`Общая стоимость:${amounts}`);

console.log(`Общее количество:${sums}`);