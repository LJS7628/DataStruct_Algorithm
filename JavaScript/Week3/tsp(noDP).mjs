// 메모이제이션이 없는 외판원 문제 알고리즘
const costs = [
    [0,2,9,0],
    [1,0,6,4],
    [0,7,0,8],
    [6,3,0,0]
];

let min = Infinity;
function tsp(city, visited_cities, unvisited_cities){
    if(unvisited_cities.length == 0){ // 기저조건
        return costs[city][0]; // 마지막 도시에서 시작도시까지 거리
    }

    for(let i = 0; i < unvisited_cities.length; i++){ // 방문하지 않은 도시 순회
        if(costs[city][unvisited_cities[i]] == 0) continue; // 현재 도시라면 건너 뛰기
        // 방문하지 않은 도시를 방문했다고 설정
        visited_cities.push(unvisited_cities[i]); 
        let tempUnvisited_cities = unvisited_cities.filter((item) => item != unvisited_cities[i]);

        min = Math.min(min, tsp(unvisited_cities[i],visited_cities, tempUnvisited_cities) + costs[city][unvisited_cities[i]]); // 현재 도시에서 다음 도시까지 가는 거리 + 다음 거리에서 가장 작은 값들중에서 가장 작은 값들을 더함
    }
    return min;
}
let minimumCost = tsp(0, [], [0,1,2,3]);
console.log(minimumCost);