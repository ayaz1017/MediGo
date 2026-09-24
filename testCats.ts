import { allMedicines } from './src/data/medicines';
const cats = new Set(allMedicines.map(m => m.category));
console.log('Available categories:', Array.from(cats));
