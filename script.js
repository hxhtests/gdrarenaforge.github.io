// Aggiungi all'inizio del file
console.log('Script caricato');

// Funzioni di controllo login
function checkLogin() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Aggiungi controllo login a tutte le pagine tranne login.html
if (!window.location.href.includes('login.html')) {
    checkLogin();
}

// Aggiungi questa costante all'inizio del file, dopo le altre costanti
const VERSION = '1.0.1'; // Incrementa questa versione ogni volta che vuoi forzare un reset
const BACKUP_PREFIX = 'backup_';
const MAX_BACKUPS = 5;

// Costanti per la gestione delle immagini
const IMAGE_CONSTRAINTS = {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxWidth: 1200,
    maxHeight: 1200,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    quality: 0.8
};

// Struttura per gli NPC
class NPC {
    constructor(nome, pianoArenaCeleste, vitaIniziale, destrezza, velocita, riflessi, movesetDifensivo, movesetOffensivo, miniatura, imageUrl) {
        this.nome = nome;
        this.pianoArenaCeleste = pianoArenaCeleste;
        this.vitaIniziale = vitaIniziale;
        this.destrezza = destrezza;
        this.velocita = velocita;
        this.riflessi = riflessi;
        this.movesetDifensivo = movesetDifensivo;
        this.movesetOffensivo = movesetOffensivo;
        this.miniatura = miniatura;
        this.imageUrl = imageUrl;
    }
}

// Struttura per le mosse
class Mossa {
    constructor(descrizione, valore) {
        this.descrizione = descrizione;
        this.valore = valore; // forza per attacco, resistenza per difesa
    }
}

// Costanti per le miniature
const MINIATURA_BASE = `<div align="center"><div style="width:600px; line-height:100%; font-family: georgia; font-size:14px; color: black;text-align: justify; padding: 10px;"><div style="float: left; background-image: url(IMMAGINE_URL); width: 150px; height: 150px; border: 5px solid black; border-radius: 100%; margin-right:5px"></div><div style="width: auto; font-family: times; line-height: 20px; font-size: 20px; color: black; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 1px #7d7459; text-align: right; border-bottom: 5px solid black">NOME_NPC</div></div></div>`;

// Nuova costante per la miniatura nel post generato (ForumCommunity)
const MINIATURA_POST = `<div align="center"><div style="width:600px; line-height:100%; font-family: georgia; font-size:14px; color: black;text-align: justify; padding: 10px;"><div style="float: left; width: 150px; height: 150px; border: 5px solid black; border-radius: 100%; margin-right:5px; overflow: hidden;"><div style="width: 100%; height: 100%; background-image: url(IMMAGINE_URL); background-size: cover; background-position: center;"></div></div><div style="width: auto; font-family: times; line-height: 20px; font-size: 20px; color: black; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 1px #7d7459; text-align: right; border-bottom: 5px solid black">NOME_NPC</div></div></div>`;

const MINIATURA_COMPLETA = `<div align="center"><div style="width:600px; line-height:100%; font-family: georgia; font-size:14px; color: black;text-align: justify; padding: 10px;"><div style="float: left; background-image: url(IMMAGINE_URL); width: 150px; height: 150px; border: 5px solid black; border-radius: 100%; margin-right:5px"></div><div style="width: auto; font-family: times; line-height: 20px; font-size: 20px; color: black; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 1px #7d7459; text-align: right; border-bottom: 5px solid black">NOME_NPC</div><div style="text-align: right; font-family: times; font-size: 14px; padding-top:5px; padding-bottom:3px; padding-left:5px; line-height:90%">Narrato - <i>Pensato</i> - <b>Parlato</b>&nbsp;</div><div style="text-align: justify; font-family: times; font-size: 15px; padding-top:5px; padding-bottom:3px; padding-left:5px; line-height:90%">`;

const MINIATURA_ARBITRO = `\n\n\n\n\n<div align="center"><div style="width:600px; line-height:100%; font-family: georgia; font-size:14px; color: black;text-align: justify; padding: 10px;"><div style="float: left; width: 150px; height: 150px; border: 5px solid black; border-radius: 100%; margin-right:5px; overflow: hidden;"><div style="width: 100%; height: 100%; background-image: url(https://i.imgur.com/zSbKd1D.png); background-size: cover; background-position: center;"></div></div><div style="width: auto; font-family: times; line-height: 20px; font-size: 20px; color: black; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 1px #7d7459; text-align: right; border-bottom: 5px solid black">[color=black]P.L. HILL - ARBITRO[/color]</div><div style="text-align: right; font-family: times; font-size: 14px; padding-top:5px; padding-bottom:3px; padding-left:5px; line-height:90%">Narrato - <i>[color=black]Pensato[/color]</i> - <b>[color=black]Parlato[/color]</b>&nbsp;</div><div style="text-align: justify; font-family: times; font-size: 15px; padding-top:5px; padding-bottom:3px; padding-left:5px; line-height:90%">`;

const ARBITRO_VITTORIA_NPC = MINIATURA_ARBITRO + `L'arbitro alzò una mano, decretando la fine dell'incontro e indicando il vincitore.<b>[color=black]L'incontro è concluso! Il vincitore è "NOME_NPC" [/color]</b></div></div></div>\n\n[SPOILER]INCONTRO TERMINATO! A breve un membro dello Staff esaminerà l'incontro e verranno assegnate le ricompense![/SPOILER]`;

const ARBITRO_VITTORIA_GIOCATORE = MINIATURA_ARBITRO + `L'arbitro alzò una mano, decretando la fine dell'incontro e indicando il vincitore.<b>[color=black]L'incontro è concluso! Il vincitore è "NOME_GIOCATORE" [/color]</b></div></div></div>\n\n[SPOILER]INCONTRO TERMINATO! A breve un membro dello Staff esaminerà l'incontro e verranno assegnate le ricompense![/SPOILER]`;

// Modifica l'inizializzazione di npcList
let npcList = [];

// Funzione per inizializzare la lista NPC
function inizializzaNPCList() {
    try {
        const currentVersion = localStorage.getItem('version');
        
        // Forza il reset se la versione è diversa o non esiste
        if (currentVersion !== VERSION) {
            // Crea backup prima del reset
            creaBackupCompresso();
            
            localStorage.removeItem('npcList');
            localStorage.removeItem('descrizioni');
            localStorage.setItem('version', VERSION);
        }
        
        // Carica i dati dal localStorage
        const savedNPCList = localStorage.getItem('npcList');
        if (savedNPCList) {
            npcList = JSON.parse(savedNPCList);
        }
        
        // Inizializza le descrizioni se non esistono
        if (!localStorage.getItem('descrizioni')) {
            inizializzaEsempiDescrizioni();
        }
    } catch (error) {
        console.error('Errore durante l\'inizializzazione:', error);
        // Tenta di recuperare dal backup più recente in caso di errore
        recuperaUltimoBackup();
    }
}

function recuperaUltimoBackup() {
    try {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('backup_'))
            .sort()
            .reverse();
            
        if (backupKeys.length === 0) {
            throw new Error('Nessun backup disponibile');
        }
        
        // Prova a recuperare l'ultimo backup valido
        for (const key of backupKeys) {
            try {
                const backupData = JSON.parse(localStorage.getItem(key));
                if (backupData && backupData.npcList && backupData.descrizioni) {
                    npcList = backupData.npcList;
                    localStorage.setItem('npcList', JSON.stringify(npcList));
                    localStorage.setItem('descrizioni', JSON.stringify(backupData.descrizioni));
                    console.log('Backup recuperato con successo:', key);
                    return true;
                }
            } catch (e) {
                console.warn('Backup corrotto:', key);
                localStorage.removeItem(key);
            }
        }
        
        throw new Error('Nessun backup valido trovato');
    } catch (error) {
        console.error('Errore durante il recupero del backup:', error);
        alert('Errore durante il recupero del backup: ' + error.message);
        return false;
    }
}

// Funzione di arrotondamento secondo le specifiche
function arrotonda(numero) {
    const parteDecimale = numero % 1;
    if (parteDecimale < 0.5) {
        return Math.floor(numero);
    }
    return Math.ceil(numero);
}

// Funzione unificata per popolare i select degli NPC
function popolaSelectNPC(tipo) {
    const elementId = tipo === 'incontro' ? 'selectNPC' : 'npcSelector';
    const element = document.getElementById(elementId);
    if (!element) return;

    // Ordina gli NPC in base al piano dell'arena
    const npcListOrdinata = [...npcList].sort((a, b) => a.pianoArenaCeleste - b.pianoArenaCeleste);

    const options = npcListOrdinata.map((npc, index) => {
        return `<option value="${npc.nome}">${npc.pianoArenaCeleste}° ${npc.nome}</option>`;
    }).join('');
    
    element.innerHTML = `<option value="">Seleziona un NPC</option>${options}`;
}

// Funzione per mostrare le statistiche dell'NPC selezionato
function mostraStatisticheNPC() {
    const select = document.getElementById('selectNPC');
    const statsDiv = document.getElementById('statsNPC');
    if (!select || !statsDiv) return;

    const npcSelezionato = npcList.find(npc => npc.nome === select.value);
    if (!npcSelezionato) {
        statsDiv.innerHTML = '';
        return;
    }

    // Modifica la struttura della mossa difensiva 5 per supportare entrambe le descrizioni
    const mossaDifensiva5 = npcSelezionato.movesetDifensivo[4];
    if (mossaDifensiva5 && mossaDifensiva5.descrizione.includes('|')) {
        const [descrizioneSuccesso, descrizioneFallimento] = mossaDifensiva5.descrizione.split('|').map(d => d.trim());
        mossaDifensiva5.descrizione = descrizioneSuccesso;
        mossaDifensiva5.descrizioneAlternativa = descrizioneFallimento;
    }

    statsDiv.innerHTML = `
        <h3>Statistiche ${npcSelezionato.nome}</h3>
        <p>Piano Arena Celeste: ${npcSelezionato.pianoArenaCeleste}°</p>
        <p>Vita Iniziale: ${npcSelezionato.vitaIniziale}</p>
        <p>Destrezza: ${npcSelezionato.destrezza}</p>
        <p>Velocità: ${npcSelezionato.velocita}</p>
        <p>Riflessi: ${npcSelezionato.riflessi}</p>
    `;
}

// Funzione per copiare il testo generato
function copiaTestoGenerato() {
    const testoGenerato = document.getElementById('generatedText').textContent;
    navigator.clipboard.writeText(testoGenerato).then(() => {
        alert('Testo copiato negli appunti!');
    }).catch(err => {
        console.error('Errore durante la copia: ', err);
        alert('Errore durante la copia del testo');
    });
}

// Struttura per le descrizioni
let descrizioni = {
    vittoria_npc: [],
    sconfitta_npc: []
};

// Funzione per inizializzare le descrizioni
function inizializzaEsempiDescrizioni() {
    // Forza il reset delle descrizioni rimuovendo sempre quelle esistenti
    localStorage.removeItem('descrizioni');
    
    // Inizializza le descrizioni di esempio
    const descrizioniIniziali = {
        vittoria_npc: [
            "Il lottatore, con un grido di trionfo, alza le mani verso il cielo",
            "Un sorriso di pura soddisfazione illumina il volto del vincitore",
            "La folla esplode in un boato, acclamando il trionfatore",
            "Il combattente, esausto ma vittorioso, si lascia cadere sulle ginocchia, assaporando la vittoria",
            "Con un ultimo, potente colpo, il lottatore si assicura la vittoria, lasciando l'avversario a terra",
            "Il vincitore, con un'espressione di orgoglio, si erge sopra l'avversario sconfitto",
            "Il guerriero, con un gesto di rispetto, offre una mano all'avversario per aiutarlo a rialzarsi",
            "Un'ondata di potere pervade il vincitore, che si gode il momento di gloria",
            "Il combattente, con un'espressione determinata, si prepara per la prossima sfida",
            "Il vincitore, con un cenno del capo, riconosce la forza dell'avversario, nonostante la sconfitta"
        ],
        sconfitta_npc: [
            "Il lottatore cade a terra, privo di sensi, sotto il peso dei colpi ricevuti",
            "Un'espressione di sconcerto si dipinge sul volto del combattente, prima che perda conoscenza",
            "La folla ammutolisce, testimone della brusca caduta del lottatore",
            "Il combattente, esausto e sconfitto, crolla al suolo, perdendo i sensi",
            "La superiorità del nemico era evidente e il lottatore, dopo aver incassato l'ultimo colpo, cade a terra privo di sensi",
            "Il lottatore giace immobile, vittima della potenza del suo avversario",
            "Il guerriero, con un gemito, perde conoscenza, incapace di continuare il combattimento",
            "Un'ondata di debolezza travolge il combattente sconfitto, che crolla al suolo privo di sensi",
            "Il lottatore, con un ultimo sussulto, perde conoscenza, incapace di reagire",
            "Il perdente, con un'espressione di dolore, si accascia al suolo, privo di sensi"
        ]
    };

    // Salva le nuove descrizioni
    localStorage.setItem('descrizioni', JSON.stringify(descrizioniIniziali));
    
    // Carica le descrizioni nella variabile globale
    descrizioni = descrizioniIniziali;
}

