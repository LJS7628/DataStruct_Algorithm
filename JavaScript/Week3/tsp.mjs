const costs = [
    [0, 2, 9, 0],
    [1, 0, 6, 4],
    [0, 7, 0, 8],
    [6, 3, 0, 0]
];

const dp = Array.from(Array(costs.length), () => Array((1 << costs.length) - 1).fill(Infinity));

function tsp(city, visited_cities){
    if(visited_cities == (1 << costs.length) -1){
        return costs[city][0];
    }

    if(dp[city][visited_cities] != Infinity){
        return dp[city][visited_cities];
    }else{
        for(let i = 0; i < costs.length; i++){
            if((visited_cities & (1 << i)) == 0 && costs[city][i] != 0){
                dp[city][visited_cities] = Math.min(dp[city][visited_cities], costs[city][i] + tsp(i, visited_cities | (1 << i)));
            }
        }

        return dp[city][visited_cities];
    }
}

let minimumCost = tsp(0, 1);
console.log(minimumCost);