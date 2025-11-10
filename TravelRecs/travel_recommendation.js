const url = "travel_recommendation_api.json";

document.getElementById('search').addEventListener('submit', function(event) {
    event.preventDefault();

    var searchQuery = document.getElementById("SearchBar").value.toLowerCase();
    var div = document.getElementById("searchResult");
    div.innerHTML="";

    fetch(url)
    .then(Response => Response.json())
    .then(data => 
    {
           const input = searchQuery.toLowerCase().trim();  
           const key = Object.keys(data).find(
            k => k.includes(input) || input.includes(k.slice(0, -3)));

                if (searchQuery === "") {
                    return;
                }

            switch(key){
                case "countries":
                    for (let index = 0; index < data[key].length; index++) {
                        var name = document.createElement("h2");
                        var description =document.createElement("p");

                        name.textContent=data[key][index].name;
                        div.appendChild(name);  

                        for (let index2 = 0; index2 < data[key][index].cities.length; index2++) {
                            var cityDiv = document.createElement("div")
                            let cityName = document.createElement("h3");
                            let cityDescription =document.createElement("p");

                            cityName.textContent=data[key][index].cities[index2].name;
                            cityDiv.appendChild(cityName);
                            
                            cityDescription.textContent=data[key][index].cities[index2].description;
                            cityDiv.appendChild(cityDescription);

                            div.appendChild(cityDiv);
                        }
                                     
                    };
                    break;
                default:
                    for (let index = 0; index < data[key].length; index++) {
                        var name = document.createElement("h2");
                        var description =document.createElement("p");

                        name.textContent=data[key][index].name;
                        description.textContent=data[key][index].description;
                        
                        div.appendChild(name);
                        div.appendChild(description);                
                    };
                    break;
            };
    }
    )
    .catch(error => console.error(error));
});

document.getElementById('clearbtn').addEventListener('click', function() {
    document.getElementById("SearchBar").value="";
    document.getElementById("searchResult").innerHTML="";    

});