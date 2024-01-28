// ^===========> HTML Elements
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

// &===========> App Variables
let submitBtn;

// ?===========> Functions
//side-nav-menu 
let boxWidth = $(".nav-tab").innerWidth();
$(".side-nav-menu").animate({left:-boxWidth},250);
$(".side-nav-menu i.open-close-icon").click(function(){
    let boxWidth = $(".nav-tab").innerWidth();
    let offsetLeft = $(".side-nav-menu").offset().left;
    if(offsetLeft === 0){
        $(".side-nav-menu").animate({left:-boxWidth},500);

        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");

        $(".links li").animate({top:300},500);    
    }
    else{
        $(".side-nav-menu").animate({left:0},500);

        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
    
        for(let i=0; i<5; i++){
            $(".links li").eq(i).animate({top:0},(i+5)*100);
        }
    }
});

//get meals
async function getMeals(value){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    let data = await response.json();
    //console.log(data.meals);
    displayMeals(data.meals);
}

//display meals
function displayMeals(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden">
                    <img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}
getMeals("");

//get categories
async function getCategories(){
    searchContainer.innerHTML ="";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    //console.log(data.categories);
    displayCategories(data.categories);
}

//function display Categories
function displayCategories(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden cursor-pointer rounded-2d">
                    <img class="w-100 rounded-3" src="${data[i].strCategoryThumb}" alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

//get areas
async function getAreas(){
    searchContainer.innerHTML ="";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    //console.log(data.meals);
    displayAreas(data.meals);
}

//display Areas
function displayAreas(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-4">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="meal position-relative overflow-hidden cursor-pointer rounded-2 text-center pt-2  area">
                <img class="icon" src="imgs/flags_9365887.png" alt="" srcset="">                    
                    <h3>${data[i].strArea}</h3>                   
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

//get Ingredients
async function getIngredients(){
    searchContainer.innerHTML ="";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    //console.log(data);
    displayIngredients(data.meals.slice(0,20));
}

//display Ingredients
function displayIngredients(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="meal position-relative overflow-hidden cursor-pointer rounded-2 text-center">
                    <img class="icon" src="imgs/minced-meat_11590775.png" alt="" srcset="">
                    <h3>${data[i].strIngredient}</h3>
                    <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</P>                   
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

//get categories meals
async function getCategoryMeals(category){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    //console.log(data);
    displayMeals(data.meals)
}

//get areas meals
async function getAreaMeals(area){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    //console.log(data);
    displayMeals(data.meals.slice(0,15))
}

//get Ingredients meals
async function getIngredientsMeals(ingredients){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let data = await response.json();
    console.log(data);
    displayMeals(data.meals.slice(0,15))
}
//get Meal details
async function getMealDetails(mealID){
    searchContainer.innerHTML ="";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await response.json();
    //console.log(data.meals[0]);
    displayMealDetails(data.meals[0]);
}

//display Meal details
function displayMealDetails(meal){
        cartoona = `
        <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                
            </ul>
            <a  href="${meal.strSource}" class="btn btn-success " target="_blank">Source</a>
            <a  href="${meal.strYoutube}" class="btn btn-danger youtube" target="_blank">Youtube</a>
        </div>
        `    
    rowData.innerHTML = cartoona;
}

//search
function showSearchInputs(){
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="search form-control bg-transparent text-black" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="search form-control bg-transparent text-black" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML = "";
}

//search
async function searchByName(value){
    //console.log(value);
    value == "" ? value = "chicken" : "";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    let data = await response.json();
    //console.log(data);
    data.meals ? displayMeals(data.meals) : displayMeals([]);
}

//searchByFLetter
async function searchByFLetter(value){
    //console.log(value);
    value == "" ? value = "c" : "";
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    let data = await response.json();
    //console.log(data);
    data.meals ? displayMeals(data.meals) : displayMeals([]);
}

//contactsUs
function contactsUs(){
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="w-25 btn btn-outline-danger px-2 mt-5">Submit</button>
        </div>
    </div>
    `
    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })
    
    document.getElementById("emailInput").addEventListener("focus",function(){
        emailInputTouched = true
    })
    
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })
    
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function inputsValidation() {

    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputTouched) {
        
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");           
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
    //console.log("yes");
} else {
    submitBtn.setAttribute("disabled", true)
}
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

//loader
$(window).ready(function(){
    $(".spinner").fadeOut(1500,function(){
        $("#loader").remove();
        $("body").css({"overflow":"auto"});
    })
})
