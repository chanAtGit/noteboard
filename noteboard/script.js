//website elements
var itemList = document.getElementById("itemList"); //get ItemList
var settingBox = document.getElementById("popup"); //setting box
var addButton = document.getElementById("addButton");
const nullText = document.getElementById('noItemText'); //text when there is no items

//item class
class Item{
    //CONSTRUCTOR
    constructor(name, des, prior){
        this.name = name;
        this.des = des;
        this.prior = prior;
    }
    //ACCESSOR FUNCTIONS
    getName(){
        return this.name;
    }
    getDes(){
        return this.des;
    }
    getPrior(){
        return this.prior;
    }
    //MUTATOR FUNCTIONS
    changeName(name){
        this.name = name;
    }

    changeDes(des){
        this.des = des;
    }

    changePrior(prior){
        this.prior = prior;
    }
}

//initialise 2d array for Items
let items = new Array(3);
for (let i = 0; i<items.length; i++){
    items[i] = new Array();
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function itemSearch(){

}

function itemSet(){
    console.log("Setting item");
    document.getElementById("setting-popup").style.display = "block"; //make popup appear
}

function closeSetBox(){
    let settingBox = document.getElementById("setting-popup"); //get setting box
    let alertTag = document.getElementById("setting-alert");//get alert tag
    document.getElementById("nameInput").value = ''; //clear name box
    document.getElementById("desInput").value = ''; //clear description box
    document.getElementById("priority-select").value = "none"; //revert to default value - low;
    alertTag.innerHTML = ""; //clear alert

    settingBox.style.display = "none"; //make popup disappear
}

function inspectItem(currentNode){
    console.log("Inspecting item");
    document.getElementById("inspect-popup").style.display = "block";
    document.getElementById("inspect-title").innerHTML = currentNode.getName();
    document.getElementById("inspect-prior").innerHTML = currentNode.getPrior().toUpperCase();
    //change priority text color
    if (currentNode.getPrior()=="high"){
        document.getElementById("inspect-prior").style.color = "red";
    } else if (currentNode.getPrior()=="medium"){
        document.getElementById("inspect-prior").style.color = "orange";
    } else if (currentNode.getPrior()=="low"){
        document.getElementById("inspect-prior").style.color = "green";
    }
    document.getElementById("inspect-text").innerHTML = currentNode.getDes();
}

function closeInspectBox(){ //close inspection box
    let inspectBox = document.getElementById("inspect-popup");
    document.getElementById("inspect-title").innerHTML = '';
    document.getElementById("inspect-prior").innerHTML = '';
    document.getElementById("inspect-text").innerHTML = '';
    inspectBox.style.display = "none";
}

function openEditBox(currentNode){
    document.getElementById("edit-popup").style.display = "block"; //make box visible
    //the original attributes is shown
    let oldName = document.getElementById("newNameInput");
    let oldDes = document.getElementById("newDesInput");
    oldName.value = currentNode.getName();
    oldDes.value = currentNode.getDes();
    document.getElementById("new-priority-select").value = currentNode.getPrior();

    //add eventlistener to button
    document.getElementById("editBtn").addEventListener("click", function(){editItem(currentNode);});
}

function editItem(oldNode){
    console.log("Editing item.");
    let newInputName = document.getElementById("newNameInput").value;
    let newInputDes = document.getElementById("newDesInput").value;
    let newInputPrior = document.getElementById("new-priority-select").value;
    let alertTag = document.getElementById("edit-alert");
    if(isEmptyOrSpaces(newInputName)||newInputPrior == "none"){ //if name and description is empty
        alertTag.innerHTML = "MUST type in valid name and priority.";
        return;
    } else{
        deleteItem(oldNode);
    }
    let editNode = new Item(newInputName, newInputDes, newInputPrior); //contruct instance. insert information into new object item
    if (newInputPrior == "low"){
        items[2].push(editNode);
    } else if (newInputPrior == "medium"){
        items[1].push(editNode);
    } else if (newInputPrior == "high"){ //high priority
        items[0].push(editNode);
    } else {
        console.log("Error! Priority invalid.");
    }
    addItemInDisplay(editNode);
    //clear all display and re-display them
    refresh();
    //close edit box
    closeEditBox();
    return;
}

function closeEditBox(){
    document.getElementById("newNameInput").value = '';
    document.getElementById("newDesInput").value = '';
    document.getElementById("new-priority-select").value = "none";
    let alertTag = document.getElementById("edit-alert");
    alertTag.innerHTML = '';
    document.getElementById("edit-popup").style.display = "none";
}

function deleteItem(currentNode){
    //search and delete node in the 2d array
    console.log("Deleting item");
    if (currentNode.getPrior() == "low"){
        for (let i = 0; i < items[2].length; i++){
            if (items[2][i].getName() == currentNode.getName()){
                if (i == 0){
                    items[2].shift();
                } else {
                    items[2].splice(i,1);
                }
                break;
            }
        }
    }
    if (currentNode.getPrior() == "medium"){
        for (let i = 0; i < items[1].length; i++){
            if (items[1][i].getName() == currentNode.getName()){
                if (i == 0){
                    items[1].shift();
                } else {
                    items[1].splice(i,1);
                }
                break;
            }
        }
    }
    if (currentNode.getPrior() == "high"){
        for (let i = 0; i < items[0].length; i++){
            if (items[0][i].getName() == currentNode.getName()){
                if (i == 0){
                    items[0].shift();
                } else {
                    items[0].splice(i,1);
                }
                break;
            }
        }
    }
    refresh();
}

function itemAdd(){
    let inputName = document.getElementById("nameInput").value;
    let inputDes = document.getElementById("desInput").value;
    let inputPrior = document.getElementById("priority-select").value;
    let alertTag = document.getElementById("setting-alert");

    if(isEmptyOrSpaces(inputName)||inputPrior == "none"){ //if name and description is empty
        alertTag.innerHTML = "MUST type in valid name and priority.";
        return;
    }
    let myNode = new Item(inputName, inputDes, inputPrior); //contruct instance. insert information into new object item
    if (inputPrior == "low"){
        items[2].push(myNode);
    } else if (inputPrior == "medium"){
        items[1].push(myNode);
    } else if (inputPrior == "high"){ //high priority
        items[0].push(myNode);
    } else {
        console.log("Error! Priority invalid.");
    }
    closeSetBox();
    //testing in console
    for (let i = 0; i < items.length; ++i){
        for (let j = 0; j < items[i].length; ++j){
            console.log(items[i][j].getName()+" "+items[i][j].getDes()+" "+items[i][j].getPrior());
        }
        console.log('\n');
    }
    addItemInDisplay(myNode);
    return;
}

function clearAllDisplay(){
    console.log("Clearing display");
    const itemBoxes = document.querySelectorAll('.itemBox');

    itemBoxes.forEach(itemBox => {
        itemBox.remove();
    });
}

function refresh(){
    clearAllDisplay();
    for (let row = 0; row < items.length; row++){
        for (let col = 0; col < items[row].length; col++){
            addItemInDisplay(items[row][col]);
        }
    }
    displayItems(); //redundant code. ensure it works.
}

function addItemInDisplay(newNode){
    if (newNode == null){
        console.log("ERROR! Cannot detect new item!");
        return;
    }
    //add name and description to item box
    let newItem = document.createElement("div");
    newItem.className = "itemBox";
    let itemName = document.createElement("h3");
    let itemDes = document.createElement("p");
    itemDes.className= "item-text";
    itemName.innerHTML = newNode.getName();
    itemDes.innerHTML = newNode.getDes();
    newItem.appendChild(itemName);
    newItem.appendChild(itemDes);
    //create the bottom bar
    let lowBar = document.createElement("div");
    lowBar.className = "low-bar";
    //add buttons
    let inspectBtn = document.createElement("button");
    inspectBtn.className = "bar-buttons";
    inspectBtn.id = "inspect-btn";
    inspectBtn.addEventListener("click", function(){inspectItem(newNode);}); //embed function to button

    let editBtn = document.createElement("button");
    editBtn.className = "bar-buttons";
    editBtn.id = "edit-btn";
    editBtn.addEventListener("click", function(){openEditBox(newNode);}); //embed function to button

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "bar-buttons";
    deleteBtn.id = "delete-btn";
    deleteBtn.addEventListener("click", function(){deleteItem(newNode);}); //embed function to button

    //add buttons to lower bar on item
    lowBar.appendChild(inspectBtn);
    lowBar.appendChild(editBtn);
    lowBar.appendChild(deleteBtn);
    newItem.appendChild(lowBar);

    if (newNode.getPrior()=="high"){ // high priority
        newItem.style.borderLeftColor = "red";
        document.getElementById("high").appendChild(newItem); //add item to high div
    } else if (newNode.getPrior() == "medium"){ //medium priority
        newItem.style.borderLeftColor = "orange";
        document.getElementById("medium").appendChild(newItem); //add item to medium div
    } else if (newNode.getPrior() == "low"){ //low priority
        newItem.style.borderLeftColor = "green";
        document.getElementById("low").appendChild(newItem); //add item to low div
    }
    displayItems();  
}

function displayItems(){
    let nullText = document.getElementById('noItemText');
    if (items[0].length != 0 || items[1].length != 0 || items[2].length != 0){ //if items are not empty
        nullText.innerHTML = ""; //clear nullText
    } else{
        nullText.innerHTML = "No item here"; //nullText display
    }  
}

