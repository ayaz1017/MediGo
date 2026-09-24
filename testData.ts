import { allMedicines } from './src/data/medicines';
const diabetes = allMedicines.filter(m => m.category.toLowerCase() === 'diabetes' || m.category.toLowerCase().includes('diabet') || m.description.toLowerCase().includes('diabet'));
console.log('Diabetes candidates:', diabetes.map(m => m.name));

const eye = allMedicines.filter(m => m.category.toLowerCase().includes('eye') || m.description.toLowerCase().includes('eye') || m.name.toLowerCase().includes('eye'));
console.log('Eye candidates:', eye.map(m => m.name));

const ayu = allMedicines.filter(m => m.category.toLowerCase().includes('ayurved') || m.description.toLowerCase().includes('ayurved') || m.name.toLowerCase().includes('ayur'));
console.log('Ayurveda candidates:', ayu.map(m => m.name));