// Funzione per salvare una nuova descrizione
async function salvaDescrizione() {
    try {
        const situazione = document.getElementById('selectSituazione').value;
        const descrizione = document.getElementById('txtDescrizione').value;
        
        if (!situazione || !descrizione) {
            throw new Error('Situazione e descrizione sono campi obbligatori');
        }
        
        // Carica le descrizioni esistenti dal localStorage
        descrizioni = JSON.parse(localStorage.getItem('descrizioni') || '{}');
        
        // Inizializza l'array se non esiste
        if (!descrizioni[situazione]) {
            descrizioni[situazione] = [];
        }
        
        // Aggiungi la nuova descrizione
        descrizioni[situazione].push(descrizione);
        
        // Salva nel localStorage
        localStorage.setItem('descrizioni', JSON.stringify(descrizioni));
        
        // Aggiorna la visualizzazione
        mostraDescrizioniPerSituazione(situazione);
        
        // Pulisci il campo dopo il salvataggio
        document.getElementById('txtDescrizione').value = '';
        
        // Mostra un messaggio di successo
        alert('Descrizione salvata con successo!');
        
        // Crea backup dopo il salvataggio
        creaBackupCompresso();
        
        return true;
    } catch (error) {
        console.error('Errore durante il salvataggio della descrizione:', error);
        alert('Errore durante il salvataggio: ' + error.message);
        return false;
    }
}

// Funzione per mostrare le descrizioni di una situazione
function mostraDescrizioniPerSituazione(situazione) {
    const elencoDescrizioni = document.getElementById('elencoDescrizioni');
    const descrizioniSituazione = descrizioni[situazione] || [];
    
    elencoDescrizioni.innerHTML = descrizioniSituazione.map((desc, index) => `
        <div class="descrizione-item">
            <p>${desc}</p>
            <button onclick="eliminaDescrizione('${situazione}', ${index})" class="button">Elimina</button>
        </div>
    `).join('');
}

// Funzione per eliminare una descrizione
function eliminaDescrizione(situazione, index) {
    if (confirm('Sei sicuro di voler eliminare questa descrizione?')) {
        // Rimuovi la descrizione dall'array
        descrizioni[situazione].splice(index, 1);
        
        // Aggiorna il localStorage con le nuove descrizioni
        localStorage.setItem('descrizioni', JSON.stringify(descrizioni));
        
        // Aggiorna la visualizzazione
        mostraDescrizioniPerSituazione(situazione);
    }
}

// Funzione per ottenere una descrizione casuale per una situazione
function getDescrizioneCasuale(situazione) {
    const descrizioniSituazione = descrizioni[situazione];
    if (!descrizioniSituazione || descrizioniSituazione.length === 0) {
        return '';
    }
    const indice = Math.floor(Math.random() * descrizioniSituazione.length);
    return descrizioniSituazione[indice];
}

// Funzione per controllare se l'NPC è sconfitto
function isNPCSconfitto(npc, vitaResidua) {
    const vitaSconfitta = Math.floor(npc.vitaIniziale * 0.05);
    return vitaResidua <= vitaSconfitta;
}

// Modifica la funzione generaPost
function generaPost() {
    // Recupero tutti i valori input
    const npcNome = document.getElementById('selectNPC').value;
    const nomeGiocatore = document.getElementById('nomeGiocatore').value;
    const esitoAttaccoPrecedente = document.getElementById('esitoAttaccoPrecedente').value;
    const difesaNPC = parseInt(document.getElementById('difesaNPC').value);
    const attaccoNPC = parseInt(document.getElementById('attaccoNPC').value);
    const tenaciaDifesa = parseInt(document.getElementById('tenaciaDifesa').value);
    const tenaciaAttacco = parseInt(document.getElementById('tenaciaAttacco').value);
    const forzaAttacco = parseInt(document.getElementById('forzaAttacco').value);
    const velocitaAttacco = parseInt(document.getElementById('velocitaAttacco').value);
    const vitaResidua = parseInt(document.getElementById('vitaResidua').value);
    const ostinazioneDifesa = document.getElementById('ostinazioneDifesa').checked;
    const ostinazioneAttacco = document.getElementById('ostinazioneAttacco').checked;

    // Validazione input
    if (!npcNome) {
        alert('Seleziona un NPC');
        return;
    }

    // Controllo valori NaN
    if (isNaN(difesaNPC)) {
        alert('Inserisci un valore valido per la difesa NPC');
        return;
    }
    if (isNaN(attaccoNPC)) {
        alert('Inserisci un valore valido per l\'attacco NPC');
        return;
    }
    if (isNaN(tenaciaDifesa)) {
        alert('Inserisci un valore valido per la tenacia difesa');
        return;
    }
    if (isNaN(tenaciaAttacco)) {
        alert('Inserisci un valore valido per la tenacia attacco');
        return;
    }
    if (isNaN(forzaAttacco)) {
        alert('Inserisci un valore valido per la forza attacco');
        return;
    }
    if (isNaN(velocitaAttacco)) {
        alert('Inserisci un valore valido per la velocità attacco');
        return;
    }
    if (isNaN(vitaResidua)) {
        alert('Inserisci un valore valido per la vita residua');
        return;
    }

    // Validazione specifica per ogni campo numerico
    if (difesaNPC < 1 || difesaNPC > 5) {
        alert('La difesa NPC deve essere un numero tra 1 e 5');
        return;
    }

    if (attaccoNPC < 1 || attaccoNPC > 5) {
        alert('L\'attacco NPC deve essere un numero tra 1 e 5');
        return;
    }

    if (tenaciaDifesa < 1 || tenaciaDifesa > 100) {
        alert('La tenacia difesa deve essere un numero tra 1 e 100');
        return;
    }

    if (tenaciaAttacco < 1 || tenaciaAttacco > 100) {
        alert('La tenacia attacco deve essere un numero tra 1 e 100');
        return;
    }

    if (forzaAttacco < 1) {
        alert('La forza attacco deve essere maggiore di 0');
        return;
    }

    if (velocitaAttacco < 1) {
        alert('La velocità attacco deve essere maggiore di 0');
        return;
    }

    if (vitaResidua < 0) {
        alert('La vita residua non può essere negativa');
        return;
    }

    let testoGenerato = '';
    const npc = npcList.find(n => n.nome === npcNome);
    let difesa = 0;
    
    // Aggiungi il disclaimer
    testoGenerato += '[SPOILER] Risposta generata in modo semiautomatico senza controllo stretto dello Staff. In caso di problemi o dubbi contattare i Master [/SPOILER]\n\n';
    
    // Usa l'URL originale dell'immagine
    if (!npc) {
        alert('NPC non trovato');
        return;
    }
    
    testoGenerato += MINIATURA_POST.replace('IMMAGINE_URL', npc.miniatura).replace('NOME_NPC', npc.nome) + '\n\n';

    // Gestione vittoria NPC
    if (esitoAttaccoPrecedente === 'vittoria_npc') {
        const descrizioneVittoria = getDescrizioneCasuale('vittoria_npc');
        testoGenerato += `${descrizioneVittoria}\n\n`;
        testoGenerato += ARBITRO_VITTORIA_NPC.replace('NOME_NPC', npc.nome);
        testoGenerato += '\nINCONTRO CONCLUSO';
        document.getElementById('generatedText').textContent = testoGenerato;
        return;
    }

    // Gestione fase difensiva
    const mossaDifensiva = npc.movesetDifensivo[difesaNPC - 1];
    const descrizioneOriginale = mossaDifensiva.descrizione;

    // Tratta la mossa come schivata se è la quinta mossa o se è marcata come speciale
    if (difesaNPC === 5 || descrizioneOriginale.startsWith('€')) {
        // Gestisci diversamente la difesa 5 e le mosse speciali
        const schivataRiuscita = npc.riflessi >= velocitaAttacco && npc.destrezza >= velocitaAttacco;
        
        if (schivataRiuscita) {
            testoGenerato += `${npc.nome} schiva l'attacco\n\n`;
            testoGenerato += `[QUOTE]\n`;
            testoGenerato += `Riflessi (${npc.riflessi}) e Destrezza (${npc.destrezza}) maggiori o uguali di Velocità attacco (${velocitaAttacco}): Schivata riuscita\n`;
            testoGenerato += `[/QUOTE]\n\n`;

            // Gestione fase offensiva dopo schivata riuscita
            const mossaOffensiva = npc.movesetOffensivo[attaccoNPC - 1];
            testoGenerato += mossaOffensiva.descrizione + '\n\n';
            testoGenerato += `[QUOTE]\n`;
            testoGenerato += `Fase offensiva\n`;
            let forzaBase = mossaOffensiva.valore + (tenaciaAttacco * 5);
            let attacco = forzaBase;

            if (ostinazioneAttacco) {
                attacco = Math.floor(forzaBase * 1.5);
                testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
                testoGenerato += `Attacco = (${mossaOffensiva.valore} + (${tenaciaAttacco} * 5)) * 1.5 (Bonus ostinazione) = ${attacco}\n`;
                let velocitaFinale = npc.velocita * 3;
                testoGenerato += `Velocità = ${npc.velocita} * 3 (Bonus ostinazione) = ${velocitaFinale} [/QUOTE]`;
            } else {
                testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
                testoGenerato += `Attacco = ${mossaOffensiva.valore} + (${tenaciaAttacco} * 5) = ${attacco}\n`;
                testoGenerato += `Velocità = ${npc.velocita} [/QUOTE]`;
            }
        } else {
            testoGenerato += `${npc.nome} cerca di schivare l'attacco, senza riuscirci\n\n`;
            testoGenerato += `[QUOTE]\n`;
            testoGenerato += `Fase difensiva\n`;
            testoGenerato += `Riflessi (${npc.riflessi}) e/o Destrezza (${npc.destrezza}) minori di Velocità attacco (${velocitaAttacco}): Schivata fallita\n`;
            
            if (ostinazioneDifesa) {
                difesa = Math.floor(mossaDifensiva.valore * 0.5);
                testoGenerato += `Resistenza base = ${mossaDifensiva.valore}\n`;
                testoGenerato += `Difesa = ${mossaDifensiva.valore} * 0.5 (Malus ostinazione) = ${difesa}\n`;
            } else {
                difesa = mossaDifensiva.valore;
                testoGenerato += `Resistenza base = ${mossaDifensiva.valore}\n`;
                testoGenerato += `Difesa = ${mossaDifensiva.valore} = ${difesa}\n`;
            }
            
            const dannoSubito = Math.max(0, forzaAttacco - difesa);
            const vitaDopoAttacco = Math.max(0, vitaResidua - dannoSubito);
            
            testoGenerato += `Danno subito = ${forzaAttacco} - ${difesa} = ${dannoSubito}\n`;
            testoGenerato += `Vita residua = ${vitaResidua} - ${dannoSubito} = ${vitaDopoAttacco} [/QUOTE]\n\n`;

            // Controllo sconfitta NPC
            if (isNPCSconfitto(npc, vitaDopoAttacco)) {
                if (!nomeGiocatore) {
                    alert('Inserisci il nome del giocatore per generare il messaggio di vittoria');
                    return;
                }
                const descrizioneSconfitta = getDescrizioneCasuale('sconfitta_npc');
                if (descrizioneSconfitta) {
                    testoGenerato += `${descrizioneSconfitta}\n\n`;
                }
                testoGenerato += ARBITRO_VITTORIA_GIOCATORE.replace('NOME_GIOCATORE', nomeGiocatore);
                testoGenerato += '\nINCONTRO CONCLUSO';
                document.getElementById('generatedText').textContent = testoGenerato;
                return;
            }

            // Gestione fase offensiva dopo schivata fallita
            const mossaOffensiva = npc.movesetOffensivo[attaccoNPC - 1];
            testoGenerato += mossaOffensiva.descrizione + '\n\n';
            testoGenerato += `[QUOTE]\n`;
            testoGenerato += `Fase offensiva\n`;
            let forzaBase = mossaOffensiva.valore + (tenaciaAttacco * 5);
            let attacco = forzaBase;

            if (ostinazioneAttacco) {
                attacco = Math.floor(forzaBase * 1.5);
                testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
                testoGenerato += `Attacco = (${mossaOffensiva.valore} + (${tenaciaAttacco} * 5)) * 1.5 (Bonus ostinazione) = ${attacco}\n`;
                let velocitaFinale = npc.velocita * 3;
                testoGenerato += `Velocità = ${npc.velocita} * 3 (Bonus ostinazione) = ${velocitaFinale} [/QUOTE]`;
            } else {
                testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
                testoGenerato += `Attacco = ${mossaOffensiva.valore} + (${tenaciaAttacco} * 5) = ${attacco}\n`;
                testoGenerato += `Velocità = ${npc.velocita} [/QUOTE]`;
            }
        }
    } else {
        // Gestione normale della difesa
        testoGenerato += mossaDifensiva.descrizione + '\n\n';
        testoGenerato += `[QUOTE]\n`;
        testoGenerato += `Fase difensiva\n`;
        
        let resistenzaBase = mossaDifensiva.valore + (tenaciaDifesa * 5);
        
        if (ostinazioneDifesa) {
            difesa = Math.floor(resistenzaBase * 0.5);
            testoGenerato += `Resistenza base = ${mossaDifensiva.valore}\n`;
            testoGenerato += `Difesa = (${mossaDifensiva.valore} + (${tenaciaDifesa} * 5)) * 0.5 (Malus ostinazione) = ${difesa}\n`;
        } else {
            difesa = resistenzaBase;
            testoGenerato += `Resistenza base = ${mossaDifensiva.valore}\n`;
            testoGenerato += `Difesa = ${mossaDifensiva.valore} + (${tenaciaDifesa} * 5) = ${difesa}\n`;
        }
        
        const dannoSubito = Math.max(0, forzaAttacco - difesa);
        const vitaDopoAttacco = Math.max(0, vitaResidua - dannoSubito);
        
        testoGenerato += `Danno subito = ${forzaAttacco} - ${difesa} = ${dannoSubito}\n`;
        testoGenerato += `Vita residua = ${vitaResidua} - ${dannoSubito} = ${vitaDopoAttacco} [/QUOTE]\n\n`;

        // Controllo sconfitta NPC
        if (isNPCSconfitto(npc, vitaDopoAttacco)) {
            if (!nomeGiocatore) {
                alert('Inserisci il nome del giocatore per generare il messaggio di vittoria');
                return;
            }
            const descrizioneSconfitta = getDescrizioneCasuale('sconfitta_npc');
            if (descrizioneSconfitta) {
                testoGenerato += `${descrizioneSconfitta}\n\n`;
            }
            testoGenerato += ARBITRO_VITTORIA_GIOCATORE.replace('NOME_GIOCATORE', nomeGiocatore);
            testoGenerato += '\nINCONTRO CONCLUSO';
            document.getElementById('generatedText').textContent = testoGenerato;
            return;
        }

        // Aggiungi la fase offensiva
        const mossaOffensiva = npc.movesetOffensivo[attaccoNPC - 1];
        testoGenerato += mossaOffensiva.descrizione + '\n\n';
        testoGenerato += `[QUOTE]\n`;
        testoGenerato += `Fase offensiva\n`;
        let forzaBase = mossaOffensiva.valore + (tenaciaAttacco * 5);
        let attacco = forzaBase;

        if (ostinazioneAttacco) {
            attacco = Math.floor(forzaBase * 1.5);
            testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
            testoGenerato += `Attacco = (${mossaOffensiva.valore} + (${tenaciaAttacco} * 5)) * 1.5 (Bonus ostinazione) = ${attacco}\n`;
            let velocitaFinale = npc.velocita * 3;
            testoGenerato += `Velocità = ${npc.velocita} * 3 (Bonus ostinazione) = ${velocitaFinale} [/QUOTE]`;
        } else {
            testoGenerato += `Forza base = ${mossaOffensiva.valore}\n`;
            testoGenerato += `Attacco = ${mossaOffensiva.valore} + (${tenaciaAttacco} * 5) = ${attacco}\n`;
            testoGenerato += `Velocità = ${npc.velocita} [/QUOTE]`;
        }
    }

    // Mostra il testo generato
    document.getElementById('generatedText').textContent = testoGenerato;
}

