// Array of objects
let data = [
    {
        name: "Suhaib Ahmmad",
        qid: 123421,
        city: "Dhaka",
        country: "Bangladesh",
        randNum: -90
    },

    {
        name: "Rafi",
        qid: 2341,
        city: "Sylhet",
        country: "Bangladesh",
        randNum: 180
    },

    {
        name: "Mehedi",
        qid: 12312,
        city: "Tangail",
        country: "Bangladesh",
        randNum: 120
    },

];


// Variable to store balance and row/button ID after clicking an event button in table.
var balance ; 
var buttonID;

// Selecting save button, new Customer and show all, button elements.
const save = document.querySelector("#save");
const addCustomer = document.querySelector("#newCustomer");
const showAll = document.querySelector("#showAll");

// Adding an event listner to the selected elments.
addCustomer.addEventListener("click", () => show(true));
showAll.addEventListener("click", () => show(false));
save.addEventListener("click", saveData);



// Function to hide and unhide different div. If flag in true #addCustomer(new customer) div is shown and otherwise #all(table of all customer) div
function show(flag){

    const newDiv = document.querySelector("#addCustomer");
    const all = document.querySelector("#all");
    const discountDiv = document.querySelector("#discount");

    if(flag){

        newDiv.style.display = "inline";
        all.style.display = "none";
        discountDiv.style.display = "none";

    }
    else {
        all.style.display = "inline";
        newDiv.style.display= "none";
        discountDiv.style.display = "none";
        // Calling function to show table
        showTable();
    }
}



// Funtion to save data after new customer form is filled.
function saveData()
{
    // Assigning variable to the input value in new customer form.
    let name = document.querySelector("#name").value;
    let qid = document.querySelector("#QID").value;
    let city = document.querySelector("#city").value;
    let country = document.querySelector("#country").value;

    // For finding a random number between -100 and 100 (included).For more contact.
    let randNum = Math.floor(Math.random()* 201) -100 ;

    // If all the value are not filled, user is alerted to fill all the data.
    if(name=="" || qid=="" || city=="" || country=="" )alert("please fill all the data.");

    // If the given value of qid is already taken,user is alerted to change it.
    else if(data.findIndex((x) => x.qid == qid)!=-1){
        alert("QID already exists");
        document.querySelector("#QID").value = "";
    }

    // Pushing the value as object in data array.
    else
    {
        data.push({name,qid,city,country,randNum});
        document.querySelector("#myForm").reset();
    }
}


function showTable()
{
    // Which row are to highlight, the id are taken in this array.
    let toHighLight =[];

    // Text is table structure data
    let text = "<tr><th>Customer Name</th><th>QID</th><th>Country</th><th>City</th><th>Balance</th><th>Add</th></tr>";


    for(let i=0; i<data.length; i++)
    {
        text += `<tr id='row${i}'>`
        for(var key in data[i]){
            text += `<td>${data[i][key]}</td>`;
            if(key = 'randNum' && data[i][key]<0){
                toHighLight.push(i);
            }
        }

        text += `<td> <img id=${i} class="imgEvents" src="image/add.jpeg" style="display: table-cell; width: 2em;"/></td>`;

        text += "</tr>"
    }


    // Assigning the text structure to html
    document.querySelector("#result").innerHTML = text ; 

    // Highlighting the negative balance
    for(let i=0 ; i<toHighLight.length ; i++)
    {
        let row = document.querySelector(`#row${toHighLight[i]}`);

        row.style["background-color"] = "darkorange";
    }

    addImageEvent();
}


// When the add button is click
function addImageEvent()
{
    const images = document.querySelectorAll(".imgEvents");
    
    for (let elem of images) {
    
    elem.addEventListener("click", function(){
        
        // Hiding the tables and unhide the discount form
        document.querySelector("#all").style.display="none";
        document.querySelector("#discount").style.display="inline";

        // Assigning the name and qid to the input field in discount form. Putting different value by hand
        // won't work at this moment. If asked can add the feature.
        let name = document.querySelector(`#row${elem.id}`).cells[0].innerText;
        let qid = document.querySelector(`#row${elem.id}`).cells[1].innerText;

        document.querySelector("#disName").value = name;
        document.querySelector("#disQid").value = qid;


        balance = document.querySelector(`#row${elem.id}`).cells[4].innerText;

        buttonID = elem.id;

    });
    }
}


// When apply discount button is click
document.querySelector("#disButton").addEventListener("click",function(){
   
    let disValue = document.querySelector("#disVal").value;

    // console.log(disValue);

    if( disValue == "")alert("Please enter discount value.");

    else{

        // Formula to apply the discount
        disValue = parseInt(disValue);
        balance = parseInt(balance);

        balance += Math.abs(balance)*(disValue/100); 

        balance = Math.round(balance);

        // Changing the balance in data array after applying discount
        data[buttonID]["randNum"] = balance;

        // Resetting the value of discount field in discount form.
        document.querySelector("#disVal").value = "";


        // Calling show function to hide the discount form and show the table with updated balance.
        show(false);

        console.log(balance);

    }
})



