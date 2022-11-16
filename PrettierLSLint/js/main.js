/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Donut -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Få knapparna att fungera i Donutsection

/*let subtractBtn = document.querySelector('#subtract');

let currentCount = document.querySelector('#currentCount');

subtractBtn.addEventListener('click', removeNumber);

function removeNumber (){

    if(currentCount.value > 0){

        currentCount.value -= 1;

    }

}

 /*Add one when addBtn is clicked

let addBtn = document.querySelector('#add');

addBtn.addEventListener('click', addNumber);

function addNumber (e) {

    let amount = Number(currentCount.value);

    currentCount.value = amount + 1;  

}  */

const decreaseButtons = document.querySelectorAll('button[data-operator="minus"]');                            //Plockar upp alla knappar, som innehåller minus. 
//let currentCount = document.querySelectorAll('#currentCount');              
const indecreaseButtons = document.querySelectorAll('button[data-operator="plus"]');                                   //Plockar upp alla knappar, som inenhåller plus.

for (let i = 0; i < decreaseButtons.length; i++) {                                                              // Startar från 0 munkar, varar så länge man addar buttons, ökar med ett i värde. 
    decreaseButtons[i].addEventListener('click', decreaseCount);                                                //När man trycker på knappen minskar summan med 1
    indecreaseButtons[i].addEventListener('click', increaseCount);                                                //När man trycker på knappen ska antalet öka med 1

    console.log(decreaseButtons[i]);                                                      //test2
}

function increaseCount(e) {
    const amountEl = e.currentTarget.parentElement.querySelector('.amount');

    let amount = Number(amountEl.innerText);

    amountEl.innerText = amount + 1;

    //console.log(increaseCount); 

 //   updateDonutSum(e.currentTarget.parentElement);
}


function decreaseCount(e) {
    const amountEl = e.currentTarget.parentElement.querySelector('.amount'); 
    
    let amount = Number(amountEl.innerText);                                                                   //Eller innerHTML eller .textContent

    
    if (amount - 1 < 0){                                                                                       
        return;
    }

    amountEl.innerHTML = amount - 1;

//    updateDonutSum(e.currentTarget.parentElement);                                                              //Summan ska uppdateras på hur många vi har beställt.
}
/*
function updateDonutSum(donutElement) {                                                                     
    const donutSinglePrice = donutElement.querySelector('.price').innerHTML;                                    //Leta upp priset
    const orderedAmount = donutElement.querySelector('#currentCount').innerHTML;                                      //Antal munkar

    const sum = donutSinglePrice * orderedAmount;                                                               //Summa pris*antal

    donutElement.querySelector('.sum').innerHTML = sum + ' kr';                                                 //
    console.log(sum + 'kr'); 
}*/

/*-----------------------------------------------------------------------------------------------
------------------ Basket -----------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/

/*
Att göra i JS under varukorg efter cssen:
* Valda munkar ska in under namn, bild, antal, summa. 
* rabattkod ska kunna läggas in. 
* totalsumma, rabatt och summa att betala ska läggas in. 

Varukorg:               Delsumma:
Namn på munk
bild
antal                   Summa

Namn på munk
bild
antal                   Summa

Namn på munk
bild 
antal                   Summa

Använd rabattkod 

Totalsumma:
Dragen rabatt:
Summa att betala:


<Lägga in från uppgiften:
Lägg gärna in om ni hittar mer som ska in här???????
*/



/*-----------------------------------------------------------------------------------------------
------------------- Form ------------------------------------------------------------------------
------------------------------------------------------------------------------------------------*/
const creditcardButton = document.querySelector('#creditcard')
const invoiceButton = document.querySelector('#invoice')

/*
const card = document.querySelector('#cardplay');
const invoice = document.querySelector('#cardplay');
*/

element.classList.add("my-class");


creditcardButton.addEventListener('click', showContent1);
invoiceButton.addEventListener('click', showConten2);

function showContent1(){
    document.querySelector('#cardplay').style.display = 'block';
    document.querySelector('#personnr').style.display = 'none';
}

function showContent2(){
    document.querySelector('#cardplay').style.display = 'none';
    document.querySelector('#personnr').style.display = 'block';
}


/*
Att lägga till i js designmässigt/användarvänligt. 
* krav på bokstäver i text
* Krav på att något av betalsätten ska fyllas i.
* Nyhetbrev ska vara ifyllt från början. 
* Gatuaderss ska innehålla både bokstäver och siffror? 
* postnummer innehålla 5 siffror 

Lägga till från uppgiften: 
* Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. 
Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. 
att man fyllt i korrekt personnummer.
* Om kort väljs som betalsätt, visas fält för kortnummer, datum/år och CVC. Dessa behöver 
inte valideras!
* Checkbox för godkännande av behandling av personuppgifter
* Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
* Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka 
om det finns några fel
* Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
* När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad
* Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom 
  eventuella beställda munkar/produkter (alltså antalet återställs till 0) 
  (Det ska finnas ett fält för att mata in en rabattkod.)*/