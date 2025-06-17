class City{
    constructor(name){
        this.name = name;
        this.adjacent_cities = {};
    }

    addAdjacentCity(city, flowAndCapacity){
        this.adjacent_cities[city.name] = flowAndCapacity;
        city.adjacent_cities[this.name] = {flow: 0, capacity: 0};
    }

    removeAdjacentCity(city){
        delete this.adjacent_cities[city.name];
    }
}

class MaximumFlow{
    constructor(){
        this.all_cities = {};
        this.paths = [];
    }

    registerCity(city){
        this.all_cities[city.name] = city;
    }

    DFS(source, sink, visited_cities = {}){
        if(source.name == sink.name){
            return true;
        }

        visited_cities[source.name] = true;

        for(let adjacent in source.adjacent_cities){
            let edge = source.adjacent_cities[adjacent];
            if(visited_cities[adjacent]){
                continue;
            }else if(edge.capacity - edge.flow > 0){
                this.paths.push(source);

                if(this.DFS(this.all_cities[adjacent], sink, visited_cities) == true){
                    return true;
                }else{
                    this.paths.pop();
                }
            }
        }

        return false;
    }

    FordFulkerson(source, sink){
        let total = 0;

        while(this.DFS(source, sink)){
            this.paths.push(sink);
            let currentPathFlow = Infinity;

            for(let i = 0; i < this.paths.length - 1; i++){
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                let edge = currentCity.adjacent_cities[nextCity.name];
                currentPathFlow = Math.min(currentPathFlow, (edge.capacity - edge.flow));
            }

            for(let i = 0; i < this.paths.length - 1; i++){
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                currentCity.adjacent_cities[nextCity.name].flow += currentPathFlow;
                nextCity.adjacent_cities[currentCity.name].flow -= currentPathFlow;
            }

            total += currentPathFlow;
            this.paths = [];
        }

        console.log(total);
    }
}

let city1 = new City("City1");
let city2 = new City("City2");
let city3 = new City("City3");
let city4 = new City("City4");

let maximum_flow = new MaximumFlow();
maximum_flow.registerCity(city1);
maximum_flow.registerCity(city2);
maximum_flow.registerCity(city3);
maximum_flow.registerCity(city4);

city1.addAdjacentCity(city2, {flow: 0, capacity: 1});
city1.addAdjacentCity(city3, {flow: 0, capacity: 2});
city2.addAdjacentCity(city3, {flow: 0, capacity: 1});
city2.addAdjacentCity(city4, {flow: 0, capacity: 2});
city3.addAdjacentCity(city4, {flow: 0, capacity: 2});

maximum_flow.FordFulkerson(city1, city4);