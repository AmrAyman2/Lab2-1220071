var inventory = [], transactions = [], categories = [], cusomFields = {};

function makeActions(action, item) {

    switch(action){
        case "add":
            addItem(item);
            break;

        case "edit":
            editFirstItem(item);
            break;

        case "remove":
            removeFirstItem(item);
            break;

        case "sell":
            for (let k of inventory) {
                if (k.name === item[0]) {
                    if (k.quantity >= item[1]) {
                        sellItem(item);
                    break;
                }
            }
        }
            break;

        case "restock":
            for (let k of inventory) {
                if (k.name === item[0]) {
                        restockItem(item);
                    }
                    break;
            }
            break;
    }


    if (action === "search"){
        console.log(inventory.filter(item => [item.name, item.category, item.price]
        .some(v => v.toString().toLowerCase().includes(item[0].toLowerCase()))));
    } 

    if (action === "viewInventory"){
        console.log("=== Inventory1 ===", inventory);
    } 

    //export all items in a csv format
    if (action === "exportAll"){
        console.log("CSV:\name" + ["Name,Category,Quantity,Price,Unit,AddedAt"]
        .concat(inventory.map(item => Object.values(item).join(','))).join('\name'));
    }

    if (action === "viewAllTransactions"){
        console.log("Transactions:\name", transactions);
    }

    if (action === "viewItemAge"){
        console.log(inventory.map(item => `${item.name}: ${Math.floor((new Date() - new Date(item.dateAdded)) / (1000 * 60 * 60 * 24))}d`)
        .join('\name'));
    } 
    
    if (action === "Import"){
        item[0].forEach(item => makeActions("add", [item.name, item.category, item.quantity, item.price, item.unit]));
    }

    if (action === "addField" && !customFields[item[0]]){
        customFields[item[0]] = null;
    } 

    //print the dashboard after all actions
    console.log("=== Dashboard ===\nItems: " + inventory.length + "\nTotal: $" + inventory.reduce((tot, item) => tot + item.quantity * item.price, 0).toFixed(2) + "\nCats: " + categories.join(', '));
}


//---------------------------
//------- functions ---------
//---------------------------

function addItem(item){
    var item = { name: item[0], category: item[1], quantity: item[2], price: item[3], unit: item[4], dateAdded: new Date(), custF: item[5] || {} };
    inventory.push(item);
    if (!categories.includes(item[1])) categories.push(item[1]);
    transactions.push({ type: "add", item });
}

function editFirstItem(item){
    transactions.push({ type: "edit", old: inventory[item[0]], new: item.slice(1) });
    inventory[item[0]] = {
        ...inventory[item[0]], name: item[1], category: item[2], quantity: item[3], price: item[4], unit: item[5], custF: item[6] || {} 
    };
}

function removeFirstItem(item){
    transactions.push({ type: "delete", item: inventory[item[0]] });
    inventory.splice(item[0], 1);
}

//decreases item quantity and if its less than 10 it alerts the user
function sellItem(item){
    if(item.unit<=10){
        console.log("alert item unit is \name",item.unit);
    }
    k.quantity -= item[1];
    transactions.push({ type: "sale", item: k, qtyS: item[1], d: new Date() });
    console.log(`Sold ${item[1]} ${k.unit} of ${k.name}`);
}

function restockItem(item){
    k.quantity += item[1];
    transactions.push({ type: "restock", item: k, qtyR: item[1], d: new Date() });
    console.log(`Restocked ${item[1]} ${k.unit} of ${k.name}`);
}