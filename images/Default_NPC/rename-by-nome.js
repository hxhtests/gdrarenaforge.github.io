// Script per rinominare le miniature da "piano°.png" a "Nome_Cognome.png".
// Esegui dalla cartella Default_NPC: node rename-by-nome.js
const fs = require('fs');
const path = require('path');

const pianoToFileName = {
    1: 'Ibeve_Pitagonus.png',
    10: 'Boki_Luagin.png',
    20: 'Kristoff_Jortek.png',
    30: 'Starius_Mourniol.png',
    40: 'Rey_Budgerigar.png',
    50: 'Damix_Urazuka.png',
    60: 'Oldaf_Mitgefuhl.png',
    70: 'Olga_Strapopovich.png',
    80: 'Sphylos_Tender.png',
    90: 'Oran_Lee.png',
    110: 'Korinna_Fanning.png',
    130: 'Darius_Cerberix.png',
    180: 'Zero-F.png',
    190: 'Red.png'
};

const dir = __dirname;
const files = fs.readdirSync(dir);

files.forEach((file) => {
    const match = file.match(/^(\d+)°\.png$/);
    if (!match) return;
    const piano = parseInt(match[1], 10);
    const newName = pianoToFileName[piano];
    if (!newName) return;
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);
    if (oldPath === newPath) return;
    try {
        fs.renameSync(oldPath, newPath);
        console.log('Rinominato:', file, '->', newName);
    } catch (err) {
        console.error('Errore', file, err.message);
    }
});
