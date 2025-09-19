// targetWords est défini dans wordleData.js
// champs de saisie
const letters_in = document.getElementById("letters-in")
const letters_out = document.getElementById("letters-out")
const letter_1 = document.getElementById("letter-in-1")
const letter_2 = document.getElementById("letter-in-2")
const letter_3 = document.getElementById("letter-in-3")
const letter_4 = document.getElementById("letter-in-4")
const letter_5 = document.getElementById("letter-in-5")
const badletter_1 = document.getElementById("letter-notin-1")
const badletter_2 = document.getElementById("letter-notin-2")
const badletter_3 = document.getElementById("letter-notin-3")
const badletter_4 = document.getElementById("letter-notin-4")
const badletter_5 = document.getElementById("letter-notin-5")

// bouton
const findWord = document.getElementById("findWord")

findWord.addEventListener("click", () => {
  // testInputs()
  // lettres connues
  const _in_ = letters_in.value.toLowerCase()

  if (_in_ === "") {
    alert("Vous devez entrer au moins une lettre présente dans le mot à deviner")
    return
  }

  // conserver les mots contenant toutes les lettres connues

  const t1 = targetWords.filter( (mot) => {
    for (i=0; i < _in_.length; i++) {
      if (! mot.includes(_in_.charAt(i))) return false
    }
    return true
  })

  // t1 contient un sous ensemble de targetWords composés des mots
  // contenant TOUTES les lettre présentes dans le mot à découvrir

  // éliminer les mots contenant les lettres non présentes
  const _out_ = letters_out.value.toLowerCase()
  
  var t2 = t1.filter( (mot) => {
    for (i=0; i < _out_.length; i++) {
      if (mot.includes(_out_.charAt(i))) return false
    }
    return true
  })

  // t2 un sous ensemble de t1 composés des mots
  // qui contiennent une lettre absente dans le mot à découvrir

  dispArray(t2)

  // tenir compte des lettres bien placées
  // array des lettres bien placées (? pour valeur manquante)
  const wellPlaced = []
  wellPlaced.push(letter_1.value === "" ? "?" : letter_1.value.toLowerCase())
  wellPlaced.push(letter_2.value === "" ? "?" : letter_2.value.toLowerCase())
  wellPlaced.push(letter_3.value === "" ? "?" : letter_3.value.toLowerCase())
  wellPlaced.push(letter_4.value === "" ? "?" : letter_4.value.toLowerCase())
  wellPlaced.push(letter_5.value === "" ? "?" : letter_5.value.toLowerCase())

  // console.log(wellPlaced)
  
  wellPlaced.forEach(function(letter, index) {
    if (letter !=  "?") {
      t2 = t2.filter( (mot) => {
        return mot.charAt(index) === wellPlaced[index]
      })
    }
  })
  
  dispArray(t2)
  
  // tenir compte des lettres mal placées
  const wrongPlaced = []


  const map = new Map()



if ( badletter_1.value != "") map.set(0, badletter_1.value.toLowerCase())
if ( badletter_2.value != "") map.set(1, badletter_2.value.toLowerCase())
if ( badletter_3.value != "") map.set(2, badletter_3.value.toLowerCase())
if ( badletter_4.value != "") map.set(3, badletter_4.value.toLowerCase())
if ( badletter_5.value != "") map.set(4, badletter_5.value.toLowerCase())

//  rejeter les mots contenant la lettre mal placée
t2 = t2.filter( (mot) => {
    // test de toutes les lettres 
    // avec accepted vrai le mot est conservé
    accepted = true
    for (const [key, value] of map) {
      if (mot.charAt(key) === value) accepted = false
      // console.log(`Testing ${value} with ${mot.charAt(key)} at ${key} for ${mot} gives ${accepted} `)
    }
    return accepted
})

  dispArray(t2)

})

function dispArray( array ) {
  const codeArea = document.querySelector("#solutions > code")
  if (array.length > 0 )  
      codeArea.textContent = array.join(", ")
  else 
    codeArea.textContent = "Aucun résultat !";
}

function testInputs() {
  // pour tests de saisie uniquement
  console.log("L in  : " + letters_in.value)
  console.log("L out : " + letters_out.value)
  console.log("L1 : " + letter_1.value)
  console.log("L2 : " + letter_2.value)
  console.log("L3 : " + letter_3.value)
  console.log("L4 : " + letter_4.value)
  console.log("L5 : " + letter_5.value)

}
