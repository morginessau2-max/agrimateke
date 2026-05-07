// A farmer object 
const farmer = {
    name: 'Essau Morgin',
    county: 'Nairobi',
    farm_name: "Morgin's Farm",
    crops: ['maize', 'kales', 'tomatoes'],
    livestock:{
        layers: 120,
        broilers: 220,
        dairy: 8
    }
};
//Access and print different properties of the object farmer
console.log(farmer.name)
console.log(farmer.county)
console.log(farmer.farm_name)
console.log(farmer.crops)
console.log(farmer.livestock)
// loop through all crops
farmer.crops.forEach(function(crop) {
    console.log('Growing:',crop)
})
//Add a new crop to the array
farmer.crops.push('beans')
console.log('After adding beans:',farmer.crops)
// Find only crops that start with the letter 't'
const cropsWithT = farmer.crops.filter(function(crop) {
    return crop.startsWith('t')
})
console.log('Crops starting with t:',cropsWithT)
// Transform  the crops array to uppercase
const upperCasecrops = farmer.crops.map(function(crop){
    return crop.toUpperCase()
})
console.log('Uppercase crops:',upperCasecrops)

// Arrow function - shorter way to write functions
// old way
const oldDouble = function(number){
    return number * 2
}
// Arrow function way (what React uses)
const double = (number) => number * 2
console.log('oldDouble(5):', oldDouble(5)) // 10
console.log('double(5):', double(5)) // 10 but cleaner code

//Real AgriMateKe example
// Calculate total revenue from all sales 
const sales = [
    {item: 'Eggs', total: 12600},
    {item: 'Kales', total: 2800},
    {item: 'Milk', total: 6600},
    {item: 'Broilers', total: 13000},
]

// reduce - collapses an Array into a single value 
const totalRevenue = sales.reduce((sum, sale) => {
    return sum + sale.total
}, 0) // 0 is the initial value
console.log('Total revenue : Ksh ' , totalRevenue)
// Now with arrow functions + map - get only item names 
const itemNames = sales.map(sale => sale.item)
console.log('Items sold:', itemNames)
// filter + arrow - sales above 5000
const bigsales = sales.filter(sale => sale.total > 5000)
console.log('Big sales:', bigsales)