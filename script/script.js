function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "albums.xml", true);
  xmlhttp.send();
}

function unhideButtons() {
  var button = document.getElementsByClassName("sortAlbums");
  for (var i = 0; i < button.length; i++) {
    button[i].style.display = "inline-block";
  }
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table =
    "<tr><td>Name</td><td>Artist</td><td>Year</td><td>Streams</td></tr>";
  var x = xmlDoc.getElementsByTagName("album");
  for (i = 0; i < x.length; i++) {
    table +=
      "<tr><td>" +
      x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("artist")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("year")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("streams")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }
  document.getElementById("list").innerHTML = table;
}

function sortAlbums(sortBy) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var xml = this.responseXML;
      var albums = Array.from(xml.getElementsByTagName("album"));
      albums.sort(function (a, b) {
        var valA = a.getElementsByTagName(sortBy)[0].textContent.toLowerCase();
        var valB = b.getElementsByTagName(sortBy)[0].textContent.toLowerCase();

        if (sortBy === "year" || sortBy === "streams") {
          return parseInt(valB) - parseInt(valA); 
        } else {
          return valA.localeCompare(valB); 
        }
      });
      var table = "<tr><td>Name</td><td>Artist</td><td>Year</td><td>Streams</td></tr>";
      for (var i = 0; i < albums.length; i++) {
        var name = albums[i].getElementsByTagName("name")[0].textContent;
        var artist = albums[i].getElementsByTagName("artist")[0].textContent;
        var year = albums[i].getElementsByTagName("year")[0].textContent;
        var streams = albums[i].getElementsByTagName("streams")[0].textContent;

        table += `<tr><td>${name}</td><td>${artist}</td><td>${year}</td><td>${streams}</td></tr>`;
      }

      document.getElementById("list").innerHTML = table;
    }
  };
  xmlhttp.open("GET", "albums.xml", true);
  xmlhttp.send();
}
