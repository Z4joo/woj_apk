var map = L.map('map').setView([52.181169, 21.559253], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.dragging.disable()
var szkola = L.marker([52.181169, 21.559253]).addTo(map).bindPopup("SZKOLA")

console.log(woje)

 map.on("click", addMarker)

 //function addMarker(e) {
 //   
 //   console.log(szkola)
 //  
 //   var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
//
 //   var tab = [[szkola._latlng.lat, szkola._latlng.lng], [e.latlng.lat, e.latlng.lng]]
//
 // var line = L.polyline(tab).addTo(map)
//
 // 
//
 //   
 //}

 function addMarker(e) {
    console.log(szkola)

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

    var tab = [[szkola._latlng.lat, szkola._latlng.lng], [e.latlng.lat, e.latlng.lng]]

    var line = L.polyline(tab).addTo(map)

    var distanceToSchool = e.latlng.distanceTo(szkola.getLatLng()) / 1000 //przeliczanie na km
    console.log('Odległość do SZKOŁY:', distanceToSchool)

    L.popup()
        .setLatLng(e.latlng)
        .setContent('Odległość do SZKOŁY wynosi: ' + distanceToSchool.toFixed(2) + ' km')
        .openOn(map)
}


for (let i = 0; i <= woje.features.length - 1; i++) {
    var wojew = L.geoJSON(woje.features[i], {color:'blue'}).addTo(map)
    

    wojew.on("click", showName)
    // wojew.on("mouseover", setColor)
    // wojew.on("mouseout", setColorPrew)
        
    

    function showName(e){
        console.log(e.layer.feature.properties.nazwa)
    }
}


function setColor(e){
    this.setStyle({
        color: 'purple'
    });

    console.log(e)
}

function setColorPrew(e){
      this.setStyle({
         color: 'blue'
      });

      console.log(e)
}

var wojewodztwa = []
var warstwy = []




for (let i = 0; i <= woje.features.length - 1; i++) {
    var nazwaWojewodztwa = woje.features[i].properties.nazwa    //wyswietlanie wojewodztw w konsoli 
    wojewodztwa.push(nazwaWojewodztwa)
}

console.log(wojewodztwa)


//Losowanie wojwodztwa








// Zmienne globalne
var wylosowaneWojewodztwa = [];
var selectedLayer = null;

// Funkcja losująca województwo
function wylosujWojewodztwo() {
    if (wojewodztwa.length > 0) {
        var index = Math.floor(Math.random() * wojewodztwa.length);
        wylosowaneWojewodztwo = wojewodztwa[index];

        wylosowanyKolor(wylosowaneWojewodztwo);

        document.getElementById("wylosowane").innerHTML = wylosowaneWojewodztwo;

        wojewodztwa.splice(index, 1);
    } else {
        document.getElementById("wylosowane").innerHTML = "Wylosowano wszystkie województwa";
    }
}









function wylosowanyKolor(nazwa) {
    map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === nazwa) {
            layer.setStyle({ color: 'yellow' });
        }
    });
}





// Funkcja zmieniająca kolor zaznaczonego województwa na żółty
function wylosowanyKolor(nazwa) {
    map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === nazwa) {
            layer.setStyle({
                color: 'yellow'
            });
        }
    });
}

// Funkcja sprawdzająca wpisane województwo przez użytkownika

var punkty = 0;
var lives = 3;
var poprawneOdpowiedzi = [];
var niepoprawneOdpowiedzi = [];

function handleWrongAnswer() {
  lives--; // Odejmowanie jednego życia

  if (lives > 0) {
    // Jeśli pozostały jeszcze życia, wyświetl komunikat
    alert("Niepoprawne województwo. Pozostało " + lives + " życia.");
  } else {
    // Gdy wszystkie życia zostały wykorzystane
    document.body.style.backgroundColor = "black"; // Ustawienie tła na czarne
    document.getElementById("map").style.display = "none"; // Ukrycie mapy
    document.getElementById("lives").style.display = "none"; // Ukrycie diva z informacją o życiach

    // Wyświetl komunikat, liczbę punktów i przycisk do rozpoczęcia gry od nowa
    var gameOverMessage = document.createElement("h1");
    gameOverMessage.innerText = "Koniec gry";
    gameOverMessage.style.color = "white"; // Ustawienie koloru tekstu na biały
    document.body.appendChild(gameOverMessage);

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = "Liczba punktów: " + punkty;
    scoreDisplay.style.color = "white"; // Ustawienie koloru tekstu na biały
    document.body.appendChild(scoreDisplay);

    showAnswerLists(); // Wywołaj funkcję wyświetlającą listy odpowiedzi

    var restartButton = document.createElement("button");
    restartButton.innerText = "Rozpocznij grę od nowa";
    restartButton.onclick = function() {
      location.reload(); // Przeładuj stronę, aby zacząć grę od nowa
    };
    document.body.appendChild(restartButton);
  }
}