// Funzioni per i modal
function mostraModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Aggiungi l'event listener per il pulsante di chiusura
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.onclick = function() {
                modal.style.display = 'none';
            }
        }
        
        // Chiudi il modal se si clicca fuori
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
}

function nascondiModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Funzione per aggiornare tutte le tendine NPC
function aggiornaTutteLeTendine() {
    popolaSelectNPC('npc');
    popolaSelectNPC('incontro');
}

// Funzione per mostrare l'NPC selezionato
function mostraNPCSelezionato() {
    const select = document.getElementById('npcSelector');
    const npcDetailContainer = document.getElementById('npcDetailContainer');
    const deleteButtonContainer = document.getElementById('deleteButtonContainer');
    
    if (!select || !npcDetailContainer) return;
    
    const selectedNPCName = select.value;
    if (!selectedNPCName) {
        npcDetailContainer.innerHTML = '';
        deleteButtonContainer.innerHTML = '';
        return;
    }
    
    const npcList = JSON.parse(localStorage.getItem('npcList') || '[]');
    const npc = npcList.find(n => n.nome === selectedNPCName);
    
    if (!npc) {
        npcDetailContainer.innerHTML = '<p>NPC non trovato</p>';
        deleteButtonContainer.innerHTML = '';
        return;
    }
    
    // Crea il contenuto HTML per l'NPC
    let html = `
        <div class="npc-card">
            <div class="npc-header">
                <div class="avatar" style="background-image: url('${npc.miniatura}')"></div>
                <div class="npc-info">
                    <h2>${npc.nome}</h2>
                    <p>Piano Arena Celeste: ${npc.pianoArenaCeleste}</p>
                    <p>Vita Iniziale: ${npc.vitaIniziale}</p>
                    <p>Destrezza: ${npc.destrezza}</p>
                    <p>Velocità: ${npc.velocita}</p>
                    <p>Riflessi: ${npc.riflessi}</p>
                </div>
            </div>
            
            <div class="npc-controls">
                <div class="control-group">
                    <button onclick="mostraModal('movesetModal')">Mostra Moveset</button>
                </div>
            </div>
        </div>
    `;
    
    npcDetailContainer.innerHTML = html;
    
    
    // Aggiungi il pulsante di eliminazione
    deleteButtonContainer.innerHTML = `
        <button onclick="confermaCancellazione('${npc.nome}')" class="button" style="background-color: #e74c3c;">
            Elimina NPC
        </button>
    `;
    
    // Popola i modali
    document.getElementById('movesetContent').innerHTML = `
        <h3>Moveset Difensivo</h3>
        ${npc.movesetDifensivo.map(mossa => `
            <div class="mossa-item">
                <p><strong>Descrizione:</strong> ${mossa.descrizione}</p>
                <p><strong>Valore:</strong> ${mossa.valore}</p>
            </div>
        `).join('')}
        
        <h3>Moveset Offensivo</h3>
        ${npc.movesetOffensivo.map(mossa => `
            <div class="mossa-item">
                <p><strong>Descrizione:</strong> ${mossa.descrizione}</p>
                <p><strong>Valore:</strong> ${mossa.valore}</p>
            </div>
        `).join('')}
    `;
    
    document.getElementById('previewContent').innerHTML = `
        <div class="miniatura-npc">
            <div class="avatar" style="background-image: url('${npc.miniatura}')"></div>
            <div class="nome-personaggio">${npc.nome}</div>
            <div class="stile-testo">Piano Arena Celeste: ${npc.pianoArenaCeleste}</div>
            <div class="contenuto-testo">
                <p>Vita Iniziale: ${npc.vitaIniziale}</p>
                <p>Destrezza: ${npc.destrezza}</p>
                <p>Velocità: ${npc.velocita}</p>
                <p>Riflessi: ${npc.riflessi}</p>
            </div>
        </div>
    `;
}

// Funzioni per mostrare/nascondere moveset
function toggleMoveset(index) {
    const movesetDiv = document.getElementById(`moveset-${index}`);
    movesetDiv.style.display = movesetDiv.style.display === 'none' ? 'block' : 'none';
}

function confermaCancellazione(nomeNPC) {
    // Prima conferma
    if (!confirm(`Sei sicuro di voler cancellare l'NPC "${nomeNPC}"?`)) {
        return;
    }

    // Seconda conferma
    if (!confirm(`ATTENZIONE: Questa azione è irreversibile!\nConfermi di voler cancellare definitivamente l'NPC "${nomeNPC}"?`)) {
        return;
    }

    // Procede con la cancellazione
    cancellaNPC(nomeNPC);
}

function cancellaNPC(nomeNPC) {
    const npcIndex = npcList.findIndex(npc => npc.nome === nomeNPC);
    if (npcIndex !== -1) {
        // Rimuove l'NPC dalla lista
        npcList.splice(npcIndex, 1);
        
        // Aggiorna il localStorage
        localStorage.setItem('npcList', JSON.stringify(npcList));
        
        // Aggiorna la visualizzazione nella pagina NPC
        popolaSelectNPC('npc');  // Aggiorna il selettore nella pagina NPC
        popolaSelectNPC('incontro');  // Aggiorna il selettore nella pagina incontro
        
        document.getElementById('npcSelector').value = '';
        document.getElementById('npcDetailContainer').innerHTML = '';
        document.getElementById('deleteButtonContainer').innerHTML = '';
        
        alert(`L'NPC "${nomeNPC}" è stato cancellato con successo.`);
    }
}

// Aggiungi questi stili CSS
const newStyles = `
.delete-button {
    background-color: #dc3545;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #c82333;
}

.complementi-list {
    margin-top: 10px;
}

.complemento-item {
    background-color: #f8f9fa;
    padding: 8px 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
`;

// Aggiungi gli stili al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = newStyles;
document.head.appendChild(styleSheet);

// Funzione per inizializzare il form del moveset
function inizializzaFormMoveset(tipo) {
    const container = document.getElementById(`moveset${tipo}`);
    if (!container) return;

    container.innerHTML = '';
    
    // Aggiungi 5 campi per le mosse
    for (let i = 1; i <= 5; i++) {
        const moveDiv = document.createElement('div');
        moveDiv.className = 'mossa-item';
        
        const label = document.createElement('label');
        label.textContent = `Mossa ${i}:`;
        
        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'mossa-desc';
        descInput.required = true;
        descInput.placeholder = tipo === 'Difensivo' ? 'Resistenza' : 'Forza';
        
        const valInput = document.createElement('input');
        valInput.type = 'number';
        valInput.className = 'mossa-val';
        valInput.required = true;
        valInput.min = '0';
        valInput.placeholder = tipo === 'Difensivo' ? 'Resistenza' : 'Forza';
        
        moveDiv.appendChild(label);
        moveDiv.appendChild(descInput);
        moveDiv.appendChild(valInput);
        
        container.appendChild(moveDiv);
    }
}

