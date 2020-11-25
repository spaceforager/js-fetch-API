// fetch('https://swapi.co/api/planets')
// 	//this resolves with a response object which has a 'status' property among others
// 	.then((response) => {
// 		/*When we make a request, we get a response object back--the content of that response is included as a readable stream. A massive amount of data that we can access and process as we go. We have to be aware of how we read that stream. The .json() method called on response reads it to completion. The stream could be large and reading it could take a while.
//         The .json() returns another promise.

//         Fetch will only return a rejected promises if the internet is not working, or if something is wrong with the network. Not when the status is 404.*/

// 		if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);

// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log('Fetched all planets: First 10');
// 		for (let planet of data.results) {
// 			console.log(planet.name);
// 		}
// 		const filmURL = data.next;
// 		return fetch(nextURL);
// 	})
// 	.then((response) => {
// 		checkStatusAndParse();
// 	})
// 	.then((data) => {
// 		console.log('Fetched next 10 planets');
// 		for (let planet of data.planets) {
// 			console.log(planet);
// 		}
// 	})
// 	.catch((err) => {
// 		console.log('SOMETHING WENT WRONG WITH FETCH');
// 		console.log(err);
// 	});

// REFACTORING FETCH: Using a standalone function to check for response status and to do the above (with fewer lines of code)

const checkStatusAndParse = (response) => {
	if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);

	return response.json();
};

const printPlanets = (data) => {
	console.log('Loaded 10 more planets');
	for (let planet of data.results) {
		console.log(planet.name);
	}
	//As long as a promise is returned, a .then() can be chained on
	return Promise.resolve(data.next);
};

const fetchNextPlanets = (url = 'https://swapi.co/api/planets') => {
	return fetch(url);
};

fetchNextPlanets()
	//this resolves with a response object which has a 'status' property among others
	.then(checkStatusAndParse)
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(checkStatusAndParse)
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(checkStatusAndParse)
	.then(printPlanets)
	.catch((err) => {
		console.log('SOMETHING WENT WRONG WITH FETCH');
		console.log(err);
	});




// AN EVEN BETTER AWAY: AXIOS 

