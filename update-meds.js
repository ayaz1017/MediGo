const fs = require('fs');
const content = fs.readFileSync('src/data/medicines.ts', 'utf8');
const arrayString = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);

let medicines = [];
try {
  medicines = eval(arrayString);
} catch (e) {
  console.error("Eval failed", e);
  process.exit(1);
}

const updated = medicines.map((m, i) => {
  const images = [m.imageUrl];
  for (let j = 1; j <= 3; j++) {
    images.push(`/products/catalogue-${(i + j) % 49 + 1}.jpg`);
  }
  return {
    ...m,
    genericName: m.composition.split(' ')[0],
    images,
    packSize: '1 Strip of 10 Tablets',
    dosage: 'As directed by the physician',
    manufacturer: m.brand,
    faqs: [
      { question: 'What is this medicine used for?', answer: 'It is used as described in the product overview.' },
      { question: 'Is it safe during pregnancy?', answer: 'Please consult your doctor before using this medicine during pregnancy.' }
    ],
    tags: [m.category.replace('-', ' '), 'generic', 'healthcare']
  };
});
const output = `import { Medicine } from "@/types/medicine";\n\nexport const allMedicines: Medicine[] = \n` + JSON.stringify(updated, null, 2) + `;\n`;
fs.writeFileSync('src/data/medicines.ts', output);
