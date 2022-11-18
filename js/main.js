/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------- Donut -------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*
*Donut cards + and - buttons 
*/
const addBtns = document.querySelectorAll('button[data-operator="plus"]');
const subtractBtns = document.querySelectorAll('button[data-operator="minus"]');

for (let i = 0; i < addBtns.length; i++){
    addBtns[i].addEventListener('click', addNumber)
    subtractBtns[i].addEventListener('click', removeNumber)
}

 /* Add one when + is clicked*/
function addNumber (e) {

    const amountEl = e.currentTarget.parentElement.querySelector('input')
    let amount = Number(amountEl.value);
   
    amountEl.value = amount + 1;
  
}   
 /* Remove one when - is clicked*/
function removeNumber(e){

    const amountEl = e.currentTarget.parentElement.querySelector('input')
    if(amountEl.value > 0){

        amountEl.value -= 1;
    }
}

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
const creditcardBtn = document.querySelector('#creditcard')
const invoiceBtn = document.querySelector('#invoice')

creditcardBtn.addEventListener('click', showCardInfo);
invoiceBtn.addEventListener('click', showPersonNr);

// When card is clicked show kardinformation form
function showCardInfo(){
    document.querySelector('#cardpay').style.display = 'block';
    document.querySelector('#ssn').style.display = 'none';
}

//When invoice is clicked show social security number form
function showPersonNr(){
    document.querySelector('#ssn').style.display = 'block';
    document.querySelector('#cardpay').style.display = 'none';
}


/*
Att lägga till i js designmässigt/användarvänligt. 
* krav på bokstäver i text
* Krav på att något av betalsätten ska fyllas i.
* Nyhetbrev ska vara ifyllt från början. 
* Gatuaderss ska innehålla både bokstäver och siffror? 
* postnummer innehålla 5 siffror 

Lägga till från uppgiften: 
[x]Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. 
[]Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. 
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