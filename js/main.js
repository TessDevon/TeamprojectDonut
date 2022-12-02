

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Donut cards -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*const { doc } = require("prettier");*/

/*------------------------ Alla munkar på sidan -------------------------------*/

const donutCardsContainer = document.querySelector('#donutCards');       
const basketDonuts = document.querySelector('#basketDonuts');                
const totalPriceBasket = document.querySelector('#totalAmountBasket');      
const shipping = document.querySelector('#shippingPrice');                  

// Sidans varor, 10 munkar
const donutCards = [                                                        
{
    donutTitle: 'Apelsinmunk',
    donutImg1: './images/apelsinmunk.jpg',
    donutImg2: './images/apelsinmunk2.jpg',
    donutAlt: 'En munk med apelsin smak. Den har vit glasyr med orangea ränder.',
    donutPrice: 15,
    amount: 0,
    category: 'frukt',
    rating: 4,
    index: 0
}, {
    donutTitle: 'Banana surprise',
    donutImg1: './images/banansuprice.jpg',
    donutImg2: './images/banansuprice2.jpg',
    donutAlt: 'En munk med banansmak. Den är brun med gul glasyr.',
    donutPrice: 20,
    amount: 0,
    category: 'frukt',
    rating: 5,
    index: 1
},{
    donutTitle: 'Blåbär',
    donutImg1: './images/blueberry.jpg',
    donutImg2: './images/blueberry2.jpg',
    donutAlt: 'En munk med blåbärssmak. Den har rosa glasyr med rosa lila strössel på.',
    donutPrice: 15,
    amount: 0,
    category: 'bär',
    rating: 3,
    index: 2
},{
    donutTitle: 'Karamellchoklad',
    donutImg1: './images/caramellchoklad.jpg',
    donutImg2: './images/caramellchoklad2.jpg',
    donutAlt: 'En munk med karamellchoklad smak. Den har beige glasyr med stringlad choklad på. Den har även brunt strössel.',
    donutPrice: 18,
    amount: 0,
    category: 'godis',
    rating: 4,
    index: 3
},{
    donutTitle: 'Chunky monkey',
    donutImg1: './images/chunkymonkey.jpg',
    donutImg2: './images/chunkymonkey2.jpg',
    donutAlt: 'En munk med Chunky munky smak. Den har brun glasyr med brunt strössel på.',
    donutPrice: 25,
    amount: 0,
    category: 'godis',
    rating: 5,
    index: 4
},{
    donutTitle: 'Citronfromage',
    donutImg1: './images/citronfromage.jpg',
    donutImg2: './images/citronfromage2.jpg',
    donutAlt: 'En munk med citron smak. Den har vit glasyr med strössel på i färgerna gul, orange och rosa.',
    donutPrice: 18,
    amount: 0,
    category: 'frukt',
    rating: 3,
    index: 5
},{
    donutTitle: 'Hallon-choklad',
    donutImg1: './images/hallonchoklad.jpg',
    donutImg2: './images/hallonchoklad2.jpg',
    donutAlt: 'En munk med citron, hallon och choklad smak. Den är täckt av choklad med hallon strössel på.',
    donutPrice: 20,
    amount: 0,
    category: 'bär',
    rating: 4,
    index: 6
},{
    donutTitle: 'Jordgubbsdröm',
    donutImg1: './images/strawberrydream.jpg',
    donutImg2: './images/strawberrydream2.jpg',
    donutAlt: 'En munk med jordgubbs smak. Den har röd glasyr med vitt strössel på.',
    donutPrice: 15,
    amount: 0,
    category: 'bär',
    rating: 5,
    index: 7
},{
    donutTitle: 'Lakrits',
    donutImg1: './images/lakrits.jpg',
    donutImg2: './images/lakrits2.jpg',
    donutAlt: 'En munk med laktris smak. Den har vit glasyr lakrits bitar på.',
    donutPrice: 15,
    amount: 0,
    category: 'godis',
    rating: 2,
    index: 8
},{
    donutTitle: 'Mandelknäck',
    donutImg1: './images/caramell.jpg',
    donutImg2: './images/caramell2.jpg',
    donutAlt: 'En munk med mandel och knäck smak. Den har brun glasyr med bitar av knäck på.',
    donutPrice: 15,
    amount: 0,
    category: 'godis',
    rating: 4,
    index: 9
}];

//Uppdaterar priset på munkarna med 15 % om det är mellan fre kl 15:00 och mån kl 03:00
for(let i = 0; i < donutCards.length; i++){

    let today = new Date();  

    if(((today.getDay() == 5 && today.getHours() >= 15) || (today.getDay() > 5 || today.getDay() <= 1)) && ((today.getDay() == 1 && today.getHours() <= 2) || (today.getDay() < 1 || today.getDay() >= 5))) {
        (donutCards[i].donutPrice *= 1.15);
    }

    donutCards[i].donutPrice  = Math.round(donutCards[i].donutPrice);
}

/*---------------------------------------------Munksortering------------------------------------------*/

// 2 arraykopior av donutCards
let filterProducts = [...donutCards];
let filterProductsInPriceRange = [...donutCards];

const sortBtns = document.querySelectorAll('.ourDonutsDropdown input[type="radio"]');

for(let i = 0; i < sortBtns.length; i++){
    sortBtns[i].addEventListener('click', clickedSortBtn);
} 

createDonuts();                                                                         // Skriver ut munkarna från start

