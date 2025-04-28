function tsp_ls(distance_matrix) {
    let len = distance_matrix.length; 

    //check if there is more than 1 city 
    if (len <= 1) {
        return 0; 
    }

    //start with random route 
    let currentRoute = Array.from({ length: len }, (_, i) => i); 
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]]; 
    }

    //start with random route's length, potentially find something better 
    let minLength = calculateLength(currentRoute, distance_matrix); 
    let maxIterations = len * len; //number of elements in distance_matrix 

    //set maxIterations so that every (i, k) pair could potentially be 
    //randomly chosen, that way it was a throughout check to determine 
    //the shortest possible route 
    for (let j = 0; j < maxIterations; j++) {
        //i and k are random numbers 
        //i is chosen based off the number of matrix elements
        //k is chosen based off the number of matrix elements and is less than i 
        let i = Math.floor(Math.random() * (len - 1)); 
        let k = Math.floor(Math.random() * (len - i - 1)) + i + 1; 

        //calculates new length for every new currentRoute 
        currentRoute = twoOptSwap(currentRoute, i, k); //perform 2optSwap
        let newLength = calculateLength(currentRoute, distance_matrix); 

        //determine the best route and minimum length 
        if (newLength < minLength) {
            minLength = newLength; 
        }
    }

    return minLength;
}

//helper function to calculate the length of a route 
function calculateLength(route, matrix) {
    let total = 0; 
    for (let i = 0; i < route.length - 1; i++) {
        total += matrix[route[i]][route[i+1]]; 
    }
    return total; 
}

//implementation of the 2optSwap pseudocode 
function twoOptSwap(route, i, k) {
    let first = route.slice(0, i); 
    let second = route.slice(i, k + 1).reverse();
    let third = route.slice(k + 1); 
    return first.concat(second, third); 
}
