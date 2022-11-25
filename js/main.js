

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Donut cards -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*const { doc } = require("prettier");*/


/**
 * Få våra donut kort att komma upp genom att ligger i en array och körs genom en loop
 */
const donutCardsContainer = document.querySelector('#donutCards') //Kallar på section för våra donut kort för att kunna lägga in våra kort
const basketDonuts = document.querySelector('#basketDonuts') // kallar på html strukturen till donutsen som ska ligga i vår varukorg
const totalPriceBasket = document.querySelector('#totalAmountBasket');// Kallar på diven där html sturkturen för totalsumman ska ligga

const donutCards = [ // En array med varje donut kort som objekt
{
    donutTitle: 'Apelsinmunk',
    donutImg1: './images/apelsinmunk.jpg',
    donutImg2: './images/apelsinmunk2.jpg',
    donutAlt: 'Apelsinmunk',
    donutPrice: '15',
    amount: 0,
}, {
    donutTitle: 'Banana suprice',
    donutImg1: './images/banansuprice.jpg',
    donutImg2: './images/banansuprice2.jpg',
    donutAlt: 'munk med banansmak',
    donutPrice: '20',
    amount: 0
},{
    donutTitle: 'Blåbär',
    donutImg1: './images/blueberry.jpg',
    donutImg2: './images/blueberry2.jpg',
    donutAlt: 'munk med blåbärssmak',
    donutPrice: '15',
    amount: 0
},{
    donutTitle: 'Karamellchoklad',
    donutImg1: './images/caramellchoklad.jpg',
    donutImg2: './images/caramellchoklad2.jpg',
    donutAlt: 'munk med karamellchoklad smak',
    donutPrice: '18',
    amount: 0
},{
    donutTitle: 'Chunky monkey',
    donutImg1: './images/chunkymonkey.jpg',
    donutImg2: './images/chunkymonkey2.jpg',
    donutAlt: 'munk med Chunky munky smak',
    donutPrice: '25',
    amount: 0
},{
    donutTitle: 'Citronfromage',
    donutImg1: './images/citronfromage.jpg',
    donutImg2: './images/citronfromage2.jpg',
    donutAlt: 'munk med citron smak',
    donutPrice: '18',
    amount: 0
},{
    donutTitle: 'Hallon-choklad',
    donutImg1: './images/hallonchoklad.jpg',
    donutImg2: './images/hallonchoklad2.jpg',
    donutAlt: 'munk med citron hallon och choklad smak',
    donutPrice: '20',
    amount: 0
},{
    donutTitle: 'Jordgrubbsdröm',
    donutImg1: './images/strawberrydream.jpg',
    donutImg2: './images/strawberrydream2.jpg',
    donutAlt: 'munk med jordgubbs smak',
    donutPrice: '15',
    amount: 0
},{
    donutTitle: 'Laktris',
    donutImg1: './images/lakrits.jpg',
    donutImg2: './images/lakrits2.jpg',
    donutAlt: 'munk med laktris smak',
    donutPrice: '15',
    amount: 0
},{
    donutTitle: 'Mandelknäck',
    donutImg1: './images/caramell.jpg',
    donutImg2: './images/caramell2.jpg',
    donutAlt: 'munk med mandel och knäck smak',
    donutPrice: '15',
    amount: 0
}];

for(let i = 0; i < donutCards.length; i++){ // Varje gång loopen körs kommer vår artikel läggas in i vår html struktur i vår section och alla 10 korten kommer upp i webben
donutCardsContainer.innerHTML += 
`<article class="donutCard">
    <div class="donutCardHeaderContainer">
        <h3>${donutCards[i].donutTitle}</h3 id="donutCardHeader">
    </div>
    <section class="donutCardContainer">
        <div class="donutCardImgContainer">
            <div class="controlsImgSlideshow" id="controlsImgSlideshow">
                <div class="images">
                    <img src="${donutCards[i].donutImg1}" alt="" class="donutCardImg1" id="donutcardImg1">
                    <img src="${donutCards[i].donutImg2}" alt="" class="donutCardImg2" id="donutCardImg2">                                 
                </div>
                <div class="controls">
                    <button class="left" id="prevImage">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button class="right" id="nextImage">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
            <p id="donutCardPrice">${donutCards[i].donutPrice} kr/st</p>
        </div>
        <div class='donutCardRating'></div>
        <br>
        <div class="donutCardButtonContainer">
            <button data-operator="minus" data-id="${i}">-</button>
            <input type="number" value="0" data-operator="amount" data-id="${i}">
            <button data-operator="plus" data-id="${i}">+</button>
        </div>
    </section>
</article>`
};// data id i är för att knapparna ska få index som id 0123456789 så vi vet vilken av knapparna i arrayen vi klickat på

