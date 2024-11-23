// main row element to show the hotel list
let mainRow = document.getElementById("HotelList");
let errorMessageElement = document.getElementById("notificationMessage");
let selectSorting = document.getElementById("dropdown-sort");
let selectFilter = document.getElementById("dropdown-filter");

let allHotelsDataCopy = [];

let getData = () => fetch("./api/hotels.json").then(data => data.json());

let getHotelCard = singleHotelData => {
    let a = JSON.parse(localStorage.getItem('fav'));
    if (a !== null) {
        var favIconClass = (!a.find(hotel => hotel.id == singleHotelData.id)) ? "fa-heart" : "fa-heart-red";
    } else {
        var favIconClass = "fa-heart"
    }
     
    return `<div class="col-md-3">
      <div class="card">
        <img class="card-img-top" src="${singleHotelData.img}" alt="Card image">
        <div class="card-body">
          <h6 class="card-title">${singleHotelData.name}</h6>
          <p class="card-text tags" >${singleHotelData.tags}</p>
          <a onclick="markFavourite(this, ${singleHotelData.id})" id="${favIconClass}"><i class="fa fa-heart" ></i><a>
          <div>
            <div class="rating">
                <span class="fa fa-star checked" > ${singleHotelData.rating} </span>
            </div>
             <span class="eta"> ${singleHotelData.eta} MINS </span>
              <a href="#" class="view-menu" >View Menu</a>
              </div>
        </div>
      </div>
</div>`;

}

let generateView = data => data.map(hotel => getHotelCard(hotel));

let displayAllHotels = () => {
    getData()
        .then(data => {
            allHotelsDataCopy = JSON.parse(JSON.stringify(data));
            mainRow.innerHTML = generateView(data).join('')
        })
        .catch(error => errorMessageElement.innerText = "Something bad Happend!! We are Working on it")
}

displayAllHotels();

function searchResult() {
       console.log("called!!")
       let d = document.getElementById("myInput");
       let searchMatchingHotels = allHotelsDataCopy.filter(hotel => hotel.tags.toString().toUpperCase().indexOf(d.value.toUpperCase()) > -1)
       mainRow.innerHTML = generateView(searchMatchingHotels).join('')
       errorMessageElement.innerText = (searchMatchingHotels == 0) ? `No hotels Found for ${d.value}` : '';
}

let debounce = (fn, delay) => {
    let timeout;
    return function () {
       clearTimeout(timeout)
       timeout = setTimeout(()=> fn(), delay)
    }
}
let search = debounce(searchResult, 400);

selectSorting.addEventListener("click", e => {
    if (e.target.innerText === "Sort by ETA") {
        let sortByEta = allHotelsDataCopy.sort((hotel1, hotel2) => hotel1.eta - hotel2.eta);
        mainRow.innerHTML = generateView(sortByEta).join('');
    } else if (e.target.innerText === "Sort by Rating") {
        let sortByRating = allHotelsDataCopy.sort((hotel1, hotel2) => hotel2.rating - hotel1.rating);
        mainRow.innerHTML = generateView(sortByRating).join('');
    }
})

selectFilter.addEventListener("click", e => {
    let filteredHotels = allHotelsDataCopy.filter(hotel => hotel.tags.toString().toUpperCase().indexOf(e.target.innerText.toUpperCase()) > -1);
    mainRow.innerHTML = generateView(filteredHotels).join('');
    errorMessageElement.innerText = (filteredHotels.length == 0)? `No Restro belong to ${e.target.innerText}` : '';
})

function markFavourite(abc, id) {
    if (!localStorage.getItem("fav")) {
         var a = [];
         localStorage.setItem('fav', JSON.stringify(a));
    }
    var a = [];
    a = JSON.parse(localStorage.getItem('fav'));
    let markedHotel = allHotelsDataCopy.filter(hotel => hotel.id == id);
    if (!a.find(hotel => hotel.id == id)) {
        a.push(...markedHotel);
        abc.setAttribute("style", "color: red !important;");
    } else {
        let indexOfExistingHotel = a.indexOf(a.find(hotel => hotel.id == id));
        a.splice(indexOfExistingHotel, 1);
        abc.setAttribute("style", "color: white !important;");
    }
    localStorage.setItem('fav', JSON.stringify(a));
}

function seeAllFavouriteRestro() {
    let allFavourite = JSON.parse(localStorage.getItem("fav"));
    mainRow.innerHTML = generateView(allFavourite).join('');
    errorMessageElement.innerText = (allFavourite.length == 0)? "No Favourite Selected Yet!!" : '';
}
