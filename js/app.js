import { languages } from "./data/languages.js";

// selectores o seleectors 
const translateOne = document.querySelector('.translate__uno');
const translateTwo = document.querySelector('.translate__dos');
const btnChange = document.getElementById('change');
const translateFrom = document.querySelector('.translate__from');
const translateTo = document.querySelector('.translate__to');
const btnTranslate = document.querySelector('.translate__btn');
const readBtn = document.querySelectorAll('.read');
const listenBtn = document.querySelector('.listen');


// variables
const fragment = document.createDocumentFragment();
const fragmentTwo = document.createDocumentFragment();
const language1 = "es-ES";
const language2 = "en-GB"; 

for (const iterator of languages) {
    const keys = Object.keys(iterator).toString();
    const values = Object.values(iterator).toString();
    const option = document.createElement('option');
    const optionTwo = document.createElement('option');
    option.textContent = values;
    optionTwo.textContent = values;
    option.value = keys;
    optionTwo.value = keys;
    fragment.appendChild(option);
    fragmentTwo.appendChild(optionTwo);
}

translateOne.appendChild(fragment);
translateTwo.appendChild(fragmentTwo);

translateOne.value = language1;
translateTwo.value = language2;

// Eventos o Events
eventListeners();
function eventListeners(){
    btnTranslate.addEventListener('click', translate);
    btnChange.addEventListener('click', switchChange);
    readBtn.forEach((read, index) => {
        read.addEventListener('click', () => readTranslate(index));
    });
    listenBtn.addEventListener('click', () => {
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.start();
        recognition.onResult = (e) => {
            const {confidence, transcript} = e.results[0][0];
            translateFrom.value = transcript;
        }
    })
}

// funciones o functions
async function translate(){
    const url = `https://api.mymemory.translated.net/get?q=${translateFrom.value}&langpair=${translateOne.value}|${translateTwo.value}`;

    if (!translateFrom.value) {
        return;
    }
    
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    const datos = await respuesta.responseData.translatedText;
    showTranslate(datos);

}

function showTranslate(text){
   translateTo.value = text;
}

function switchChange(){
    const firstValue = translateOne.value;
    translateOne.value = translateTwo.value;
    translateTwo.value = firstValue;
    
    if (!translateTo.value) {
        return;
    }
    const fromText = translateFrom.value;
    translateFrom.value = translateTo.value;
    translateTo.value = fromText;
}

function readTranslate(index){
    const textToRead = index === 0 ? translateFrom.value : translateTo.value;
            
    if (!textToRead) {
        return;
    }
    speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead));
}