// Funzione per aprire il modal di creazione NPC
function apriModalCreaNPC() {
    // Inizializza i form dei moveset
    inizializzaFormMoveset('Difensivo');
    inizializzaFormMoveset('Offensivo');
    
    // Mostra il modal
    document.getElementById('creaNPCModal').style.display = 'block';
    
    // Aggiungi event listener per la chiusura del modal
    const modal = document.getElementById('creaNPCModal');
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Chiudi il modal cliccando fuori
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Funzioni per la gestione della versione (desktop/mobile)
function initVersionManager() {
    // Controlla se c'è una preferenza salvata
    const isMobile = localStorage.getItem('isMobileVersion') === 'true';
    
    // Applica la versione corretta all'avvio
    setMobileVersion(isMobile);
    
    // Aggiungi event listeners ai pulsanti
    const switchToDesktop = document.getElementById('switchToDesktop');
    const switchToMobile = document.getElementById('switchToMobile');
    
    if (switchToDesktop) {
        switchToDesktop.addEventListener('click', () => {
            setMobileVersion(false);
        });
    }
    
    if (switchToMobile) {
        switchToMobile.addEventListener('click', () => {
            setMobileVersion(true);
        });
    }
}

// Funzione per impostare la versione mobile/desktop
function setMobileVersion(isMobile) {
    if (isMobile) {
        document.documentElement.classList.add('mobile-version');
        document.body.classList.add('mobile-version');
    } else {
        document.documentElement.classList.remove('mobile-version');
        document.body.classList.remove('mobile-version');
    }
    localStorage.setItem('isMobileVersion', isMobile);
    
    // Aggiorna la visualizzazione dei pulsanti
    const switchToDesktop = document.getElementById('switchToDesktop');
    const switchToMobile = document.getElementById('switchToMobile');
    
    if (switchToDesktop) switchToDesktop.style.display = isMobile ? 'block' : 'none';
    if (switchToMobile) switchToMobile.style.display = isMobile ? 'none' : 'block';
    
    // Forza il ridimensionamento della pagina per applicare correttamente i layout
    window.dispatchEvent(new Event('resize'));
}

// Modifica la funzione window.onload per includere l'inizializzazione del version manager
window.onload = async function() {
    inizializzaNPCList();
    inizializzaEsempiDescrizioni();
    initVersionManager();
    
    // Carica le descrizioni dal localStorage
    const descrizioniSalvate = localStorage.getItem('descrizioni');
    if (descrizioniSalvate) {
        descrizioni = JSON.parse(descrizioniSalvate);
    }
    
    const selectNPC = document.getElementById('selectNPC');
    const npcSelector = document.getElementById('npcSelector');
    
    if (selectNPC) {
        popolaSelectNPC('incontro');
    }
    if (npcSelector) {
        popolaSelectNPC('npc');
    }

    // Gestione del pulsante Crea NPC
    const btnCreaNPC = document.getElementById('btnCreaNPC');
    if (btnCreaNPC) {
        btnCreaNPC.addEventListener('click', apriModalCreaNPC);
    }

    // Gestione del form di creazione NPC
    const formCreaNPC = document.getElementById('formCreaNPC');
    if (formCreaNPC) {
        formCreaNPC.addEventListener('submit', function(event) {
            event.preventDefault();
            creaNuovoNPC(event);
        });
    }

    // Gestione del caricamento immagini
    const urlOption = document.getElementById('urlOption');
    const fileOption = document.getElementById('fileOption');
    const urlMiniatura = document.getElementById('urlMiniatura');
    const fileMiniatura = document.getElementById('fileMiniatura');
    const previewContainer = document.getElementById('preview-container');
    const miniaturaPreview = document.getElementById('miniatura-preview');

    if (urlOption && fileOption && urlMiniatura && fileMiniatura) {
        urlOption.addEventListener('change', function() {
            urlMiniatura.disabled = false;
            fileMiniatura.disabled = true;
        });

        fileOption.addEventListener('change', function() {
            urlMiniatura.disabled = true;
            fileMiniatura.disabled = false;
        });

        urlMiniatura.addEventListener('input', function() {
            if (this.value) {
                previewContainer.style.display = 'block';
                miniaturaPreview.src = this.value;
            } else {
                previewContainer.style.display = 'none';
            }
        });

        fileMiniatura.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewContainer.style.display = 'block';
                    miniaturaPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Aggiungi event listener per i pulsanti nella pagina role.html
    const btnNuovaDescrizione = document.getElementById('btnNuovaDescrizione');
    const btnDescrizioniPresenti = document.getElementById('btnDescrizioniPresenti');
    const formNuovaDescrizione = document.getElementById('formNuovaDescrizione');
    const descrizioniPresenti = document.getElementById('descrizioniPresenti');

    if (btnNuovaDescrizione && btnDescrizioniPresenti) {
        btnNuovaDescrizione.addEventListener('click', function() {
            formNuovaDescrizione.style.display = 'block';
            descrizioniPresenti.style.display = 'none';
        });

        btnDescrizioniPresenti.addEventListener('click', function() {
            formNuovaDescrizione.style.display = 'none';
            descrizioniPresenti.style.display = 'block';
            // Mostra le descrizioni per la situazione selezionata
            const situazioneSelezionata = document.getElementById('selectSituazioneEsistente').value;
            mostraDescrizioniPerSituazione(situazioneSelezionata);
        });

        // Aggiungi event listener per il cambio di situazione
        document.getElementById('selectSituazioneEsistente').addEventListener('change', function(e) {
            mostraDescrizioniPerSituazione(e.target.value);
        });

        // Aggiungi event listener per il pulsante salva
        document.getElementById('btnSalvaDescrizione').addEventListener('click', salvaDescrizione);
    }

    // Aggiungi event listener per il pulsante Carica NPC
    const btnCaricaNPC = document.getElementById('btnCaricaNPC');
    const inputFile = document.getElementById('caricaNPC');
    
    if (btnCaricaNPC && inputFile) {
        btnCaricaNPC.addEventListener('click', function() {
            inputFile.click();
        });
        
        inputFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                caricaNPCDaFile(file);
            }
        });
    }
    
    // Gestione del pulsante Cancella Tutti gli NPC
    const btnCancellaTuttiNPC = document.getElementById('btnCancellaTuttiNPC');
    if (btnCancellaTuttiNPC) {
        btnCancellaTuttiNPC.addEventListener('click', cancellaTuttiNPC);
    }
};

// Funzione per validare URL immagine
async function validaURLImmagine(url) {
    return new Promise((resolve) => {
        // Verifica se l'URL è un'immagine base64
        if (url.startsWith('data:image/')) {
            resolve(true);
            return;
        }

        // Verifica se l'URL è un blob
        if (url.startsWith('blob:')) {
            resolve(true);
            return;
        }

        // Per gli URL esterni, prova a caricare l'immagine
        const img = new Image();
        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            console.error('Errore nel caricamento dell\'immagine:', url);
            resolve(false);
        };
        img.src = url;

        // Timeout di sicurezza dopo 5 secondi
        setTimeout(() => {
            resolve(false);
        }, 5000);
    });
}

// Funzione per comprimere l'immagine
function comprimiImmagine(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Ridimensiona se l'immagine è troppo grande
                const MAX_SIZE = 800;
                if (width > MAX_SIZE || height > MAX_SIZE) {
                    if (width > height) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    } else {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Comprimi come JPEG con qualità 0.8
                canvas.toBlob(resolve, 'image/jpeg', 0.8);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Funzione per validare un'immagine
async function validaImmagine(file) {
    return new Promise((resolve, reject) => {
        if (!IMAGE_CONSTRAINTS.allowedTypes.includes(file.type)) {
            reject(new Error('Tipo di file non supportato. Usa JPG, PNG o GIF.'));
            return;
        }

        if (file.size > IMAGE_CONSTRAINTS.maxSize) {
            reject(new Error('L\'immagine è troppo grande. Massimo 5MB.'));
            return;
        }

        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            if (img.width > IMAGE_CONSTRAINTS.maxWidth || img.height > IMAGE_CONSTRAINTS.maxHeight) {
                reject(new Error(`L'immagine è troppo grande. Dimensioni massime: ${IMAGE_CONSTRAINTS.maxWidth}x${IMAGE_CONSTRAINTS.maxHeight}px`));
                return;
            }
            resolve(true);
        };
        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error('Immagine non valida o corrotta.'));
        };
        img.src = URL.createObjectURL(file);
    });
}

// Funzione per ottimizzare un'immagine
async function ottimizzaImmagine(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                // Ridimensiona se necessario
                if (width > IMAGE_CONSTRAINTS.maxWidth || height > IMAGE_CONSTRAINTS.maxHeight) {
                    const ratio = Math.min(
                        IMAGE_CONSTRAINTS.maxWidth / width,
                        IMAGE_CONSTRAINTS.maxHeight / height
                    );
                    width *= ratio;
                    height *= ratio;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converti in Blob
                canvas.toBlob(
                    (blob) => resolve(blob),
                    'image/jpeg',
                    IMAGE_CONSTRAINTS.quality
                );
            };
            img.onerror = () => reject(new Error('Errore durante l\'ottimizzazione dell\'immagine'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Errore durante la lettura del file'));
        reader.readAsDataURL(file);
    });
}

// Funzione per gestire il caricamento di un'immagine
async function gestisciCaricamentoImmagine(file) {
    try {
        await validaImmagine(file);
        const imageBlobOttimizzata = await ottimizzaImmagine(file);
        return URL.createObjectURL(imageBlobOttimizzata);
    } catch (error) {
        throw new Error(`Errore durante il caricamento dell'immagine: ${error.message}`);
    }
}

// Modifica la funzione creaNuovoNPC
async function creaNuovoNPC(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const npc = {
            nome: formData.get('nome'),
            pianoArenaCeleste: parseInt(formData.get('pianoArenaCeleste')),
            vitaIniziale: parseInt(formData.get('vitaIniziale')),
            destrezza: parseInt(formData.get('destrezza')),
            velocita: parseInt(formData.get('velocita')),
            riflessi: parseInt(formData.get('riflessi')),
            movesetOffensivo: [],
            movesetDifensivo: []
        };

        // Gestione delle mosse offensive
        for (let i = 1; i <= 5; i++) {
            const descrizione = formData.get(`mossaOffensiva${i}`);
            const valore = parseInt(formData.get(`valoreOffensivo${i}`));
            if (descrizione && valore) {
                npc.movesetOffensivo.push(new Mossa(descrizione, valore));
            }
        }

        // Gestione delle mosse difensive
        for (let i = 1; i <= 5; i++) {
            const descrizione = formData.get(`mossaDifensiva${i}`);
            const valore = parseInt(formData.get(`valoreDifensivo${i}`));
            if (descrizione && valore) {
                npc.movesetDifensivo.push(new Mossa(descrizione, valore));
            }
        }

        // Gestione dell'immagine
        const immagineInput = document.getElementById('immagineNPC');
        let immagineUrl = formData.get('immagineURL');

        if (immagineInput.files.length > 0) {
            const file = immagineInput.files[0];
            if (file.size > IMAGE_CONSTRAINTS.maxSize) {
                throw new Error('L\'immagine è troppo grande. Dimensione massima: 5MB');
            }
            if (!IMAGE_CONSTRAINTS.allowedTypes.includes(file.type)) {
                throw new Error('Formato immagine non supportato. Usa JPG, PNG o GIF');
            }
            immagineUrl = URL.createObjectURL(file);
        }

        // Valida l'immagine
        try {
            const isValid = await validaImmagineCaricata(immagineUrl);
            if (!isValid) {
                throw new Error('URL immagine non valido');
            }
        } catch (error) {
            console.error(`Errore nella validazione dell'immagine per l'NPC ${npc.nome}:`, error);
            alert('L\'URL dell\'immagine non è valido. Inserisci un URL valido che inizi con http:// o https://');
            return false;
        }

        // Crea la miniatura
        npc.miniatura = MINIATURA_BASE.replace('IMMAGINE_URL', immagineUrl).replace('NOME_NPC', npc.nome);
        npc.imageUrl = immagineUrl;
        
        // Salvataggio
        npcList.push(npc);
        localStorage.setItem('npcList', JSON.stringify(npcList));
        
        // Crea backup dopo la creazione
        creaBackupCompresso();
        
        // Esporta l'NPC in formato txt
        await esportaNPC(npc);
        
        // Reset form e UI update
        document.getElementById('formCreaNPC').reset();
        document.getElementById('preview-container').style.display = 'none';
        nascondiModal('creaNPCModal');
        popolaSelectNPC();
        
        alert('NPC creato e salvato con successo!');
        aggiornaPagina();
        return true;
    } catch (error) {
        console.error('Errore durante la creazione dell\'NPC:', error);
        alert('Errore durante la creazione: ' + error.message);
        return false;
    }
}