// Sorterar munkarna beroende på vald knapp
function clickedSortBtn(e){ 
    filterProducts = [...donutCards];                                                   //Ny array som kommer att sorteras
    const clickedBtn = e.currentTarget.id;
    
    if(clickedBtn == 'name' || clickedBtn == 'all'){
        filterProducts.sort((a, b) => a.donutTitle.localeCompare(b.donutTitle));
    } else if (clickedBtn == 'rating'){
        filterProducts.sort((a, b) => a.rating - b.rating);
    } else if(clickedBtn == 'lowPrice'){
        filterProducts.sort((a, b) => a.donutPrice - b.donutPrice);
    } else if(clickedBtn == 'highPrice'){
        filterProducts.sort((a, b) => b.donutPrice - a.donutPrice);
    } else if(clickedBtn == 'fruit'){
        filterProducts = filterProducts.filter(donutCard => donutCard.category === 'frukt');
    } else if(clickedBtn == 'berrys'){
        filterProducts = filterProducts.filter(donutCard => donutCard.category === 'bär');
    } else if(clickedBtn == 'candy'){
        filterProducts = filterProducts.filter(donutCard => donutCard.category === 'godis');
    }

    createDonuts();                                                                     // Skriver ut den sorterade arrayen
}

/*-------------------------------------Filtrering på pris------------------------------------------*/

const priceRangeSlider = document.querySelector('#priceRange'); 
const currentRangeValue = document.querySelector('#currentRangeValue');

priceRangeSlider.addEventListener('input', update);

//Gör att värdet på den rosa texten är samma som värdet på slidern, samt skapar en array efter prisklass
function update(e){

    //Värdet på den rosa texten är samma som värdet i slidern
    const priceRangeValue = e.currentTarget.value;                                // värdet i slidern

    currentRangeValue.innerHTML =
    `<span>${priceRangeValue} kr</span>`;                                           

    
    filterProductsInPriceRange = [...donutCards];                                //En kopierad array som kommer innehålla de donuts som ingår i prisspannet

    filterProductsInPriceRange = filterProductsInPriceRange.filter(product => product.donutPrice <= priceRangeValue);    // Lägger in munkar som ingår i spannet i arrayen
    createDonuts();                                                             // Skriver ut arrayen med rätt munkar
}

// Skickar in munkkorten till vår html-struktur, samt rating
function createDonuts(){

    donutCardsContainer.innerHTML = '';
    let filterProductsArrays = filterProducts.filter(value => filterProductsInPriceRange.includes(value)); // Lägger ihop de två arraykopiorna, värdet som ingår i båda sparas i en ny array
    
    // Skriver ut rating på munkkorten
    for(let i = 0; i < filterProductsArrays.length; i++){ 

        let rating = '';

        for(let j = 0; j < 5; j++){

            if (j < filterProductsArrays[i].rating){
                rating += '<span class="fa fa-star checked"></span>';
            } else{
                rating += '<span class="fa fa-star"></span>';
            }
        }
        
        // Lägger till munkarna på sidan
        donutCardsContainer.innerHTML +=
            `<article class="donutCard">
                <div class="donutCardHeaderContainer">
                    <h3>${filterProductsArrays[i].donutTitle}</h3 id="donutCardHeader">
                </div>
                <section class="donutCardContainer">
                    <div class="donutCardImgContainer">
                        <div class="controlsImgSlideshow" id="controlsImgSlideshow">
                            <div class="images">
                                <img src="${filterProductsArrays[i].donutImg1}" alt="${filterProductsArrays[i].donutAlt}" class="donutCardImg1" id="donutcardImg1" width="170" height="160">
                                <img src="${filterProductsArrays[i].donutImg2}" alt="${filterProductsArrays[i].donutAlt}" class="donutCardImg2" id="donutCardImg2" width="170" height="160">                                 
                            </div>
                            <span class="ratingClass" id="ratingId">${rating}</span>
                            <div class="controls">
                                <button class="left" id="prevImage">
                                    <span class="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button class="right" id="nextImage">
                                    <span class="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                        <p id="donutCardPrice">${filterProductsArrays[i].donutPrice} kr/st</p>
                    </div>
                    <div class='donutCardRating'></div>
                    <br>
                    <div class="donutCardButtonContainer">
                        <button data-operator="minus" data-id="${filterProductsArrays[i].index}">-</button>
                        <input type="number" value="0" data-operator="amount" data-id="${filterProductsArrays[i].index}">
                        <button data-operator="plus" data-id="${filterProductsArrays[i].index}">+</button>
                    </div>
                </section>
            </article>`;
    
        // Skapas ny index för varje gång loopen körs, så knapparna blir klickbara  
        const addBtns = document.querySelectorAll('button[data-operator="plus"]');           
        const subtractBtns = document.querySelectorAll('button[data-operator="minus"]');    
        const typeAmountInput = document.querySelectorAll('input[data-operator="amount"]');  

        for (let i = 0; i < addBtns.length; i++){
            addBtns[i].addEventListener('click', addNumber);
            subtractBtns[i].addEventListener('click', removeNumber);
            typeAmountInput[i].addEventListener('input', updateAmount);
        }
    }
} 

/*----------------Få våra + och - knappar att fungera, samt input fältet-------------------------*/

 //När man klickar på + ökar antal med 1
function addNumber (e){

    const clickedDonut = e.currentTarget.dataset.id;                                 // Indexet av knappen som klickas på
    donutCards[clickedDonut].amount += 1;                                            // Antal ökar med 1 för vaje klick
    
    const amountEl = e.currentTarget.parentElement.querySelector('input');
    amountEl.value = donutCards[clickedDonut].amount;                                //Värdet i input fältet = antal i arrayen med munkarna
    
    UpdatedonutsBasket();                                                            
}   

 //När man klickar på - minskar antalet med 1
