const apiKey = '2dl5Bj0sqUyBMfyO6TJPHo8VnDyDAC4NkYX2ROZR';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

const stateCodesArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

// creates a function that returns an array of query string parameters
function formatQueryParams(params){
    
    // console.log(Object.keys(params));
    
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems);
    return queryItems.join('&');
}

// function to map through response.data and display on page
function displayParks(data){
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    
    console.log(data)
    data.forEach(park => {
        console.log(park.fullName);
        console.log(park.description);
        console.log(park.url);
        $('#results-list').append(`
            <li>
                
                    <h4>${park.fullName}</h4>
                    <p>${park.addresses[0].city}, ${park.addresses[0].line1}, ${park.addresses[0].postalCode}<p>
                    <p>${park.description}</P>
                    <p><a href="${park.url}">Click for more information<a></p>
                    
            </li>
        `)

})
}

// function to fetch api of National parks
function getNationalParks(query, maxResults){
    const params = {
        api_key: apiKey,
        stateCode: query,
        part: 'snippet',
        limit: maxResults,
    };
    
    const queryString = formatQueryParams(params);
    console.log(queryString);
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(response => displayParks(response.data))
}







function watchForm(){
    $('#js-form').on("submit", (e) => {
    
        e.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();

        
        getNationalParks(searchTerm,maxResults);
    });
}



// prevents any jquery code from running until the page loads. 

// $(watchForm);
watchForm();