// Funzione per validare un'immagine
async function validaImmagineCaricata(url) {
    return new Promise((resolve) => {
        // Se è un blob URL, considera l'immagine valida
        if (url.startsWith('blob:')) {
            resolve(true);
            return;
        }

        // Se è un'immagine base64, considera l'immagine valida
        if (url.startsWith('data:image/')) {
            resolve(true);
            return;
        }

        // Per gli URL esterni, verifica che sia un URL valido
        if (url.startsWith('http://') || url.startsWith('https://')) {
            resolve(true);
            return;
        }

        // Se non è un URL valido, considera l'immagine non valida
        resolve(false);
    });
}

// Funzione per caricare un NPC da file
async function caricaNPCDaFile(event) {
    const files = event.target.files;
    if (!files || files.length === 0) {
        console.log('Nessun file selezionato');
        return;
    }

    try {
        // Carica la lista NPC esistente
        let npcList = JSON.parse(localStorage.getItem('npcList') || '[]');
        
        // Processa tutti i file in parallelo
        const processPromises = Array.from(files).map(async (file) => {
            try {
                console.log('Elaborazione file:', file.name);
                const contenuto = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = (e) => reject(e);
                    reader.readAsText(file);
                });

                console.log('Contenuto file letto:', contenuto.substring(0, 100) + '...');

                const lines = contenuto.split('\n');
                let npc = {};
                let currentSection = null;

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) continue;

                    // Estrai le informazioni dal file
                    if (trimmedLine.startsWith('Nome:')) {
                        npc.nome = trimmedLine.replace('Nome:', '').trim();
                    } else if (trimmedLine.startsWith('Piano Arena Celeste:')) {
                        npc.pianoArenaCeleste = parseInt(trimmedLine.replace('Piano Arena Celeste:', '').trim());
                    } else if (trimmedLine.startsWith('Vita Iniziale:')) {
                        npc.vitaIniziale = parseInt(trimmedLine.replace('Vita Iniziale:', '').trim());
                    } else if (trimmedLine.startsWith('Destrezza:')) {
                        npc.destrezza = parseInt(trimmedLine.replace('Destrezza:', '').trim());
                    } else if (trimmedLine.startsWith('Velocità:')) {
                        npc.velocita = parseInt(trimmedLine.replace('Velocità:', '').trim());
                    } else if (trimmedLine.startsWith('Riflessi:')) {
                        npc.riflessi = parseInt(trimmedLine.replace('Riflessi:', '').trim());
                    } else if (trimmedLine.startsWith('Miniatura:')) {
                        const miniaturaUrl = trimmedLine.replace('Miniatura:', '').trim();
                        // Salva l'URL dell'immagine e crea la miniatura
                        npc.imageUrl = miniaturaUrl;
                        npc.miniatura = MINIATURA_BASE.replace('IMMAGINE_URL', miniaturaUrl).replace('NOME_NPC', npc.nome);
                        console.log('URL miniatura caricato:', miniaturaUrl);
                    } else if (trimmedLine === 'Mosse Offensive:') {
                        currentSection = 'offensive';
                        npc.movesetOffensivo = [];
                    } else if (trimmedLine === 'Mosse Difensive:') {
                        currentSection = 'difensive';
                        npc.movesetDifensivo = [];
                    } else if (trimmedLine.startsWith('-') && currentSection) {
                        const mossaMatch = trimmedLine.match(/- (.*?) \((\d+)\)/);
                        if (mossaMatch) {
                            const [_, descrizione, valore] = mossaMatch;
                            const mossa = new Mossa(descrizione.trim(), parseInt(valore));
                            if (currentSection === 'offensive') {
                                npc.movesetOffensivo.push(mossa);
                            } else {
                                npc.movesetDifensivo.push(mossa);
                            }
                        }
                    }
                }

                // Verifica che l'NPC sia valido
                if (!npc.nome || !npc.pianoArenaCeleste || !npc.vitaIniziale || 
                    !npc.destrezza || !npc.velocita || !npc.riflessi || 
                    !npc.miniatura || !npc.movesetOffensivo || !npc.movesetDifensivo) {
                    throw new Error(`File ${file.name} non contiene tutti i dati necessari per l'NPC`);
                }

                // Verifica se l'NPC esiste già
                const existingIndex = npcList.findIndex(n => n.nome === npc.nome);
                if (existingIndex !== -1) {
                    if (confirm(`Un NPC con il nome "${npc.nome}" esiste già. Vuoi sovrascriverlo?`)) {
                        npcList[existingIndex] = npc;
                        console.log('NPC sovrascritto:', npc.nome);
                    }
                } else {
                    npcList.push(npc);
                    console.log('Nuovo NPC aggiunto:', npc.nome);
                }
            } catch (error) {
                console.error(`Errore nel caricamento del file ${file.name}:`, error);
                alert(`Errore nel caricamento del file ${file.name}: ${error.message}`);
            }
        });

        // Attendi che tutti i file siano processati
        await Promise.all(processPromises);

        // Aggiorna la lista globale e il localStorage
        window.npcList = npcList;
        localStorage.setItem('npcList', JSON.stringify(npcList));

        // Aggiorna il selettore
        const npcSelector = document.getElementById('npcSelector');
        if (npcSelector) {
            npcSelector.innerHTML = '<option value="">Seleziona un NPC</option>';
            npcList.forEach(npc => {
                const option = document.createElement('option');
                option.value = npc.nome;
                option.textContent = npc.nome;
                npcSelector.appendChild(option);
            });

            // Se c'è almeno un NPC, seleziona il primo
            if (npcList.length > 0) {
                npcSelector.value = npcList[0].nome;
                mostraNPCSelezionato();
            }
        }

        alert('NPC caricati con successo!');
        aggiornaPagina();
    } catch (error) {
        console.error('Errore nel caricamento degli NPC:', error);
        alert('Errore nel caricamento degli NPC: ' + error.message);
    }
}

// Funzione per creare un backup compresso
function creaBackupCompresso() {
    try {
        const data = {
            npcList: npcList,
            descrizioni: JSON.parse(localStorage.getItem('descrizioni')),
            timestamp: new Date().toISOString()
        };
        
        // Comprimi i dati
        const compressedData = JSON.stringify(data);
        
        // Salva il backup con timestamp
        const backupKey = `backup_${data.timestamp}`;
        localStorage.setItem(backupKey, compressedData);
        
        // Mantieni solo gli ultimi 5 backup
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('backup_'))
            .sort()
            .reverse();
            
        if (backupKeys.length > 5) {
            backupKeys.slice(5).forEach(key => localStorage.removeItem(key));
        }
        
        console.log('Backup creato con successo:', backupKey);
        return true;
    } catch (error) {
        console.error('Errore durante la creazione del backup:', error);
        return false;
    }
}

