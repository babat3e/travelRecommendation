
async function showRecommendation(){
    try {
        const response = await fetch('./travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
        document.getElementById("recommendation").innerHTML =
        "<p>Error loading data. Please try again later.</p>";
        return null;
  }
}



function displayResults(recommendations){
    const recommendationDiv = document.getElementById('recommendation');
    recommendationDiv.innerHTML = '';

    if (recommendation.length === 0){
        recommendationDiv.innerHTML = '<p>No recommendations found.</p>';
        return;
    }

    recommendations.forEach(recommendation => {
        let div = document.createElement('div');
        div.classList.add('home_description');
        div.innerHTML = `
        <img src="./html_images/${recommendation.imageUrl}" alt="${recommendation.name}" 
        style="width:350px;height:auto;">
        <h3>${recommendation.name}</h3>
        <p>${recommendation.description}</p>`;
        recommendationDiv.appendChild(div);
    });
}

function searchJSON(data, query){
    query = query.toLowerCase();
    const results = [];

    if (query === "country" || query === "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({
                    imageUrl: city.imageUrl,
                    name: city.name,
                    description: city.description
                });
            });
        });
    }
    else if (query === "temple" || query === "temples"){
        data.temples.forEach(temple => {
            results.push({
                imageUrl: temple.imageUrl,
                name: temple.name,
                description: temple.description
            });
        });
    }
    else if (query === "beach" || query === "beaches"){
        data.beaches.forEach(beach => {
            results.push({
                imageUrl: beach.imageUrl,
                name: beach.name,
                description: beach.description
            });
        });
    }

    return results;
}

document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("keyword").value;
    if (!query){
        alert("Please enter a search term.");
        return;
    }

    const data = await showRecommendation();
    const results = searchJSON(data, query);
    displayResults(results);
});

document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("keyword").value = "";
    document.getElementById("recommendation").innerHTML = "";
});