function removeNumber(e){

    const clickedDonut = e.currentTarget.dataset.id;                                 // Index av knappen som klickas på
    const amountEl = e.currentTarget.parentElement.querySelector('input');
    
    if(donutCards[clickedDonut].amount > 0){
        donutCards[clickedDonut].amount -= 1;                                       //Antalet minksar med 1 varje klick
        amountEl.value = donutCards[clickedDonut].amount;                           //Värdet i input fältet = antal i arrayen med munkarna
    }
    
    UpdatedonutsBasket();                                                            
}

///Gör det möjligt att skriva in antal i input-rutan
function updateAmount(e){

    const changedDonutId = e.currentTarget.dataset.id;                               // Ger indexet av inputfältet som ändras
    const donutValue = Number(e.currentTarget.value);                                // Gör om värdet i input från sting till nummer
    donutCards[changedDonutId].amount = donutValue;                                  // Värdet i input fältet ska vara samma som antal i munk arrayen

    UpdatedonutsBasket();                                                           
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Basket -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------- Lägger till munkar i varukorgen och korrekt pris med dragna rabatter i delsumman ------------------*/


let yourBasketIsEmpty = document.querySelector('#emptyBasket');                   // Varukorgen är tom

//Lägger in valda munkar i varukorgen och drar av ev rabatt på delsumman
function UpdatedonutsBasket(){
    basketDonuts.innerHTML = '';                                                         
    let sum = 0;

   yourBasketIsEmpty.style.display = 'flex';
   
    // Gör så att delsumman drar av 10 % rabatt när man beställer 10 eller fler munkar av samma sort
    for(let i = 0; i < donutCards.length; i++){                                         
        if(donutCards[i].amount >= 10){
            sum = ((donutCards[i].amount * donutCards[i].donutPrice) * 0.9);
            sum= Math.round(sum);
        } else{
            sum = (donutCards[i].amount * donutCards[i].donutPrice);
        }
       
        //Lägger in valda munkar i varukorgen 
        if(donutCards[i].amount >= 1){                                                   
            yourBasketIsEmpty.style.display = 'none';                                   // Tar bort varukorgen är tom
            basketDonuts.innerHTML +=
                `<div class="basketDonuts">
                    <div class="basketHeaderDonuts">
                        <h3>${donutCards[i].donutTitle}</h3>
                    </div>
                    <section>
                        <div>
                            <img src="${donutCards[i].donutImg1}" alt="${donutCards[i].donutAlt}" width="70" height="70">
                        </div>
                        <div class="basketDonutsflex">
                            <div>
                                <h4>Antal</h4>
                                <h4>Delsumma</h4>
                            </div>
                            <div>
                                <p>${donutCards[i].amount}</p>
                                <p>${sum} kr</p>
                            </div>
                        </div>
                    </section>
                </div>`;
        }
    }                                                               

    /*------------------ Totalt antal munkar till popupen -----------------------------------*/    
    totalNumberOfDonuts = 0;                                                        //Initialvärdet är noll
    
    for(let i = 0; i < donutCards.length; i++){                                     //Loop som summerar alla munkar på sidan.
        totalNumberOfDonuts += donutCards[i].amount;
    }
    
    /*------------------- Luciamunk-------------------------*/    
    // const lokalToday = new Date('December 13, 69 00:20:18');                      //För testning av Luciamunken

    const lokalToday = new Date();                                                   //Dagens datum
    if(lokalToday.getDate() == 13 && lokalToday.getMonth() == 11 && totalNumberOfDonuts >= 1){    //Om dagens datum är 13 dec, varukorgen inte är tom.
        basketDonuts.innerHTML += luciaDonutHtml();                                     //Så triggas funktionen luciaDonutHtml
        totalNumberOfDonuts += 1;                                                   //Luciamunken läggs till i total antal munkar den 13 dec.
    }

/*--------------------Luciamunk--Slut----------------------*/    

    totalPrice();                                                                   // sitter utanför if statement för att den ska skriva ut 0 eftersom jag satt att dern bara ska skriva ut html-strukturen om amount är 1 eller större
    maxSummaryNoInvoice();  // Körs för funktionen Ta bort Faktura över 800 kr. Bytes till Summery senare.
    activateOrderButton();
};

let totalNumberOfDonuts = 0;

/*------------------------ Lägg till rabattkod och gör priset till 0------------------*/

const discountBtn = document.querySelector('#discountBtn');                 
const discountInput = document.querySelector('#discountCode'); 

discountBtn.addEventListener('click', totalpriceZero);
discountInput.addEventListener('input', wrongCode);

// Varukorgen uppdateras när använd rabattkod klickas på
function totalpriceZero(){
    UpdatedonutsBasket();
}

//Tas det bort en bokstav ur rätt rabattkod kommer hela summan visas igen
function wrongCode(){ 
    if (discountInput.value != 'a_damn_fine-cup_of-coffee'){
        UpdatedonutsBasket();
    }
}

/*-------------------------------Uppdaterar totalsumman och lägger till rabatter-------------------------------*/

//Uppdatera totalsumman i varukorgen
let totalSumToPay = 0;                                                                  // Global variabel som nås på fler ställen. Till för över 800 kr och popupen.

function totalPrice(){ 
    let sum = 0;  
    let startShippingSum = 0;
    let today = new Date(); 
    let amount = 0;
    let mondayText = document.querySelector('#mondayDiscount')
    
    // Weeknumber = veckans nummer                                              
    startDate = new Date(today.getFullYear(), 0, 1);        
    var days = Math.floor((today - startDate) /
    (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);   

    // Vid beställning av 10 eller fler munkar av en sort ska den munksorten få 10% rabatt                              
    for(let i = 0; i < donutCards.length; i++){                                            
        amount += donutCards[i].amount;
        
        if(donutCards[i].amount >= 10){
            sum += ((donutCards[i].amount * donutCards[i].donutPrice) * 0.9);
    
        //Annars skriv ut totalsumma utan rabatter
        } else {
            sum += (donutCards[i].amount * donutCards[i].donutPrice);                   //sum är sum + antal * pris. += för att den ska lägga till på min summa hela tiden annars skriver den bara den jag klickar på
        }
    } 
 
    // Om det är måndag innan kl 10 blir det 10% rabatt på hela beställningen
    if(today.getDay() == 1 && today.getHours() <= 9){
        sum *= 0.9;
        mondayText.innerHTML =
        `<span>Måndagsrabatt: 10% på hela beställningen</span>`;
    } 

    // Om det är jämn vecka och tisdag får man 25 kr rabatt på hela beställningen
    if(weekNumber % 2 == 0 && sum >= 25 && today.getDay() == 2){
        sum -= 25;
    } 
    
    sum = Number(sum.toFixed());                                                        //Avrundat värdet till hela kronor

    // Fraktpriset
    if(amount >= 16 || amount == 0){
        (startShippingSum = 0);

    } else {
        startShippingSum = (sum * 0.1) + 25;
    }

    startShippingSum = Number(startShippingSum.toFixed());                              //Avrunda värdet för frakten till hela kronor    

    // Rabattkod som gör hela beställningen till 0
    if (discountInput.value === 'a_damn_fine-cup_of-coffee') {
        sum = 0;
        startShippingSum = 0;
    }
    
    // Lägger till totalsumma
    totalPriceBasket.innerHTML =                                      
        `<span>${sum}</span>`;    

    // Lägger till fraktsumma
    shipping.innerHTML = `<span>${startShippingSum}</span>`;

    //Uppdatera totalsumman i ikonen längst upp till höger på skärmen
    const shoppingCart = document.querySelector('#shoppingCart');                         
    shoppingCart.innerHTML =
        `<span class="colorWhite">${sum} sek</span>`;

    // Skriver ut summa att betala som innehåller frakt och totalsumma
    document.querySelector('#priceToPay').innerHTML = `<span>${sum+startShippingSum} SEK</span>`;

    totalSumToPay = sum + startShippingSum;                                  // Tilldelning för uträkning av totalsumma med frakt och rabatt och avrundar summan till hela kronor
}

/*---------------------------------------Töm varukorgen----------------------------------*/

const emptyBasketBtn = document.querySelector('#emptyBasketBtn');   
emptyBasketBtn.addEventListener('click', emptyBasket);


function emptyBasket (e){
    let inputs = document.querySelectorAll('input[data-operator="amount"]');
    inputs.forEach(input => {
        input.value = 0;
    });

    discountInput.value = '';                                        // Tömmer rabbatkodsfältet
    
    for(let i = 0; i < donutCards.length; i++){                     // loopar igenom och kollar alla amount
        donutCards[i].amount = 0;                                   //ändrar alla amount till 0
    } 

    UpdatedonutsBasket();                                           // gör så att munkarna försvinner i varukorgen
} 

/*-------------------- Luciamunk-start--------------------------------*/

function luciaDonutHtml(){                                                  //Skapar strängen för Luciamunken
    return `<div class="basketDonuts">
    <div class="basketHeaderDonuts">
        <h3>Lucia Munk</h3>
    </div>
    <section>
        <div>
            <img src="./images/nutDounat.jpg" alt="en luciamunk som tillkommit till din beställning för att det är lucia idag" height="70" width="70">
        </div>
        <div class="basketDonutsflex">
            <div>
                <h4>Antal</h4>
                <h4>Delsumma</h4>
            </div>
            <div>
                <p>1</p>
                <p>0 kr</p>
            </div>
        </div>
    </section>
    </div>`;
}

/*---------------------Luciamunk-slut ----------------------------*/


/*------------------------------ Start växling av bilder i munksektion -----------------------------*/

const prevImageBtn = document.querySelectorAll('#prevImage');        //Har adderat två knappar per munk i HTML ovanför och kallat på dessa.
const nextImageBtn = document.querySelectorAll('#nextImage');

for (let i = 0; i < prevImageBtn.length; i++){                      //Loopar igenom knapparna på alla munkar
    prevImageBtn[i].addEventListener('click', swapImages)           //eventlistener klick på backåtknappen som triggar funktionen nedan
    nextImageBtn[i].addEventListener('click', swapImages)           //eventlistener klick på framåtknappen som triggar funktionen nedan 
}

function swapImages(e){
    const donutcardImg1Slideshow = e.currentTarget.parentElement.parentElement.querySelector('#donutcardImg1');         //Hämtat bild1 
    const donutCardImg2Slideshow = e.currentTarget.parentElement.parentElement.querySelector('#donutCardImg2');         //Hämtat bild2

    const firstDonut = donutcardImg1Slideshow.getAttribute('src');                  //Hämtar urlen till bild1
    const secondDonut = donutCardImg2Slideshow.getAttribute('src');                 //Hämtar urlen till bild2

    donutcardImg1Slideshow.setAttribute('src', secondDonut);                        //Första munken byts till andra
    donutCardImg2Slideshow.setAttribute('src', firstDonut);                         //Andra munken byts till första
};

/*------------------------------ Stop växling av bilder i munksektion ------------------------------*/



/*-----------------------------Form-------------------------------------------------------------
------------JS-koden för att hantera beställningsknappen. START---------------------------------
-----------------------------------------------------------------------------------------------*/ 
const orderButton = document.querySelector('.submit_form_button');              //hämtar beställningsknapp
const nameInput = document.querySelector('#firstname');                              //hämtar namn i html
const lastNameInput = document.querySelector('#lastname');                      //hämtar efternamnet i html
const adress = document.querySelector('#adress');                               //hämtar adress
const postNumber = document.querySelector('#postnumber');                       //hämtar postnummer
const city = document.querySelector('#city');                                   //hämtar stad
const phoneNumber = document.querySelector('#phonenumber');                     //hämtar telefonnummer
const eMail = document.querySelector('#email');                                 //hämtar email
const gdpr = document.querySelector('#gdpr');                                   //hämtar gdpr
const creditCard = document.querySelector('#creditcard');                       //hämtar kreditkort
const cardNumber = document.querySelector('#cardnr');                           //hämtar kortnummer
const monthYear = document.querySelector('#dateyear');                          //hämtar MM/ÅÅ
const cvc = document.querySelector('#CVC');                                     //hämtar CVC
const inVoice = document.querySelector('#invoice');                             //hämtar fakturafältet
const personNR = document.querySelector('#personNr');                           //hämta personnummer

nameInput.addEventListener('change', checkNameInput);                           // när något ändras i namnrutan så triggas funktionen under. 
let checkNameInputOk = false;                                                   // grundvärdet är falskt     

function checkNameInput(){          
    const exp = new RegExp('^[A-Za-zÅÄÖåäö\-]{1,}$');                           //Vad fältet får innehålla, A-ö a-ö - 
    const errorMessage = document.querySelector('#errorMessageName');           //kallar upp diven för felmedelande
    
    if (exp.test(nameInput.value)){                                           //Om värdet stämmer med const exp så döljs felmeddelanderutan och funktionen skickar true
        errorMessage.setAttribute('hidden', '');
        checkNameInputOk = true;
    } else {
        errorMessage.innerHTML = 'Endast bostäver och bindelsträck';            //Om värdet inte stämmer visas felmeddelanderutan med denna text och funktionen skickar false. 
        errorMessage.removeAttribute('hidden');
        checkNameInputOk = false;
    }
    activateOrderButton();                                                      //Kör denna funktion för att uppdatera beställknappen eftersom jag ändrat ckeckputImputOk.  
}

lastNameInput.addEventListener('change', checklastNameInput);                   //Som ovan men med inställningar till efternamn
let checklastNameInputOk = false;

function checklastNameInput(){
    const exp = new RegExp('^[A-Za-zÅÄÖåäö\-]{1,}$');
    const errorMessage = document.querySelector('#errorMessageLastname');

    if (exp.test(lastNameInput.value)){
        errorMessage.setAttribute('hidden', '');
        checklastNameInputOk = true;
    } else {
        errorMessage.innerHTML = 'Endast bostäver och bindelsträck';
        errorMessage.removeAttribute('hidden');
        checklastNameInputOk = false;
    }
    activateOrderButton();
}

adress.addEventListener('change', errorMessageAdress);
let messageAdressOk = false;

function errorMessageAdress(){
    const exp = new RegExp('^[A-Za-zÅÄÖåäö0-9 ]{1,}$');                         //A-Ö a-ö 0-9 och mellanslag är okej. Minst ett tecken eller fler. 
    const errorMessage = document.querySelector('#errorMessageAdress');

    if (exp.test(adress.value)){
        errorMessage.setAttribute('hidden', '');
        messageAdressOk = true;
    } else {
        errorMessage.innerHTML = 'Endast bostäver, siffor och mellanslag';
        errorMessage.removeAttribute('hidden');
        messageAdressOk = false;
    }
    activateOrderButton();
}

postNumber.addEventListener('change', errorMessagePostnumber);
let messagePostnumberOk = false;

function errorMessagePostnumber(){
    const exp = new RegExp('^[0-9]{5}$');                                       // Ska innehålla fem siffor 0-9
    const errorMessage = document.querySelector('#errorMessagePostnumber');

    if (exp.test(postNumber.value)){
        errorMessage.setAttribute('hidden', '');
        messagePostnumberOk = true;
    } else {
        errorMessage.innerHTML = 'Endast fem siffror';
        errorMessage.removeAttribute('hidden');
        messagePostnumberOk = false;
    }
    activateOrderButton();
}

city.addEventListener('change', errorMessageCity);
let messageCityOk = false;

function errorMessageCity(){
    const exp = new RegExp('^[A-Za-zÅÄÖåäö \-]{1,}$');                          // A-Ö a-ö mellanslag och bindelstreck
    const errorMessage = document.querySelector('#errorMessageCity');

    if (exp.test(city.value)){
        errorMessage.setAttribute('hidden', '');
        messageCityOk = true;
    } else {
        errorMessage.innerHTML = 'Endast bokstäver, bindelsträck och mellanslag';
        errorMessage.removeAttribute('hidden');
        messageCityOk = false;
    }
    activateOrderButton();
}

phoneNumber.addEventListener('change', errorMessagePhoneNumber);
let messagePhoneNumberOk = false;

function errorMessagePhoneNumber(){
    const exp = new RegExp('^[0-9]{10}$');                                      // Tio siffror 0-9
    const errorMessage = document.querySelector('#errorMessagePhoneNumber');

    if (exp.test(phoneNumber.value)){
        errorMessage.setAttribute('hidden', '');
        messagePhoneNumberOk = true;
    } else {
        errorMessage.innerHTML = 'Endast 10 siffror';
        errorMessage.removeAttribute('hidden');
        messagePhoneNumberOk = false;
    }
    activateOrderButton();
}

eMail.addEventListener('change', errorMessageeMail);
let messageeMailOk = false;

function errorMessageeMail(){
    const exp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    const errorMessage = document.querySelector('#errorMassageeMail');                      //SpecialRegExp för epost

    if (exp.test(eMail.value)){
        errorMessage.setAttribute('hidden', '');
        messageeMailOk = true;
    } else {
        errorMessage.innerHTML = 'Fyll i en giltlig E-post';
        errorMessage.removeAttribute('hidden');
        messageeMailOk = false;
    }
    activateOrderButton();
}

gdpr.addEventListener('click', errorMessagegdpr);
let messagegdprOk = false;                                                  //Denna ruta är false då den är tom

function errorMessagegdpr(){
    messagegdprOk = gdpr.checked;                                           //Denna ruta är sant om den är checkad
    activateOrderButton();
}

cardNumber.addEventListener('change', errorMessageCardNR);
let messageCardNROk = false;

function errorMessageCardNR(){
    const exp = new RegExp('^[0-9]{16}$');                                  // Sexton siffror 0-9
    const errorMessage = document.querySelector('#errorMessageCardNR');

    if (exp.test(cardNumber.value)){
        errorMessage.setAttribute('hidden', '');
        messageCardNROk = true;
    } else {
        errorMessage.innerHTML = 'Fyll kornummer 16 siffror';
        errorMessage.removeAttribute('hidden');
        messageCardNROk = false;
    }
    activateOrderButton();
}

monthYear.addEventListener('change', errorMessageMonthyear);
let messageMonthyearOk = false;

function errorMessageMonthyear(){
    const exp = new RegExp('^[0-9]{4}$');                                   // Fyra siffror 0-9
    const errorMessage = document.querySelector('#errorMessageDateyear');

    if (exp.test(monthYear.value)){
        errorMessage.setAttribute('hidden', '');
        messageMonthyearOk = true;
    } else {
        errorMessage.innerHTML = 'Fyll i 4 siffor för månad och år';
        errorMessage.removeAttribute('hidden');
        messageMonthyearOk = false;
    }
    activateOrderButton();
}


cvc.addEventListener('change', errorMessageCVC);
let messageCVCOk = false;

function errorMessageCVC(){
    const exp = new RegExp('^[0-9]{3}$');                                   //Tre siffror 0-9
    const errorMessage = document.querySelector('#errorMessageCVC');

    if (exp.test(cvc.value)){
        errorMessage.setAttribute('hidden', '');
        messageCVCOk = true;
    } else {
        errorMessage.innerHTML = 'Fyll i 3 siffrig kod';
        errorMessage.removeAttribute('hidden');
        messageCVCOk = false;
    }
    activateOrderButton();
}

personNR.addEventListener('change', errorMessagePersonNR);
let personNROk = false;

function errorMessagePersonNR(){
    const exp = new RegExp('^[0-9]{10}$');                                  //Tio siffror 0-9
    const errorMessage = document.querySelector('#errorMessagePersonNR');

    if (exp.test(personNR.value)){
        errorMessage.setAttribute('hidden', '');
        personNROk = true;
    } else {
        errorMessage.innerHTML = 'Fyll i 10 siffrigt personnummer';
        errorMessage.removeAttribute('hidden');
        personNROk = false;
    }

    activateOrderButton();
}

function activateOrderButton(){                             // Om alla dessa värden innan parenteserna är sanna, och de första värdena inom den första parentesen eller den andra parentesen är sanna så tas attributet disable bort. Om inte detta uppfylls sätts attributet disabled.
    if (checkNameInputOk && checklastNameInputOk && messageAdressOk && messagePostnumberOk && messageCityOk && messagePhoneNumberOk && messageeMailOk && messagegdprOk && totalNumberOfDonuts >= 1 &&
        ((creditCard.checked && messageCardNROk && messageMonthyearOk && messageCVCOk) || (inVoice.checked && personNROk))){
        orderButton.removeAttribute('disabled');    
    } else {
        orderButton.setAttribute('disabled', ''); 
    }
}



orderButton.addEventListener('click', sendOrder);           // Eventlistener till Beställknapp. När den klickas triggas funktionen sendOrder. Har även testat 'submit' i fältet istället för 'click'.

function sendOrder(e){                                      // Funktion som innehåller alla funktioner som triggas när Beställknappen klickas.   
    e.preventDefault();
    showPopupArea();                                        // Kör funktionen som visar popup-rutan med sammanställningen. 
    allDonuts();                                            // Antal munkar
    totalPriceToPay();                                      // Totalsumma (Att betala)
    deliveryTime();                                         // Funktionen som visar texten med leveranstiden
    stopClearFormTimer();                                   //Timern stängs av.
}

/*------------JS-koden för att hantera beställningsknappen.  STOP-------------------------------*/ 



/*-------------------------------------------------------------------------------------------------
------------ Faktura försvinner som betalsätt om man handlar för mer än 800 kr --------------------
-------------------------------------------------------------------------------------------------*/ 

function maxSummaryNoInvoice(){
    const invoiceStop = document.querySelector('#invoice');              //Kanppen till fakturan. 
    const errorMessageInvoice = document.querySelector('#errorMessageInvoice') //Kallar på spantagen där felmedelandet ska synas. 
    const cardRadioButton = document.querySelector('#creditcard')       //Kallar på knappen till fakturan

    if (totalSumToPay > 800){                                   //Om summan med rabatt och frakt är över 800 
        invoiceStop.setAttribute('disabled', '');               //är inte knappen längre klickabar     
        invoiceStop.checked = false;                            //Värdet radiobutton = falsk
        activateOrderButton();                      
        //Skickar det falska värdet till Sublit så den gråas om värdet i VK går ner under 800 igen. 
        //Om inte så skickas uppgifterna i det dolda iväg om man skrivit i dem och sänker priset.
        cardRadioButton.checked = true;                         //Kort radiobutton blir ikryssad
        showCardInfo();                                         //Fälten för kortinfo visas.
        errorMessageInvoice.innerHTML = 'Faktura ej tillåten vid köp över 800 kr';  //Meddelande till kunden.  
        errorMessageInvoice.removeAttribute('hidden');          //Meddelander syns på skärmen           
    } else {
        invoiceStop.removeAttribute('disabled');                //Fakturaknappen syns
        errorMessageInvoice.setAttribute('hidden', '');         //Felmeddelandet döljs. 
    }
}

/*--------------Faktura försvinner Slut ------------------------------------------------------------*/


/**
 * När man klickar på kort ska kortnformation visas och när vi klickar på form ska personnr visas
 */
const creditcardBtn = document.querySelector('#creditcard')
const invoiceBtn = document.querySelector('#invoice')

creditcardBtn.addEventListener('click', showCardInfo);
invoiceBtn.addEventListener('click', showPersonNr);

/* När man klickar på kort visas kortinformationen*/
function showCardInfo(){
    document.querySelector('#cardpay').style.display = 'block';
    document.querySelector('#cardpay').ariaRequired;
    document.querySelector('#ssn').style.display = 'none';
}

/*När man klickar på faktura kommer personnr visas*/
function showPersonNr(){
    document.querySelector('#ssn').style.display = 'block';
    document.querySelector('#ssn').ariaRequired;
    document.querySelector('#cardpay').style.display = 'none';
}


/*-------------------------------------------------------------------------------------------------
------------- Tidsbegränsningen på 15 min ---------------------------------------------------------
---------------------------------------------------------------------------------------------------*/

// Sätter eventListener till change på alla delar i form. När någon av dessa triggas startar funktionen Start timer.     
nameInput.addEventListener('change', startTimer);                            
lastNameInput.addEventListener('change', startTimer); 
adress.addEventListener('change', startTimer);                          
postNumber.addEventListener('change', startTimer);          
city.addEventListener('change', startTimer);                              
phoneNumber.addEventListener('change', startTimer);            
eMail.addEventListener('change', startTimer);                    
gdpr.addEventListener('change', startTimer);                     
creditCard.addEventListener('change', startTimer);    
cardNumber.addEventListener('change', startTimer);                   
monthYear.addEventListener('change', startTimer);                    
cvc.addEventListener('change', startTimer);                                   
inVoice.addEventListener('change', startTimer);            
personNR.addEventListener('change', startTimer);   


const infoAboutTimeDiv = document.querySelector('#infoAboutTime');          // Hämtar platsen där texten med info ska visas.
infoAboutTimeDiv.style.color ='red';                                        // Stylar infotexten om tidsbegränsningen till röd.
infoAboutTimeDiv.style.fontSize = '1.5rem';                                 // Ändrar storlek på infotexten om tidsbegräsningen.

let clearFormTimer = null;                                                  // Variabel med värde noll. 

function startTimer(){                                                      // Funktionen som startar timern om värdet är noll annars inte. 
    if (clearFormTimer == null) {                                           // Om värdet på variabeln är noll 
        infoAboutTimeDiv.innerHTML = 'Du har 15 min på dig för att fullfölja din beställning!';         //Visar infomeddelandet om tidsbegräsningen. 
        clearFormTimer = setTimeout(clearForms, 15 * 60 * 1000);            // Timern startar, när den tar slut triggas funktionen clearForm.
    }                                                                                       
}


function clearForms(){                                                      // Funktion som bland annat rensar formsen när tiden går ut.
    clearFormTimer = null;                                                  // När tiden går ut sätts värdet på varabeln åter till noll.
    infoAboutTimeDiv.innerHTML = '';                                        // Meddelandet om tidsbegränsningen tas bort. 
    emptyBasket();                                                          // Varukorgen töms.
    document.getElementById('custumerForm').reset();                        // Formen resetas. 
}

function stopClearFormTimer(){                                              // Funktion som stoppar timer. 
    clearTimeout(clearFormTimer);                                           // Timern stoppas.
    clearFormTimer = null;                                                  // Timern nollställs.
    infoAboutTimeDiv.innerHTML = '';                                        // Meddelandet om tidsbeställning tas bort. 
}

//const today = new Date('December 24, 69 00:20:18');                         //För test av julafton
const today = new Date();                                             //Dagens datum
if(today.getDate() == 24 && today.getMonth() == 11){                         //Om dagens datum är 24 dec
    const santaVagon = document.querySelector('.fa-shopping-cart');  
    santaVagon.style.color = 'red';    //Ändra Color  
    santaVagon.style.textShadow = '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff';
    const santaH1 = document.querySelector('h1');                           //Ändra färg på text
    santaH1.style.color = 'black';
    santaH1.style.paddingTop = '100px';
    santaH1.style.textShadow = '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff';
    const santaheader = document.querySelector('header').style.backgroundImage = 'url("images/santaDonuts.jpg")';                   //Ändra bakgrundsbild
    const santaPrice = document.querySelectorAll('#donutCardPrice');
    for (let i = 0 ; i < santaPrice.length ; i++){
      santaPrice[i].style.color = 'red';  
    }
    const santaBasket = document.querySelector('#shopping-basket').style.backgroundColor = 'brown';                    //Byt bakgrundsfärg röd
    const santaForm = document.querySelector('.section-form').style.backgroundImage = 'url("images/hallonchokladInzoom.jpg")';                  //Byta bakgrundsbild
}

/*---------------------------------------------------------------------------------------------------
--------------------- Jultemat ----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------*/

//const today2 = new Date('December 24, 69 00:20:18');                         //För test av julafton
const today2 = new Date();                                             //Dagens datum
if(today2.getDate() == 24 && today2.getMonth() == 11){                         //Om dagens datum är 24 dec
    const santaVagon = document.querySelector('.fa-shopping-cart');     //Hämtar vagnen
    santaVagon.style.color = 'red';                                     //Ändra färg på vagnen
    const santaH1 = document.querySelector('h1');                       //Hämtar H1    
    santaH1.style.color = 'black';                                      //Ändra färg på text i H1
    santaH1.style.paddingTop = '100px';                                 //Ändrad padding så texten passar ny bild
    santaH1.style.textShadow = '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff'; // Skugga gör mer kontrast
    const santaheader = document.querySelector('header').style.backgroundImage = 'url("images/santaDonuts.jpg")';                  //Ändra bakgrundsbild headern
    const santaPrice = document.querySelectorAll('#donutCardPrice');       //Röd färg på priset
    for (let i = 0 ; i < santaPrice.length ; i++){                          //Loopar så alla munkar får rött pris
        santaPrice[i].style.color = 'red';  
    }
    const santaDonut = document.querySelectorAll('.donutCard');       //Röd färg på priset
    for (let i = 0 ; i < santaDonut.length ; i++){                          //Loopar så alla munkar får rött pris
        santaDonut[i].style.backgroundColor = 'brown'; 
        santaDonut[i].style.color = 'lightyellow'; 
        santaDonut[i].style.textShadow = '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff';
    }
    const santaBasket = document.querySelector('#shopping-basket').style.backgroundColor = 'brown';                    //Byt bagrundfärg i varukorg
    const santaForm = document.querySelector('.section-form').style.backgroundImage = 'url("images/hallonchokladInzoom.jpg")';         //Byta balgrundsbild i form
    const santaInfo = document.querySelector('.informationText').style.backgroundColor = 'green'; //Ändrad färg i info
    const Santafooter = document.querySelector('footer');                   //Hämtar footern
    Santafooter.style.backgroundColor = 'green';                            //Ändrad bakgrundsfärg i footern
    Santafooter.style.color = 'white';                                      //Ändrar färg på text till vit. Bättre kontrast.
    const santaH2 = document.querySelector('.santah2')
    santaH2.style.color = 'white';
    santaH2.style.textdekoration = 'none';
    const santaIcon = document.querySelector('.informationUlIcons').style.color = 'white';  
    //Kan ändra färg på pluset med de andra ikonerna verkar vara låsta i sin färg. 
}

/*---------------------------------------------------------------------------------------------------
---------------------- Delivery Time Code -----------------------------------------------------------
---------------------------------------------------------------------------------------------------*/
  
const textToDelivery = document.querySelector('#textAboutDeliveryTime');        //Hämtar span där texten ska stå i HTML:en. 

function deliveryTime() {                                                       //Ska triggas när man trycker på Submit-knappen 
    const lokalToday = new Date();

    if(lokalToday.getDay() == 5 && lokalToday.getHours() >= 11 && lokalToday.getHours() <= 13){          // Om det är fredag mellan 11-13  
        textToDelivery.innerHTML = 'kl 15.00.';                                                          // så är leveranstiden kl 15.00.
    } else if (lokalToday.getDay() == 6 || lokalToday.getDay() == 0){                                    // Om det är helg (borde vara mellan kl00 fred natten till lördag-00 natten mot måndag?)
        textToDelivery.innerHTML = 'är om ca 1,5 h.';                                                    // så är beräknad leveranstid ca 1,5 h                       
    } else if (lokalToday.getHours() >= 0 && lokalToday.getHours() <= 5){                                // Om klockan är 00.00-05.00                                             
        textToDelivery.innerHTML = 'är om ca 45 min.';                                                   // så är leveransen om ca 45 min.
    } else {                                                                                             // I andra fall... 
        textToDelivery.innerHTML = 'är om ca 30 min.';                                                   // är det om 30 min.
    }
}

const popupArea = document.querySelector('#stopArea');                                                   // Div:en med popupen

function showPopupArea() {                                                                               // Funktion som visar popUparea   
    popupArea.removeAttribute('hidden');                                                                 // Kör popupen synlig   
}

const stopAreaButton = document.querySelector('#stopAreaButton');                                         // Stängknapp för popupen
stopAreaButton.addEventListener('click', closePopUpArea);                                             // När stängknappen för popupen triggas startar funktionen nedan

function closePopUpArea() {                                                                                 
    emptyBasket();                                                          // Varukorgen töms.
    document.getElementById('custumerForm').reset();                        // Formulär återställs.
    popupArea.setAttribute('hidden', '');                                   // Inforutan blir dold och hemsidan syns igen. 
    location.reload();
}

/*------------------------------------------------------------------------------------------------------*/ 

function totalPriceToPay() {                                                
    document.querySelector('#summaryArea').innerHTML=totalSumToPay;          // Funktionen som redovisar totalpris i popupen
}

function allDonuts() {
    document.querySelector('#summaryDonuts').innerHTML=totalNumberOfDonuts;   // Funktionen som redovisar totalt antal munkar i popupen
}

UpdatedonutsBasket();                                                       //Körs för att Luciamunken ska läggas i varukorgen och för initial uppdatering.