/*
*Få våra + och - knappar att fungera
*/
const addBtns = document.querySelectorAll('button[data-operator="plus"]');// kallar på plus knappen
const subtractBtns = document.querySelectorAll('button[data-operator="minus"]'); // Kallar på minus knappen
const typeAmountInput = document.querySelectorAll('input[data-operator="amount"]') //Kallar på inputen med antal

for (let i = 0; i < addBtns.length; i++){
    addBtns[i].addEventListener('click', addNumber)
    subtractBtns[i].addEventListener('click', removeNumber)
    typeAmountInput[i].addEventListener('input', updateAmount)
}

 /* När vi klickar på + ökar vi antal med 1*/
function addNumber (e) {

    const clickedDonut = e.currentTarget.dataset.id; // Gör så jag får ut indexet av knappen som jag klickar på
    donutCards[clickedDonut].amount += 1; // [] de skrivet vi in för att komma åt de vi klickade på, alltså vilket objekt vi klickat på. Och de andra länkar till vår lista och amount, de gör att när vi klickar ökar amount med 1 varje gång på rätt donut
    
    const amountEl = e.currentTarget.parentElement.querySelector('input')
    amountEl.value = donutCards[clickedDonut].amount; //Gör så att value i input = amount i våra objekt
    
    UpdatedonutsBasket();// kallar på min funktion som lägger till och tar bort donuts från basket
}   

 /* När vi klickar på - minskar vi antalet med 1*/
function removeNumber(e){

    const clickedDonut = e.currentTarget.dataset.id; // Gör så jag får ut indexet av knappen som jag klickar på
    const amountEl = e.currentTarget.parentElement.querySelector('input')
    
    if(donutCards[clickedDonut].amount > 0){

        donutCards[clickedDonut].amount -= 1; // [] de skrivet vi in för att komma åt de vi klickade på. Och de andra länkar till vår lista och amount, de gör att när vi klickar ökar amount med 1 varje gång på rätt donut

        amountEl.value = donutCards[clickedDonut].amount; //Gör så att value i input = amount i våra objekt
    }
    
    UpdatedonutsBasket();// kallar på min funktion som lägger till och tar bort donuts från basket
}