// Dati degli NPC predefiniti
const defaultNPCs = {
    "version": "1.0.0",
    "npcs": [
        {
            "nome": "Korinna Fanning",
            "pianoArenaCeleste": 110,
            "vitaIniziale": 6000,
            "destrezza": 550,
            "velocita": 450,
            "riflessi": 300,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/11.png",
            "movesetOffensivo": [
                {
                    "descrizione": "L'attacco migliore di Korinna. La ragazza flette i muscoli delle gambe e compie uno scatto al meglio delle sue capacità, per raggiungere l'avversario a gran velocità e sferrare un rapido calcio rotante, diretto al fianco.",
                    "valore": 50
                },
                {
                    "descrizione": "Korinna corre verso un lato, poi verso l'altro. Prova a disorientare l'avversario. Una veloce serie di finte, finché non giunge l'attacco vero e proprio: un rapido pugno diretto allo stomaco.",
                    "valore": 40
                },
                {
                    "descrizione": "Korinna, mentre si avvicina all'avversario, compie dei ripetuti scatti laterali a destra e a sinistra, creando l'illusione di uno sdoppiamento fisico. L'attacco giungerà improvvisamente da uno dei due lati. Impossibile prevedere quale.",
                    "valore": 30
                },
                {
                    "descrizione": "Korinna, con la gamba sinistra, scaglia un calcio circolare girato alto ad elevata velocità. Ma questo primo attacco non è altro che una finta. Infatti, sfruttando lo stesso movimento rotatorio, con la gamba destra scaglia un calcio girato basso.",
                    "valore": 20
                },
                {
                    "descrizione": "Korinna compie uno scatto talmente veloce da sparire letteralmente, per qualche breve attimo, dal campo visivo dell'avversario. Riapparsa di fronte allo sfidante, sferrerà quindi un rapido pugno diretto al volto.",
                    "valore": 10
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Korinna sfrutta tutta la sua rapidità di movimento per tentare di bloccare l'attacco in arrivo con un calcio a scopo puramente difensivo.",
                    "valore": 150
                },
                {
                    "descrizione": "Colta alla sprovvista, Korinna porta rapidamente un arto a protezione della zona colpita dall'avversario.",
                    "valore": 100
                },
                {
                    "descrizione": "€I'm fast as f**k boi! | Korinna cerca di schivare l'attacco, senza riuscirci",
                    "valore": 150
                },
                {
                    "descrizione": "€Cosa? Dovrei stare ferma e farmi colpire? | Korinna cerca di schivare l'attacco, senza riuscirci",
                    "valore": 150
                },
                {
                    "descrizione": "Korinna riesce a schivare l'attacco con un movimento agile e preciso | Korinna cerca di schivare l'attacco, senza riuscirci",
                    "valore": 150
                }
            ]
        },
        {
            "nome": "Kristoff Jortek",
            "pianoArenaCeleste": 20,
            "vitaIniziale": 1800,
            "destrezza": 110,
            "velocita": 65,
            "riflessi": 70,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/3-17420741380838.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Kristoff utilizza tutta la sua intelligenza per sviluppare sul momento una tecnica che combina un rapido cambio di posizione con un pugno a frusta. Il karateka esegue un movimento circolare con il busto per generare energia cinetica, scattando in avanti con un pugno esplosivo che colpisce con la parte posteriore delle nocche, mirando al punto vitale della tempia avversaria.",
                    "valore": 70
                },
                {
                    "descrizione": "Kristoff ha sviluppato una variante acrobatica del calcio discendente applicando un salto rotatorio. Si avvicina e finta un calcio laterale per far abbassare la guardia dell'avversario, quindi esegue un rapido giro in aria per portare il tallone direttamente sulla clavicola nemica con l'obiettivo di sbilanciare e colpire con potenza.",
                    "valore": 55
                },
                {
                    "descrizione": "Kristoff crea un triangolo con il movimento delle mani per confondere l'avversario. Dopo una finta iniziale con la mano anteriore, il karateka sfrutta la traiettoria diagonale per sfiorare la difesa e colpire con un pugno destro diretto dal basso verso l'alto, mirato al mento.",
                    "valore": 40
                },
                {
                    "descrizione": "Kristoff esegue una combinazione di tecniche che sfrutta il dondolio del busto per accumulare energia elastica. Il karateka parte da una posizione bassa, muovendo rapidamente il corpo avanti e indietro per poi lanciare un attacco doppio contemporaneamente: un colpo di gomito a corto raggio e un pugno rotante con la mano opposta, puntando al busto dell'avversario.",
                    "valore": 25
                },
                {
                    "descrizione": "Kristoff si prepara a realizzare la sua ultima tecnica ancora in fase di sviluppo. Sfrutta un movimento rotatorio rapido per generare potenza centrifuga, eseguendo una finta con un pugno per attirare l'attenzione, quindi ruota su se stesso con un passo rapido, caricando un colpo di taglio con la mano sinistra aperta. La traiettoria del colpo segue una spirale ascendente che mira al collo del nemico, combinando velocità e imprevedibilità.",
                    "valore": 10
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Kristoff comprende la natura dell'attacco in arrivo ed esegue un blocco statico potenziato dalla struttura del suo corpo. Il karateka utilizza una posizione bassa e solida, bloccando l'attacco con un doppio avambraccio, come se creasse un muro impenetrabile. Distribuendo il peso e sfruttando la tensione muscolare per annullare la forza d'impatto.",
                    "valore": 110
                },
                {
                    "descrizione": "Kristoff impiega una tecnica difensiva basata sulla deviazione fluida. Invece di bloccare direttamente l'attacco in arrivo, il karateka esegue un movimento circolare delle mani, simile a un'onda, per incanalare la forza dell'attacco verso una direzione meno dannosa.",
                    "valore": 95
                },
                {
                    "descrizione": "Kristoff tenta di proteggersi con la punta dei gomiti spingendo in avanti: l'intento è quello di trasformare la difesa in uno strumento di dolore.",
                    "valore": 80
                },
                {
                    "descrizione": "Kristoff, invece di pensare a difendersi, opta per intercettare il colpo nemico e tentare di avvinghiarsi agli arti dell'avversario pronto per eseguire una presa a distanza ravvicinata.",
                    "valore": 65
                },
                {
                    "descrizione": "Kristoff riesce a schivare l'attacco con un movimento agile e preciso | Kristoff cerca di schivare l'attacco, senza riuscirci",
                    "valore": 120
                }
            ]
        },
        {
            "nome": "Boki Luagin",
            "pianoArenaCeleste": 10,
            "vitaIniziale": 1300,
            "destrezza": 110,
            "velocita": 40,
            "riflessi": 40,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/Boki%20Luagin.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Boki, armato di tutta la determinazione che ha, si scrolla di dosso ogni insicurezza e si lancia in una carica frontale. Un impeto al pieno delle sue forze, pur non avendone granché. Una rapida testata diretta allo stomaco.",
                    "valore": 20
                },
                {
                    "descrizione": "Boki corre in avanti e prova ad assestare uno dei suoi colpi migliori: un calcio laterale a metà altezza, semplice e veloce.",
                    "valore": 15
                },
                {
                    "descrizione": "Boki scatta in avanti, cercando di afferrare il suo avversario per il braccio e proiettarlo a terra tramite una rotazione del busto.",
                    "valore": 10
                },
                {
                    "descrizione": "Boki cerca di sferrare un complicato calcio rotante in stile taekwondo, una mossa che ha visto da un lottatore in televisione. A causa della sua inesperienza, tuttavia, l'attacco risulta fiacco e deludente.",
                    "valore": 5
                },
                {
                    "descrizione": "Boki si lancia all'attacco, ma all'ultimo momento si rende conto di essersi scoperto troppo e si prepara a rimettersi sulla difensiva. Quell'attimo di esitazione rende l'attacco debole e goffo, al pari di una spinta, più che un vero e proprio colpo.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Armato di tutta la sua determinazione, Boki concentra tutti i suoi sensi per difendersi dall'attacco in arrivo, piegando agilmente l'arto più vicino e anteponendolo alla zona mirata dall'avversario",
                    "valore": 80
                },
                {
                    "descrizione": "Boki si rannicchia su se stesso per coprire ogni punto vitale allo stesso tempo.",
                    "valore": 75
                },
                {
                    "descrizione": "Boki cerca di frapporre uno dei suoi arti a protezione per difendersi, ma all'ultimo momento si rende conto di aver sbagliato il movimento, rendendo la sua difesa più debole e imprecisa.",
                    "valore": 70
                },
                {
                    "descrizione": "Proprio mentre l'avversario lo sta per colpire, una delle sue scarpe si slaccia e gli scivola via dal piede, facendogli perdere l'equilibrio e la concentrazione.",
                    "valore": 0
                },
                {
                    "descrizione": "Boki riesce a schivare l'attacco con un movimento agile e preciso | Boki cerca di schivare l'attacco, senza riuscirci",
                    "valore": 80
                }
            ]
        },
        {
            "nome": "Damix Urazuka",
            "pianoArenaCeleste": 50,
            "vitaIniziale": 3300,
            "destrezza": 200,
            "velocita": 125,
            "riflessi": 120,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/6.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Convinto di aver sentito un insulto rivolto alla sua cara mamma, Damix non ci vede più dalla rabbia e si lancia in un attacco dettato dal puro istinto omicida. Un semplice e veloce pugno diretto al viso, ma senza alcun residuo di ragione a frenare la sua frenetica ira.",
                    "valore": 90
                },
                {
                    "descrizione": "Damix si avvicina all'avversario e sferra un pugno diretto al suo viso. Tuttavia il suo movimento cambia natura a metà traiettoria. Con una rapida rotazione del gomito e un piccolo salto in alto che in realtà non ha grande utilità, Damix porta il pugno verso il lato del viso avversario.",
                    "valore": 70
                },
                {
                    "descrizione": "Damix corre incontro all'avversario, per poi spiccare un salto verso di lui e cercare di colpirlo con un calcio frontale.",
                    "valore": 50
                },
                {
                    "descrizione": "Damix si lancia contro l'avversario e cerca di mordergli un orecchio.",
                    "valore": 30
                },
                {
                    "descrizione": "Damix si lancia in un attacco testa-contro-testa.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Damix è abituato a incassare colpi su colpi. Non gli serve parare gli attacchi per tenere duro. Gli basta la sua forza d'animo.",
                    "valore": 190
                },
                {
                    "descrizione": "Damix si protegge dall'attacco in arrivo piegando l'arto più vicino al punto colpito per ammortizzare l'impatto.",
                    "valore": 150
                },
                {
                    "descrizione": "Damix si becca il colpo e pone una lecita domanda al suo avversario.",
                    "valore": 110
                },
                {
                    "descrizione": "Damix si distrae e la sua difesa risulta più debole.",
                    "valore": 80
                },
                {
                    "descrizione": "Damix riesce a schivare l'attacco con un movimento agile e preciso | Damix cerca di schivare l'attacco, senza riuscirci",
                    "valore": 190
                }
            ]
        },
        {
            "nome": "Darius Cerberix",
            "pianoArenaCeleste": 130,
            "vitaIniziale": 7300,
            "destrezza": 185,
            "velocita": 300,
            "riflessi": 100,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/12.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Darius è inarrestabile e si avvicina frontalmente al nemico: alza la gamba destra e con un'ascia magistrale effettua un colpo discendente che tanta di colpire il nemico sulla testa per spedirlo a terra.",
                    "valore": 500
                },
                {
                    "descrizione": "Darius sferra un diretto sinistro a piena potenza all'altezza dell'esofago.",
                    "valore": 400
                },
                {
                    "descrizione": "Darius colpisce con un gomitata ascendente il mento dell'avversario.",
                    "valore": 300
                },
                {
                    "descrizione": "Darius non ha timore del suo destino e scatta verso il nemico: tenta di colpirlo conficcandogli i pollici nelle orecchie con l'intento di provocare un trauma interno.",
                    "valore": 200
                },
                {
                    "descrizione": "Darius è accecato dall'ira: pensieri funesti sconvolgono la sua mente mentre carica a testa bassa l'avversario con una testata allo sterno.",
                    "valore": 100
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Darius è un monolite pronto a fermare con i palmi delle mani qualsiasi attacco.",
                    "valore": 600
                },
                {
                    "descrizione": "Darius sfoggia il suo passato e voltandosi all'ultimo di schiena accusa il colpo ammortizzando con i possenti muscoli.",
                    "valore": 450
                },
                {
                    "descrizione": "Darius antepone la fronte come ultimo strumento di difesa irrigidendo il collo con uno sforzo sovrumano.",
                    "valore": 300
                },
                {
                    "descrizione": "Darius, ignorando l'offensiva avversaria, indica il cuore e poi allunga il braccio verso il pubblico pronto a ricevere la gloria di cui si ciba.",
                    "valore": 150
                },
                {
                    "descrizione": "Darius riesce a schivare l'attacco con un movimento agile e preciso | Darius cerca di schivare l'attacco, senza riuscirci",
                    "valore": 600
                }
            ]
        },
        {
            "nome": "Ibeve Pitagonus",
            "pianoArenaCeleste": 1,
            "vitaIniziale": 800,
            "destrezza": 110,
            "velocita": 5,
            "riflessi": 10,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/Ibeve.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Ibeve abbassa il capo ed avanza verso il suo contendente senza timore: appena arrivato a portata scaglia una testata in avanti.",
                    "valore": 30
                },
                {
                    "descrizione": "Ibeve corre in avanti e si lancia a gambe tese contro l'avversario volando a qualche centimetro dal ring orizzontalmente.",
                    "valore": 25
                },
                {
                    "descrizione": "Ibeve pone un braccio intorno alla testa dell'avversario e con l'altro lo afferra alla cintura. Lo alza e lo proietta a terra gettandosi all'indietro, facendo così cadere violentemente l'avversario sulla schiena.",
                    "valore": 20
                },
                {
                    "descrizione": "Ibeve alza la gamba destra agilmente e scaglia una pedata contro il petto del nemico, spingendolo via.",
                    "valore": 15
                },
                {
                    "descrizione": "Ibeve tenta di colpire con uno schiaffetto dietro la nuca: è palesemente infastidito dall'affronto.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Ibeve abbassa il capo e rimanere immobile, indurendo ogni fibra dei suoi muscoli. Sarà come impattare contro una montagna.",
                    "valore": 140
                },
                {
                    "descrizione": "Ibeve antepone le sue braccia possenti dinnanzi a lui, pronto ad intercettare qualsiasi colpo in arrivo.",
                    "valore": 120
                },
                {
                    "descrizione": "Ibeve non ha paura di nulla, per questo si avvicina lentamente al suo avversario nonostante stia per essere colpito.",
                    "valore": 110
                },
                {
                    "descrizione": "Ibeve, molto abilmente, sposta il suo corpo all'ultimo momento tentando una schivata o quello che sembra un contrattacco teatrale. Sorride verso la folla ma in realtà ha subito l'offensiva avversaria.",
                    "valore": 100
                },
                {
                    "descrizione": "Ibeve riesce a schivare l'attacco con un movimento agile e preciso | Ibeve cerca di schivare l'attacco, senza riuscirci",
                    "valore": 140
                }
            ]
        },
        {
            "nome": "Oldaf Mitgefühl",
            "pianoArenaCeleste": 60,
            "vitaIniziale": 3800,
            "destrezza": 200,
            "velocita": 100,
            "riflessi": 175,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/7.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Oldaf salta in alto e rapidamente ricade contro il nemico spingendo in avanti un pugno destro con tutta la forza che possiede.",
                    "valore": 110
                },
                {
                    "descrizione": "Oldaf alza in aria la gamba sinistra e colpisce con un doppio calcio punta-tallone in ritorno quasi istantaneamente.",
                    "valore": 80
                },
                {
                    "descrizione": "Oldaf tira fuori tutta la sua esperienza e si proietta contro il nemico con una serie rapida ed istantanea di pugni diretti alla gola.",
                    "valore": 50
                },
                {
                    "descrizione": "Oldaf indica un punto dietro l'avversario: per un istante sembra fermarsi ma accorcia le distanze e tenta di colpire con una gomitata lo stomaco nemico.",
                    "valore": 20
                },
                {
                    "descrizione": "Oldaf è oltraggiato per motivi apparentemente poco chiari, tuttavia questo non gli impedisce di schiaffeggiare il volto avversario.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Oldaf intuisce che sarà meglio difendersi per bene: antepone le braccia davanti e si accovaccia leggermente, irremovibile è pronto a tutto.",
                    "valore": 190
                },
                {
                    "descrizione": "Oldaf intercetta con un calcio il colpo in arrivo rischiando l'infortunio ma tentando di annullare con forza contraria.",
                    "valore": 160
                },
                {
                    "descrizione": "Oldaf contrae tutti i muscoli del torso e la tartaruga presente sul suo addome si anima: qualsiasi sarà la mossa avversaria fermerà tutto come uno scudo stringendo i denti.",
                    "valore": 130
                },
                {
                    "descrizione": "Oldaf goffamente riesce a difendersi a malapena, perde l'equilibrio e si ritrova sottosopra.",
                    "valore": 100
                },
                {
                    "descrizione": "Oldaf riesce a schivare l'attacco con un movimento agile e preciso | Oldaf cerca di schivare l'attacco, senza riuscirci",
                    "valore": 190
                }
            ]
        },
        {
            "nome": "Olga Strapopovich",
            "pianoArenaCeleste": 70,
            "vitaIniziale": 4300,
            "destrezza": 250,
            "velocita": 250,
            "riflessi": 150,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/8.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Olga, con una velocità fuori dal comune, parte con un diretto destro ma qualcosa di strano accade: l'avversario viene colpito di lato senza una ragionevole spiegazione. Si tratta di un colpo mai visto nella boxe che riesce a sorprendere anche il nemico più esperto.",
                    "valore": 130
                },
                {
                    "descrizione": "Olga porta indietro il busto caricando un potentissimo diretto sinistro che rilascia solo una volta sotto l'avversario: la mossa in realtà si tramuta in un montante al mento dove la ragazza rimane per qualche istante con il braccio disteso verso l'alto.",
                    "valore": 100
                },
                {
                    "descrizione": "Olga, grazie ad un leggiadro ed ipnotico gioco di gambe, si porta rapidamente verso il nemico e lo colpisce con un diretto-gancio al volto.",
                    "valore": 70
                },
                {
                    "descrizione": "Olga non crede più nelle favole, cammina verso l'avversario con la guardia bassa e il petto infuori. Una ginocchiata improvvisa alla parti basse.",
                    "valore": 40
                },
                {
                    "descrizione": "Olga non è fiera dei suoi trascorsi ma non intende ritirarsi: ecco perché incattivita si avvicina e tenta con i guantoni un graffio di striscio al volto avversario.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Olga porta gli avambracci e una delle ginocchia in avanti mostrando tutta la sua agilità e imbastendo una difesa ad hoc nascosta dietro i guantoni.",
                    "valore": 150
                },
                {
                    "descrizione": "Olga è consapevole che i muscoli delle sue cosce sono così sviluppati da sembrare marmo, grazie anche alla candida pelle. Tenta di difendersi alzando e muovendo le gambe con movimenti nostalgici.",
                    "valore": 130
                },
                {
                    "descrizione": "Olga intercetta i colpi avversari con altri pugni velocissimi cercando di rimanere concentrata e non sbilanciarsi per il rinculo.",
                    "valore": 115
                },
                {
                    "descrizione": "Olga sospira e chiude gli occhi rimanendo immobile e con le braccia distese sui fianchi: è un grosso azzardo ma non è la prima volta che punta sul senso di colpa avversario.",
                    "valore": 100
                },
                {
                    "descrizione": "Olga riesce a schivare l'attacco con un movimento agile e preciso | Olga cerca di schivare l'attacco, senza riuscirci",
                    "valore": 150
                }
            ]
        },
        {
            "nome": "Oran Lee",
            "pianoArenaCeleste": 90,
            "vitaIniziale": 5300,
            "destrezza": 170,
            "velocita": 170,
            "riflessi": 170,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/10.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Oran scatta in avanti fino a raggiungere l'avversario, per poi afferrare saldamente il suo dito tra pollice e indice, mantenendo il mignolo della propria mano sollevato. Una volta abbassato il mignolo, un'energica ma gentile onda d'urto si originerà dai due sfidanti a contatto, e colui che ha subito la mossa si sentirà frastornato dall'esperienza. Oran sta ancora lavorando su questa mossa, ma è convinto che una volta perfezionata diventerà un attacco inarrestabile",
                    "valore": 170
                },
                {
                    "descrizione": "Oran carica l'avversario e prova ad afferrarlo per i fianchi, per poi lanciarlo verso l'alto e dietro di sé.",
                    "valore": 160
                },
                {
                    "descrizione": "Oran si lancia senza freni e senza paura in una carica frontale. L'obiettivo del suo attacco è spingere l'avversario con entrambe le mani, sfruttando tutta la potenza dirompente della sua carica.",
                    "valore": 150
                },
                {
                    "descrizione": "Nonostante la sua imponente stazza, Oran si muove con una velocità impressionante e scatta verso l'avversario, per colpirlo con un rapido calcio laterale.",
                    "valore": 140
                },
                {
                    "descrizione": "Oran approccia l'avversario con passi decisi. Una volta abbastanza vicino, sferra un violento colpo a mano aperta verso il petto dell'avversario. Se colpisce bene, questo suo attacco è in grado di strozzare il respiro e fermare il battito cardiaco per qualche secondo, oltre che scaraventare indietro l'avversario.",
                    "valore": 130
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Oran raggiunge uno stato di concentrazione assoluto, sentendosi un tutt'uno con il mondo attorno a sé. Qualsiasi attacco riceverà, è pronto a resistergli con tutte le sue forze. Non ha paura. Il suo corpo, pur non avendo subito apparenti mutazioni, sembra per qualche motivo duro come la roccia.",
                    "valore": 170
                },
                {
                    "descrizione": "Oran si mette in posizione, pianta i piedi a terra e si prepara a resistere all'attacco. Anche se venisse colpito, anche se venisse ferito, anche se venisse sconfitto, non barcollerà di un centimetro. Rimarrà in piedi.",
                    "valore": 160
                },
                {
                    "descrizione": "Oran frappone il suo arto più vicino a protezione della zona mirata dall'avversario.",
                    "valore": 150
                },
                {
                    "descrizione": "Oran si volta di schiena per incassare il colpo con i suoi poderosi e resistenti muscoli dorsali.",
                    "valore": 140
                },
                {
                    "descrizione": "Oran riesce a schivare l'attacco con un movimento agile e preciso | Oran cerca di schivare l'attacco, senza riuscirci",
                    "valore": 170
                }
            ]
        },
        {
            "nome": "Red",
            "pianoArenaCeleste": 190,
            "vitaIniziale": 6000,
            "destrezza": 250,
            "velocita": 800,
            "riflessi": 150,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/14.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Red è un mostro. Si avvicina al nemico e con uno scatto lo supera di qualche centimetro tanto per riuscire a colpirlo con un taglio di mano dietro la nuca.",
                    "valore": 800
                },
                {
                    "descrizione": "Red senza timore attacca frontalmente e con il palmo della mano destra affonda nella gola dell'avversario.",
                    "valore": 750
                },
                {
                    "descrizione": "Red comprende la sua forza e per questo non si trattiene dallo sferrare un calcio circolare alto, sinistro, verso la tempia del nemico.",
                    "valore": 700
                },
                {
                    "descrizione": "Red senza volerlo sfoggia la sua destrezza nei movimenti e salta a mezz'aria quanto basta per colpire con il ginocchio destro il mento dell'avversario.",
                    "valore": 650
                },
                {
                    "descrizione": "Red, mentre si sgranchisce le braccia e le spalle, sferra un ceffone senza pietà sul viso di chi ha davanti.",
                    "valore": 600
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Red si protegge voltandosi di lato e alzando il gomito. Un pugno chiuso all'orecchio e l'altro a protezione delle costole.",
                    "valore": 600
                },
                {
                    "descrizione": "Red si protegge contraendo il petto e l'addome mentre gli avambracci proteggono il volto.",
                    "valore": 550
                },
                {
                    "descrizione": "Red si protegge contrattaccando con circolari a varie altezze per rallentare e smorzare la forza nemica.",
                    "valore": 500
                },
                {
                    "descrizione": "Red non si protegge. Irrigidisce semplicemente il suo corpo e rimane immobile. Red è un mostro.",
                    "valore": 450
                },
                {
                    "descrizione": "Red riesce a schivare l'attacco con un movimento agile e preciso | Red cerca di schivare l'attacco, senza riuscirci",
                    "valore": 600
                }
            ]
        },
        {
            "nome": "Rey Budgerigar",
            "pianoArenaCeleste": 40,
            "vitaIniziale": 2800,
            "destrezza": 260,
            "velocita": 150,
            "riflessi": 100,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/5.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Rey prende una rincorsa breve e salta direttamente contro l'avversario con una capriola aerea, atterrando con un doppio ginocchio sul petto. Il movimento sfrutta la rotazione naturale per aumentare la velocità e l'impatto senza bisogno di spinta esterna che normalmente è generata dalle corde dei ring dove combatte.",
                    "valore": 70
                },
                {
                    "descrizione": "Rey prova ad afferrare il braccio dell'avversario e lo usa come punto di leva per lanciarsi in un avvitamento aereo laterale, chiudendo le gambe intorno al collo e proiettandolo con una Hurricanrana modificata.",
                    "valore": 60
                },
                {
                    "descrizione": "Rey finta un pugno per far abbassare la guardia dell'avversario, quindi esegue un rapido scatto e un salto in avanti con una ginocchiata frontale in rotazione. Questo attacco sfrutta la spinta delle gambe e il peso del corpo per generare il massimo impatto.",
                    "valore": 50
                },
                {
                    "descrizione": "Rey scatta alle spalle dell'avversario, si piega rapidamente all'indietro, afferrandolo per la testa e trascinandolo con sé in una spaccata volante che lo fa cadere in ginocchio, schiantando la nuca del rivale sul proprio corpo per un effetto da whiplash.",
                    "valore": 40
                },
                {
                    "descrizione": "Rey solleva l'avversario in una posizione da Fireman's Carry, poi si lascia cadere di lato ruotando velocemente su se stesso, scaraventandolo con forza al suolo.",
                    "valore": 30
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Rey esegue un rapido scivolamento laterale accovacciandosi e parando con gli addominali contratti. Girandosi su un fianco e sfruttando la rotazione del busto per rialzarsi, recupera una posizione offensiva immediata.",
                    "valore": 120
                },
                {
                    "descrizione": "Rey, invece di tirarsi indietro, spinge in avanti e si gira su se stesso in un movimento a spirale, tenta di far perdere equilibrio al nemico che lo sta attaccando con una leva articolare improvvisata.",
                    "valore": 100
                },
                {
                    "descrizione": "Rey rafforza la propria posizione e assorbe l'impatto con un blocco rigido delle braccia, subito seguito da una spallata esplosiva per respingere l'avversario.",
                    "valore": 80
                },
                {
                    "descrizione": "Rey sfrutta il proprio peso abbassando rapidamente il baricentro e scivolando giù rispetto al corpo dell'avversario, atterrando e parando con i muscoli della schiena.",
                    "valore": 60
                },
                {
                    "descrizione": "Rey riesce a schivare l'attacco con un movimento agile e preciso | Rey cerca di schivare l'attacco, senza riuscirci",
                    "valore": 120
                }
            ]
        },
        {
            "nome": "Sphylos Tender",
            "pianoArenaCeleste": 80,
            "vitaIniziale": 4800,
            "destrezza": 50,
            "velocita": 80,
            "riflessi": 220,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/9.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Sphylos, a malincuore, decide di ricorrere ad una risorsa nascosta: qualcosa che trascende il semplice allenamento umano. Ove la pace interiore non arriva, le lastre di acciaio inserite sotto le sue nocche sono la risposta ultima ad un nemico da sconfiggere. Un pugno diretto e diritto. Verso il viso dell'avversario. Un attacco che non ricorda le arti marziali ma è la fonte di scarico della stanchezza di anni di dedizione.",
                    "valore": 260
                },
                {
                    "descrizione": "Sphylos avanza lentamente con passo misurato, lasciando che l'avversario abbassi la guardia. Poi, con un movimento fulmineo, colpisce il punto vitale del plesso solare con un tocco leggero ma chirurgico delle dita, causando un'interruzione del respiro e uno shock momentaneo al sistema nervoso.",
                    "valore": 230
                },
                {
                    "descrizione": "Sphylos, senza mai perdere la compostezza, esegue un colpo di palmo aperto al petto dell'avversario. Tuttavia, il segreto della tecnica sta nella totale rilassatezza del corpo fino all'ultimo istante: ciò permette di canalizzare tutta l'energia in un impatto breve ma devastante, capace di far barcollare anche un avversario molto più forte.",
                    "valore": 200
                },
                {
                    "descrizione": "Sphylos utilizza la minima distanza possibile per sferrare un colpo devastante. Quando l'avversario è a portata, esegue un pugno breve e improvviso che non sembra avere rincorsa, ma la cui precisione e potenza concentrata superano qualsiasi colpo più evidente. L'impatto arriva prima ancora che l'avversario possa accorgersi del movimento.",
                    "valore": 170
                },
                {
                    "descrizione": "Sphylos esegue un attacco basato sull'armonizzazione con l'avversario. Il maestro segue il movimento dell'opponente con piccoli spostamenti e, al momento giusto, sfrutta il momento per colpirlo con un calcio basso al ginocchio sinistro che ne destabilizza l'equilibrio, facendolo cadere come se fosse stato abbattuto dal vento.",
                    "valore": 140
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Sphylos analizza il colpo che sta per raggiungerlo ed inizia a muoversi fluidamente come un'onda, deviando l'attacco con un minimo movimento degli avambracci, facendolo scivolare via come sabbia tra le dita. Questo tipo di difesa trasforma la forza dell'avversario in un soffio nel vento.",
                    "valore": 220
                },
                {
                    "descrizione": "Sphylos, senza reagire impulsivamente, alza lentamente una mano con il palmo aperto davanti a sé. Il gesto, apparentemente semplice, è carico di energia e intenti, e spesso causa esitazione nell'avversario. Se il colpo arriva comunque, il maestro lo intercetta con un minimo movimento del polso.",
                    "valore": 190
                },
                {
                    "descrizione": "Sphylos, quando un attacco è imminente, si lascia semplicemente cadere di lato, rilassando completamente il corpo. Questa caduta strategica lo porta fuori dalla traiettoria diretta del colpo, facendolo sembrare quasi un'ombra che scompare nel nulla. I muscoli delle braccia e dei fianchi ammortizzano l'offensiva. Prima di toccare il suolo si rialza di scatto facendo forza sulle caviglie.",
                    "valore": 160
                },
                {
                    "descrizione": "Sphylos pianta saldamente i piedi al suolo, allineando perfettamente il corpo con la gravità. In questo stato, sembra impossibile da smuovere, come se fosse parte stessa della terra. In realtà è solamente una buona copertura della sua ottima capacità di sopportare il dolore.",
                    "valore": 130
                },
                {
                    "descrizione": "Sphylos riesce a schivare l'attacco con un movimento agile e preciso | Sphylos cerca di schivare l'attacco, senza riuscirci",
                    "valore": 220
                }
            ]
        },
        {
            "nome": "Starius Mourniol",
            "pianoArenaCeleste": 30,
            "vitaIniziale": 2300,
            "destrezza": 180,
            "velocita": 140,
            "riflessi": 40,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/4.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Starius affida tutta la sua forza ad una protuberanza importante del suo corpo, carica la testa all'indietro e colpisce con una testata in viso l'avversario.",
                    "valore": 80
                },
                {
                    "descrizione": "Starius si avvicina di soppiatto e passa una mano fra i suoi folti capelli: all'apparenza sembra che si stia pavoneggiando per il pubblico ma ecco che una ginocchiata al mento si alza rapida e potente.",
                    "valore": 60
                },
                {
                    "descrizione": "Starius, forte dei suoi legamenti, posiziona i palmi delle mani a terra sollevando tutto il corpo: le gambe iniziano a roteare in circolo tentando di schiaffeggiare con i piedi il nemico.",
                    "valore": 40
                },
                {
                    "descrizione": "Starius alza le mani al cielo incitando il pubblico, raccoglie le forze e si avvicina con passi di capoeira molto rapidi. Ecco che parte con un calcio all'indietro tentando di colpire alla nuca l'avversario con il tallone destro, realizzando un'ascia impeccabile.",
                    "valore": 20
                },
                {
                    "descrizione": "Starius assume un'espressione contrariata e sbattendo i piedi a terra scatta in avanti arrabbiato: le sue movenze ormai sono solo un insieme confuso di danze caraibiche e balli di gruppo ma il suo montante sinistro al mento nemico è pieno di risentimento e pazienza perduta.",
                    "valore": 0
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Starius riesce ad accelerare il suo battito cardiaco e, veicolando l'afflusso di sangue verso la zona colpita dal nemico, spinge i muscoli ad irrobustirsi aumentando anche di molto la temperatura corporea. Un lieve vapore si intravede fuoriuscire dai suoi pori.",
                    "valore": 120
                },
                {
                    "descrizione": "Starius carica all'indietro il suo pugno destro accovacciandosi leggermente: la mano sinistra a copertura delle nocche fino al momento in cui sgancia in avanti il pugno in direzione del colpo avversario in arrivo. Vuole a tutti i costi contrastare con una forza pari o superiore senza pensare ai rischi.",
                    "valore": 105
                },
                {
                    "descrizione": "Starius sembra distratto dalla puzza di sudore sul ring. Cerca in tutti i modi di rimanere concentrato però riesce solo a difendersi con il suo testone capelluto ammorbidendo l'offensiva.",
                    "valore": 95
                },
                {
                    "descrizione": "Starius, distratto dalla diretta live, dimentica di difendersi adeguatamente. All'ultimo secondo irrigidisce il suo corpo rimanendo tuttavia fermo sul posto.",
                    "valore": 80
                },
                {
                    "descrizione": "Starius riesce a schivare l'attacco con un movimento agile e preciso | Starius cerca di schivare l'attacco, senza riuscirci",
                    "valore": 120
                }
            ]
        },
        {
            "nome": "Zero-F",
            "pianoArenaCeleste": 180,
            "vitaIniziale": 6000,
            "destrezza": 350,
            "velocita": 350,
            "riflessi": 350,
            "miniatura": "https://upload.forumfree.net/i/fc9375543/13.png",
            "movesetOffensivo": [
                {
                    "descrizione": "Zero-F si lancia in una rapida offensiva frontale. Le sue unghie si fanno più lunghe e affilate, diventando dei veri e propri artigli. Cerca quindi di perforare il petto dell'avversario, come se volesse strappargli il cuore.",
                    "valore": 250
                },
                {
                    "descrizione": "Zero-F si lancia in una rapida offensiva frontale. I suoi canini si fanno più lunghi e affilati, diventando delle vere e proprie zanne. Cerca quindi di mordere il collo dell'avversario, come se volesse recidergli la carotide.",
                    "valore": 225
                },
                {
                    "descrizione": "Zero-F si nasconde tra le ombre. Riemerge all'improvviso alle spalle dell'avversario, cercando di bloccarlo da dietro in una presa atta a soffocarlo.",
                    "valore": 200
                },
                {
                    "descrizione": "Zero-F si lancia in una rapida offensiva frontale: un violento pugno diretto alla gola dell'avversario",
                    "valore": 175
                },
                {
                    "descrizione": "Zero-F si lancia in una rapida offensiva: un violento calcio diretto al lato collo avversario",
                    "valore": 150
                }
            ],
            "movesetDifensivo": [
                {
                    "descrizione": "Zero-F porta l'arto più vicino a protezione della zona colpita. Le sue ossa sembrano dure come l'acciaio.",
                    "valore": 250
                },
                {
                    "descrizione": "Zero-F accompagna il movimento dell'offensiva avversaria per neutralizzarla",
                    "valore": 225
                },
                {
                    "descrizione": "Zero-F indurisce i muscoli della zona colpita. I suoi muscoli sembrano duri come l'acciaio.",
                    "valore": 200
                },
                {
                    "descrizione": "Zero-F, per qualche motivo, non fa nulla. In ogni caso, il suo corpo è abbastanza resistente da permettergli di difendersi ugualmente.",
                    "valore": 150
                },
                {
                    "descrizione": "Zero-F riesce a schivare l'attacco con un movimento agile e preciso | Zero-F cerca di schivare l'attacco, senza riuscirci",
                    "valore": 400
                }
            ]
        }
    ]
};

