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

const updateMedicineCategory = (m) => {
  const t = (m.name + " " + m.composition + " " + m.description + " " + m.category).toLowerCase();
  
  let newCategory = m.category;
  
  if (t.includes('azithromycin') || t.includes('levofloxacin') || t.includes('ofloxacin') || t.includes('cefpodoxime') || t.includes('antibiotic') || t.includes('bacterial') || t.includes('amoxycillin') || t.includes('cefixime')) {
    newCategory = 'antibiotics';
  } else if (t.includes('rabeprazole') || t.includes('ondansetron') || t.includes('digestion') || t.includes('stomach') || t.includes('gerd') || t.includes('ulcer') || t.includes('acid') || t.includes('pantoprazole') || t.includes('domperidone') || t.includes('nausea') || t.includes('vomit')) {
    newCategory = 'digestion';
  } else if (t.includes('aceclofenac') || t.includes('paracetamol') || t.includes('pain') || t.includes('fever') || t.includes('spasm') || t.includes('analgesic') || t.includes('diclofenac')) {
    newCategory = 'fever-pain';
  } else if (t.includes('telmisartan') || t.includes('atorvastatin') || t.includes('heart') || t.includes('cardiac') || t.includes('blood pressure') || t.includes('cholesterol') || t.includes('hypertension') || t.includes('rosuvastatin') || t.includes('amlodipine') || t.includes('cilnidipine')) {
    newCategory = 'heart';
  } else if (t.includes('metformin') || t.includes('glimepiride') || t.includes('diabetes') || t.includes('sugar') || t.includes('diabet') || t.includes('vildagliptin') || t.includes('dapagliflozin')) {
    newCategory = 'diabetes';
  } else if (t.includes('vitamin') || t.includes('calcium') || t.includes('cholecalciferol') || t.includes('mecobalamin') || t.includes('multivitamin') || t.includes('zinc') || t.includes('mineral')) {
    newCategory = 'vitamins';
  } else if (t.includes('skin') || t.includes('cream') || t.includes('ointment') || t.includes('acne') || t.includes('fungal') || t.includes('lotion') || t.includes('ketoconazole') || t.includes('terbinafine')) {
    newCategory = 'skin-care';
  } else if (t.includes('thyroid') || t.includes('thyroxine') || t.includes('levothyroxine')) {
    newCategory = 'thyroid';
  } else if (t.includes('eye') || t.includes('drop') || t.includes('vision') || t.includes('tears') || t.includes('lubricating')) {
    if (!t.includes('ear')) {
      newCategory = 'eye-care';
    }
  } else if (t.includes('ayurved') || t.includes('herbal') || t.includes('natural') || t.includes('himalaya') || t.includes('dabur')) {
    newCategory = 'ayurveda';
  } else if (t.includes('baby') || t.includes('pediatric') || t.includes('infant')) {
    newCategory = 'baby-care';
  }
  
  // Clean up tags
  let tags = [newCategory.replace('-', ' '), 'generic', 'healthcare'];
  
  // Add additional tags if relevant
  if (t.includes('eye') || t.includes('vision')) tags.push('eye-care');
  if (t.includes('ayurved') || t.includes('herbal')) tags.push('ayurveda');
  if (t.includes('baby') || t.includes('pediatric')) tags.push('baby-care');
  if (t.includes('vitamin') || t.includes('calcium')) tags.push('vitamins');
  
  return {
    ...m,
    category: newCategory,
    tags: Array.from(new Set(tags))
  };
};

const updated = medicines.map(updateMedicineCategory);

const output = `import { Medicine } from "@/types/medicine";\n\nexport const allMedicines: Medicine[] = \n` + JSON.stringify(updated, null, 2) + `;\n`;
fs.writeFileSync('src/data/medicines.ts', output);
console.log("Medicines updated!");

// Show counts
const counts = {};
updated.forEach(m => {
  counts[m.category] = (counts[m.category] || 0) + 1;
});
console.log("Category counts:", counts);