function Send() {
  var inputPowiaty = document.getElementById("powiaty").value; // Pobranie wartości z inputa

  // Sprawdzenie, czy użytkownik podał wartość
  if (inputPowiaty.trim() === "") {
    // Podświetlenie warstwy wylosowanego województwa na czerwono
    map.eachLayer(function(layer) {
      if (layer.feature && layer.feature.properties.nazwa === wylosowaneWojewodztwo) {
        layer.setStyle({ color: 'red' });
      }
    });
  } else {
    // Sprawdzenie poprawności
    if (inputPowiaty.toLowerCase() === wylosowaneWojewodztwo.toLowerCase()) {
      alert("Poprawne województwo!");
      punkty++; // Dodaj punkt za poprawną odpowiedź
      poprawneOdpowiedzi.push(inputPowiaty); // Dodaj poprawną odpowiedź do listy

      // Znajdź warstwę województwa o poprawnej nazwie i ustaw kolor na zielony
      map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === wylosowaneWojewodztwo) {
          layer.setStyle({ color: 'green' });
        }
      });
    } else {
      handleWrongAnswer(); // Wywołanie funkcji przy błędnej odpowiedzi
      niepoprawneOdpowiedzi.push(inputPowiaty); // Dodaj błędną odpowiedź do listy

      // Znajdź warstwę województwa o podanej nazwie i ustaw kolor na czerwony
      map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === inputPowiaty) {
          layer.setStyle({ color: 'red' });
        }
      });

      // Znajdź warstwę województwa o poprawnej nazwie i ustaw kolor na zielony
      map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === wylosowaneWojewodztwo) {
          layer.setStyle({ color: 'green' });
        }
      });
    }
  }

  // Wyświetl aktualną sumę punktów
  document.getElementById("punkty").innerHTML = "Punkty: " + punkty;
}









// Funkcja wyświetlająca listy poprawnych i niepoprawnych odpowiedzi
function showAnswerLists() {
  var poprawneOdpowiedziHeader = document.createElement("h2");
  poprawneOdpowiedziHeader.innerText = "Lista poprawnych odpowiedzi:";
  poprawneOdpowiedziHeader.style.color = "white"; // Ustawienie koloru tekstu na biały
  document.body.appendChild(poprawneOdpowiedziHeader);

  var poprawneOdpowiedziList = document.createElement("ul");
  for (var i = 0; i < poprawneOdpowiedzi.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerText = poprawneOdpowiedzi[i];
    listItem.style.color = "white"; // Ustawienie koloru tekstu na biały
    poprawneOdpowiedziList.appendChild(listItem);
  }
  document.body.appendChild(poprawneOdpowiedziList);

  var niepoprawneOdpowiedziHeader = document.createElement("h2");
  niepoprawneOdpowiedziHeader.innerText = "Lista niepoprawnych odpowiedzi:";
  niepoprawneOdpowiedziHeader.style.color = "white"; // Ustawienie koloru tekstu na biały
  document.body.appendChild(niepoprawneOdpowiedziHeader);

  var niepoprawneOdpowiedziList = document.createElement("ul");
  for (var j = 0; j < niepoprawneOdpowiedzi.length; j++) {
    var listItem = document.createElement("li");
    listItem.innerText = niepoprawneOdpowiedzi[j];
    listItem.style.color = "white"; // Ustawienie koloru tekstu na biały
    niepoprawneOdpowiedziList.appendChild(listItem);
  }
  document.body.appendChild(niepoprawneOdpowiedziList);
}






  
  





  








// function Send() {
//   var inputPowiaty = document.getElementById("powiaty").value; // Pobranie wartości z inputa
// 
//   // Sprawdzenie poprawności
//   if (inputPowiaty.toLowerCase() === wylosowaneWojewodztwo.toLowerCase()) {
//     alert("Poprawne województwo!");
//     punkty++; // Dodaj punkt za poprawną odpowiedź
//   } else {
//     alert("Niepoprawne województwo. Spróbuj ponownie.");
//     
//  
// }
// 
//   // Wyświetl aktualną sumę punktów
//   document.getElementById("punkty").innerHTML = "Punkty: " + punkty;
//  }




















window.onload = function() {
    var inputPowiaty = document.getElementById("powiaty");
    inputPowiaty.value = ""; // Resetowanie wartości inputa
  }
  





















// Funkcja zmieniająca kolor zaznaczonego województwa na żółty


// function wylosowanyKolor(nazwa) {
//     map.eachLayer(function (layer) {
//         if (layer.feature && layer.feature.properties.nazwa === nazwa) {
//             layer.setStyle({
//                 color: 'yellow'
//             });
//         }
//     });
// }

// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Zmienna przechowująca informację o tym, czy użytkownik zaznaczył województwo


// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika


























// function wylosujWojewodztwo() {
//     // Sprawdź, czy istnieją jeszcze jakieś województwa do losowania
//     if (wojewodztwa.length > 0) {
//       // Losuj indeks
//       var index = Math.floor(Math.random() * wojewodztwa.length);
//       var wylosowaneWojewodztwo = wojewodztwa[index];
//   
//       // Zaznacz wylosowane województwo na żółto
//       wylosowanyKolor(wylosowaneWojewodztwo);
//   
//       // Aktualizuj wyświetlane informacje
//       document.getElementById("wylosowane").innerHTML = wylosowaneWojewodztwo;
//   
//       // Usuń wylosowane województwo z listy
//       wojewodztwa.splice(index, 1);
//     } else {
//       document.getElementById("wylosowane").innerHTML = "Wylosowano wszystkie województwa";
//     }
//   }
//   
//   function wylosowanyKolor(nazwa) {
//     map.eachLayer(function(layer) {
//       if (layer.feature && layer.feature.properties.nazwa === nazwa) {
//         layer.setStyle({
//           color: 'yellow'
//         });
//       }
//     });
//   }
//   

  
  
































 





 