// Funzione per caricare gli NPC predefiniti
async function caricaNPCDefaultManuale() {
    try {
        const modal = document.getElementById('caricaNPCDefaultModal');
        const listaNPCDefault = document.getElementById('listaNPCDefault');
        
        // Mostra il modal
        modal.style.display = 'block';
        
        // Aggiungi l'event listener per il pulsante di chiusura
        modal.querySelector('.close').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Pulisci la lista precedente
        listaNPCDefault.innerHTML = '';
        
        // Ordina gli NPC per piano
        const npcListOrdinata = [...defaultNPCs.npcs].sort((a, b) => a.pianoArenaCeleste - b.pianoArenaCeleste);
        
        // Crea la lista degli NPC
        npcListOrdinata.forEach(npc => {
            const npcItem = document.createElement('div');
            npcItem.className = 'npc-default-item';
            npcItem.innerHTML = `
                <h3>${npc.nome}</h3>
                <p>Piano: <span class="piano">${npc.pianoArenaCeleste}</span></p>
            `;
            
            npcItem.addEventListener('click', function() {
                // Crea una copia completa dell'NPC con tutte le sue proprietà
                const npcCompleto = {
                    nome: npc.nome,
                    pianoArenaCeleste: npc.pianoArenaCeleste,
                    vitaIniziale: npc.vitaIniziale,
                    destrezza: npc.destrezza,
                    velocita: npc.velocita,
                    riflessi: npc.riflessi,
                    miniatura: npc.miniatura,
                    movesetDifensivo: npc.movesetDifensivo,
                    movesetOffensivo: npc.movesetOffensivo
                };
                
                // Aggiungi l'NPC alla lista
                const savedNPCList = JSON.parse(localStorage.getItem('npcList') || '[]');
                savedNPCList.push(npcCompleto);
                localStorage.setItem('npcList', JSON.stringify(savedNPCList));
                
                // Aggiorna l'interfaccia
                popolaSelectNPC('npcSelector');
                mostraNPCSelezionato();
                
                // Chiudi il modal
                modal.style.display = 'none';
                
                // Mostra messaggio di successo
                alert(`NPC ${npc.nome} caricato con successo!`);
                aggiornaPagina();
            });
            
            listaNPCDefault.appendChild(npcItem);
        });
        
    } catch (error) {
        console.error('Errore durante il caricamento degli NPC:', error);
        alert('Si è verificato un errore durante il caricamento degli NPC: ' + error.message);
    }
}
// Aggiungi l'event listener per il pulsante
document.addEventListener('DOMContentLoaded', function() {
    const btnCaricaNPCDefault = document.getElementById('btnCaricaNPCDefault');
    if (btnCaricaNPCDefault) {
        btnCaricaNPCDefault.addEventListener('click', caricaNPCDefaultManuale);
    }
});

// Funzione per aggiornare automaticamente la pagina
function aggiornaPagina() {
    location.reload();
}

// Funzione per cancellare tutti gli NPC
function cancellaTuttiNPC() {
    if (confirm('Sei sicuro di voler cancellare TUTTI gli NPC? Questa azione non può essere annullata.')) {
        // Rimuove la lista NPC dal localStorage
        localStorage.removeItem('npcList');
        
        // Resetta la lista globale
        npcList = [];
        
        // Aggiorna l'interfaccia
        popolaSelectNPC('npc');
        popolaSelectNPC('incontro');
        
        // Pulisce i dettagli dell'NPC
        document.getElementById('npcDetailContainer').innerHTML = '';
        document.getElementById('deleteButtonContainer').innerHTML = '';
        
        alert('Tutti gli NPC sono stati cancellati con successo.');
        aggiornaPagina();
    }
}