/*Gör det möjligt att skriva in antal i inputrutan*/
function updateAmount(e){

    const changedDonutId = e.currentTarget.dataset.id; // Gör så jag får ut indexet det inputfältet som ändras
    const donutValue = e.currentTarget.value;
    donutCards[changedDonutId].amount = donutValue;// säger att värdet i value ska vara samma som i amount

    UpdatedonutsBasket(); // Kallar på funktionen så våra donuts skrivs ut
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Basket -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Lägger till donuts i varukorgen när vi klickar på +
 */

/*Lägger in rätt donuts i varukorgen*/
function UpdatedonutsBasket(){

    basketDonuts.innerHTML = ''; // rensar formuläret varje gång jag klickar på en knapp 
    for(let i = 0; i < donutCards.length; i++){ // loopa igenom alla donuts i vår array så vi kan hitta den med amount som är större än 0
         if(donutCards[i].amount >= 1){ //Om värdet av amount i vår array av donuts är 1 eller mer lägger vi till vår html stuktur i basket. i för att den inte ska lägga till alla utan bara enskilda. Första gången den lopas inget, andra inget, trejde träff och den skrivs ut
        basketDonuts.innerHTML +=
        `<div class="basketDonuts">
        <div class="basketHeaderDonuts">
            <h3>${donutCards[i].donutTitle}</h3>
        </div>
        <section>
            <div>
                <img src="${donutCards[i].donutImg1}" alt="">
            </div>
            <div class="basketDonutsflex">
                <div>
                    <h4>Antal</h4>
                    <h4>Delsumma</h4>
                </div>
                <div>
                    <p>${donutCards[i].amount}</p>
                    <p>${(donutCards[i].donutPrice * donutCards[i].amount)} kr</p>
                </div>
            </div>
        </section>
    </div>`}
    totalPrice();// sitter utanför if statement för att den ska skriva ut 0 eftersom jag satt att dern bara ska skriva ut html strukturen om amount är 1 eller större
    maxSummaryNoInvoice();  // Körs för funktionen Ta bort Faktura över 800 kr. Bytes till Summery senare.
    }
    /*------------------- Luciamunk--Start-----------------------*/    
    //const lokalToday = new Date('December 13, 69 00:20:18');                       //För testning av Luciamunken

    const lokalToday = new Date();                                                   //Dagens datum
    if(lokalToday.getDate() == 13 && lokalToday.getMonth() == 11)                         //Om dagens datum är 13 dec
    {
    basketDonuts.innerHTML += luciaDonutHtml();                             //Så triggas funktionen luciaDonutHtml
    }
/*--------------------Luciamunk--Slut----------------------*/    
}

/**
 * Lägg till rabattkod och gör priset till 0
 */

const discountBtn = document.querySelector('#discountBtn')//kallar på rabattkodsknappen
const totalSum = 0; // skriver totalsumman som en variabel så jag kan spara värdet av totalsumman när den ändras till 0
discountBtn.addEventListener('click', totalpriceZero)

function totalpriceZero(){
    const discountInput = document.querySelector('#discountCode') // kallar på inputrutan jag ska skriva in  min kod i
    if (discountInput.value === 'a_damn_fine-cup_of-coffee'){// om value är lika med vår kod kommer totalsumman bli 0
        totalPriceBasket.innerHTML = ''; // måste tömma vårt totala pris innan vi lägger upp de nya
        totalPriceBasket.innerHTML += // säger att vi ska skicka in en span med 0 i vår html
    `<span>${totalSum}</span>` // skickar in värdet 0 i totalsumman
    }
}

/**
 * Uppdaterar totalsumman
 */
function totalPrice(){ //Uppdatera totalsumman i varukorgen
    let sum = 0; // sätter en startsumma till 0
    
    for(let i = 0; i < donutCards.length; i++){// loopar igenom alla så jag hittar vilka som har värde över 0
        sum += (donutCards[i].amount * donutCards[i].donutPrice)//sum är sum + antal * pris. += för att den ska lägga till på min summa hela tiden annars skriver den bara den jag klickar på
    }
    totalPriceBasket.innerHTML = // lägger till summan
    `<span>${sum}</span>`
    
    //Uppdatera totalsumman i iconen längst upp till höger på skärmen
    const shoppingCart = document.querySelector('#shoppingCart') //kallar på shopping vagnen i html strukturen
    shoppingCart.innerHTML =
    `<span class="colorWhite">${sum} sek</span>`
}

/**
 * Töm varukorgen
 */

const emptyBasketBtn = document.querySelector('#emptyBasketBtn') // kallar på töm varukotgknappen
emptyBasketBtn.addEventListener('click', emptyBasket)

function emptyBasket (e){ 

    for(let i = 0; i < donutCards.length; i++){// loopar igenom och kollar alla amount
        donutCards[i].amount = 0; //ändrar alla amount till 0
        typeAmountInput[i].value = 0; // ändrar alla inputfält till 0
    } 

UpdatedonutsBasket(); // gör så att jag tar bort kortet i varukorgen
} 

 // På priset har jag satt att priset ska multipliceras med värdet i amount

/*-------------------- Luciamunk start--------------------------------*/
UpdatedonutsBasket();                                                       //Körs för att Luciamunken ska läggas i varukorgen.
function luciaDonutHtml(){                                                  //Skapar strängen för Luciamunken
    return `<div class="basketDonuts">
    <div class="basketHeaderDonuts">
        <h3>Lucia Munk</h3>
    </div>
    <section>
        <div>
            <img src="./images/nutDounat.jpg" alt="">
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
/*---------------------Luciamunk slut ----------------------------*/
 
/**
 * TODO Varukorg
 
 * [x] När man väljer att skriva i en siffra ska amount uppdateras
 * [x] Skapa en töm varukorg knapp
 * [x]När töm varukorgknappen klickas på ska amount bli 0 och pris bli 0
 * [x] Skapa en rabattkodsruta
 * [x]När jag fyller i rutan med en viss kod ska totalsumman bli 0
 * [] Visuell feedback i varukorgiconen
 */

/*------------------------------ Start växling av bilder i munksection -----------------------------*/

const prevImageBtn = document.querySelectorAll('#prevImage');        //Har adderat två knappar per munk i HTML ovanför och kallat på dessa.
const nextImageBtn = document.querySelectorAll('#nextImage');

for (let i = 0; i < prevImageBtn.length; i++){                      //Loopar igenom knapparna på alla munkar
    prevImageBtn[i].addEventListener('click', swapImages)           //adventlisner klick på backåtknappen som triggar funktionen nedan
    nextImageBtn[i].addEventListener('click', swapImages)           //adventlisner klick på framåtknappen som triggar funktionen nedan 
}

function swapImages(e){
    const donutcardImg1Slideshow = e.currentTarget.parentElement.parentElement.querySelector('#donutcardImg1');         //Hämtat bild1 
    const donutCardImg2Slideshow = e.currentTarget.parentElement.parentElement.querySelector('#donutCardImg2');         //Hämtat bild2

    const firstDonut = donutcardImg1Slideshow.getAttribute('src');                  //Hämtar urlen till bild1
    const secondDonut = donutCardImg2Slideshow.getAttribute('src');                 //Hämtar urlen till bild2

    donutcardImg1Slideshow.setAttribute('src', secondDonut);                        //Första munken byts till andra
    donutCardImg2Slideshow.setAttribute('src', firstDonut);                         //Andra munken byts till första
};

/*------------------------------ Stop växling av bilder i munksection ------------------------------*/



/*-----------------------------Form-------------------------------------------------------------
------------JS koden för att hantera beställningsknappen. START---------------------------------
-----------------------------------------------------------------------------------------------*/ 
const orderButton = document.querySelector('.submit_form_button');              //hämtar beställningsknapp
const nameInput = document.querySelector('#name');                              //hämtar namn i html
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

    if (exp.test(nameInput.value)){                                             //Om värdet stämmer med const exp så döljs felmeddelanderutan och functionen skickar true
        errorMessage.setAttribute('hidden', '');
        checkNameInputOk = true;
    } else {
        errorMessage.innerHTML = 'Endast bostäver och bindelsträck';            //Om värdet inte stämmer visas felmeddelanderutan med denna text och functionen skickar false. 
        errorMessage.removeAttribute('hidden');
        checkNameInputOk = false;
    }
    activateOrderButton();                                                      //Kör denna funnktion för att uppdatera beställknappen eftersom jag ändrat ckeckputImputOk.  
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

function activateOrderButton(){                             //Om alla dessa värde innan paraneserna är sanna, och de första värdena inom den första parantesen eller den andra parantesen är sanna så tas attributet disable bort. Om inte detta uppfylls sätts attributet disabled.
    if (checkNameInputOk && checklastNameInputOk && messageAdressOk && messagePostnumberOk && messageCityOk && messagePhoneNumberOk && messageeMailOk && messagegdprOk && ((creditCard.checked && messageCardNROk && messageMonthyearOk && messageCVCOk) || (inVoice.checked && personNROk))){
        orderButton.removeAttribute('disabled');    
    } else {
        orderButton.setAttribute('disabled', ''); 
    }
}

/*----------------------------------------------------------------------------------------------
------------JS koden för att hantera beställningsknappen.  STOP---------------------------------
-----------------------------------------------------------------------------------------------*/ 



/*-------------------------------------------------------------------------------------------------
------------ Faktura försvinner som betalsätt om man handlar för mer än 800 kr --------------------
-------------------------------------------------------------------------------------------------*/ 



function maxSummaryNoInvoice(){
    const totalSumInvoice = document.querySelector('#totalAmountBasket');    //Hämtar totalsumman att testa på.
    //const maxSummary = document.querySelector('');               //Detta värde är funktionen till för. 
    const invoiceStop = document.querySelector('#invoice');              //Kanppen till fakturan. 
    const errorMessageInvoice = document.querySelector('#errorMessageInvoice')
    const cardRadioButton = document.querySelector('#creditcard')

    if (totalSumInvoice.children[0].innerHTML > 800){                    //Om summan är över 800 
        invoiceStop.setAttribute('disabled', '');                        //är inte knappen längre klickabar     
        invoiceStop.checked = false;               //Värdet radiobutton = falsk
        activateOrderButton();                      
        //Skickar det falska värdet till Sublit så den gråas om värdet i VK går ner under 800 igen. 
        //Om inte så skickas uppgifterna i det dolda iväg om man skrivit i dem och sänker priset.
        cardRadioButton.checked = true;             //Kort radiobutton blir ikryssad
        showCardInfo();                             //Fälten för kortinfo visas.
        errorMessageInvoice.innerHTML = 'Faktura ej tillåten vid köp över 800 kr';  //Meddelande till kunden.  
        errorMessageInvoice.removeAttribute('hidden');      //Meddelander syns på skärmen           
    } else {
        invoiceStop.removeAttribute('disabled');              //Fakturaknappen syns
        errorMessageInvoice.setAttribute('hidden', '');       //Felmeddelandet döljs. 
    }
}

/*--------------Faktura försvinner Slut ------------------------------------------------------------*/


/**
 * När man klickar på kort ska korinformation visas och när vi klickar på form ska personnr visas
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
/*
const ResetButtonResetInTime = document.querySelector('.reset_form_button')
const ResetDonutBasketInTime = document.querySelector('#emptyBasketBtn')
*/
/*
function eventListnerToForm(){




}

let ticker;

function Timer(){
    ticker = setInterval(ResetAllInTime, 900 * 1000);
    
    
}



function ResetAllInTime(){
När timern når 15 min,  
console.log(ResetAllInTime);
}*/








/*
Lägga till från uppgiften: 
[x]Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. 
[x]Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. 
att man fyllt i korrekt personnummer.
[x] Om kort väljs som betalsätt, visas fält för kortnummer, datum/år och CVC. Dessa behöver 
inte valideras!
[x] Checkbox för godkännande av behandling av personuppgifter
[x]Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
[x]Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka 
om det finns några fel
[x]Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
[x]När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad
[x]Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom 
  eventuella beställda munkar/produkter (alltså antalet återställs till 0) 
  (Det ska finnas ett fält för att mata in en rabattkod.)*/


/*---------------------------------------------------------------------------------------------------
--------------------- Jultemat ----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------*/


//const today = new Date('December 24, 69 00:20:18');                         //För test av julafton
const today = new Date();                                             //Dagens datum
if(today.getDate() == 24 && today.getMonth() == 11)                         //Om dagens datum är 24 dec
{
    const santaVagon = document.querySelector('.fa-shopping-cart');     //Hämtar vagnen
    santaVagon.style.color = 'red';                                     //Ändra Color på vagnen
    const santaH1 = document.querySelector('h1');                       //Hämtar H1    
    santaH1.style.color = 'black';                                      //Ändra färg på text i H1
    santaH1.style.paddingTop = '100px';                                 //Ändrad padding så texten passar ny bild
    santaH1.style.textShadow = '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff'; // Skugga gör mer kontrast
    const santaheader = document.querySelector('header').style.backgroundImage = 'url("images/santaDonuts.jpg")';                  //Ändra bakgrundsbild headern
    const santaPrice = document.querySelectorAll('#donutCardPrice');       //Röd färg på priset
    for (let i = 0 ; i < santaPrice.length ; i++){                          //Loopar så alla munkar får rött pris
      santaPrice[i].style.color = 'red';  
    }
    const santaBasket = document.querySelector('#shopping-basket').style.backgroundColor = 'brown';                    //Byt bagrundfärg i varukorg
    const santaForm = document.querySelector('.section-form').style.backgroundImage = 'url("images/hallonchokladInzoom.jpg")';         //Byta balgrundsbild i form
    const santaInfo = document.querySelector('.informationUlContainer').style.backgroundColor = 'green'; //Ändrad färg i info
    const Santafooter = document.querySelector('footer');                   //Hämtar footern
    Santafooter.style.backgroundColor = 'green';                            //Ändrad bakgrundsfärg i footern
    Santafooter.style.color = 'white';                                      //Ändrar färg på text till vit. Bättre kontrast.
}


/*---------------------------------------------------------------------------------------------------
---------------------- Delivery Time Code -----------------------------------------------------------
---------------------------------------------------------------------------------------------------*/









