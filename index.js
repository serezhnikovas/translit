const buttonAdd = document.querySelector(".form-text__button");
const inputAdd = document.querySelector(".form-text__input");
const buttonClearAll = document.querySelector(".clear-dictionary");
const rusWords = document.querySelector(".rus-dict");
const engWords = document.querySelector(".eng-dict");

const symbols = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ь: "'",
  ы: "y",
  ъ: "'",
  э: "e",
  ю: "yu",
  я: "ya",

  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "E",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "C",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Sch",
  Ь: "'",
  Ы: "Y",
  Ъ: "'",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

function translitText(str) {
  let tranlitedText = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] in symbols) {
      tranlitedText += symbols[str[i]];
    } else {
      tranlitedText += str[i];
    }
  }
  return tranlitedText;
}

function addRusWord() {
  const newRusWord = document.createElement("div");
  const textRus = inputAdd.value;
  if (textRus.length > 7) {
    const tooltipRusWord = document.createElement("div");
    tooltipRusWord.setAttribute("class", "rus-dict__tooltip");
    tooltipRusWord.innerHTML = textRus;
    newRusWord.innerHTML = textRus.slice(0, 7) + "...";
    newRusWord.append(tooltipRusWord);
  } else {
    newRusWord.innerHTML = textRus;
  }
  newRusWord.setAttribute("class", "rus-dict__word");
  rusWords.append(newRusWord);

  makeBorderRadius(".rus-dict__word", "rus-border-radius");
}

function addEngWord() {
  const newEngWord = document.createElement("div");
  const newEngWordText = document.createElement("span");
  const newEngWordClear = document.createElement("span");
  const tranlitedTextEng = translitText(inputAdd.value);
  if (inputAdd.value.length > 7) {
    const tooltipEngWord = document.createElement("div");
    tooltipEngWord.setAttribute("class", "eng-dict__tooltip");
    tooltipEngWord.innerHTML = tranlitedTextEng;
    newEngWord.append(tooltipEngWord);
    newEngWordText.innerHTML = tranlitedTextEng.slice(0, 7) + "...";
  } else {
    newEngWordText.innerHTML = tranlitedTextEng;
  }
  newEngWordClear.innerHTML =
    "<img class='eng-dict__clear' src='./icons/clear.svg' alt='clear-icon'/>";
  newEngWordClear.setAttribute("class", "clear-wrapper");
  newEngWord.setAttribute("class", "eng-dict__word");
  newEngWord.append(newEngWordText, newEngWordClear);
  engWords.append(newEngWord);

  makeBorderRadius(".eng-dict__word", "eng-border-radius");
}

function addNewWord() {
  addRusWord();
  addEngWord();
  inputAdd.value = "";
}

function makeBorderRadius(class1, class2) {
  const allWords = document.querySelectorAll(class1);
  const wordClassList = allWords[0].classList;
  if (wordClassList.contains(class2) && allWords.length > 1) {
    wordClassList.remove(class2);
  } else if (allWords.length === 1) {
    wordClassList.add(class2);
  }
}

function clearAll() {
  const allRusWords = document.querySelectorAll(".rus-dict__word");
  const allEngWords = document.querySelectorAll(".eng-dict__word");
  for (let i = 1; i < allRusWords.length; i++) {
    allRusWords[i].remove();
    allEngWords[i].remove();
  }
  makeBorderRadius(".eng-dict__word", "eng-border-radius");
  makeBorderRadius(".rus-dict__word", "rus-border-radius");
}

engWords.addEventListener("click", (event) => {
  if (event.target.closest(".clear-wrapper")) {
    const engDictWords = document.querySelectorAll(".eng-dict__word");
    const rusDictWords = document.querySelectorAll(".rus-dict__word");
    const arrEngDictWords = Array.from(engDictWords);
    const arrRusDictWords = Array.from(rusDictWords);
    const engDictWord = event.target.closest(".eng-dict__word");
    const indexOfRemovingWord = arrEngDictWords.indexOf(engDictWord);
    const rusDictWord = arrRusDictWords[indexOfRemovingWord];
    if (indexOfRemovingWord > 0) {
      rusDictWord.remove();
      engDictWord.remove();
      makeBorderRadius(".eng-dict__word", "eng-border-radius");
      makeBorderRadius(".rus-dict__word", "rus-border-radius");
    } else {
      alert("Ничего не выйдет, это слово здесь навсегда (:");
    }
  }
});

buttonAdd.addEventListener("click", () => {
  if (inputAdd.value.length > 0) {
    addNewWord();
  }
});

inputAdd.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputAdd.value.length > 0) {
      addNewWord();
    }
  }
});

buttonClearAll.addEventListener("click", () => {
  clearAll();
});
