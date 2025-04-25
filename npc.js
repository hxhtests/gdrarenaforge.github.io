function caricaNPCDefaultManuale() {
    // Mostra il modal per la selezione dell'NPC
    $('#modalNPCDefault').modal('show');
    
    // Pulisci la lista precedente
    $('#listaNPCDefault').empty();
    
    // Carica gli NPC dal file JSON
    fetch('npc_default.json')
        .then(response => response.json())
        .then(data => {
            // Ordina gli NPC per piano
            const npcOrdinati = Object.entries(data).sort((a, b) => {
                const pianoA = parseInt(a[1].piano) || 0;
                const pianoB = parseInt(b[1].piano) || 0;
                return pianoA - pianoB;
            });
            
            // Crea la lista degli NPC
            npcOrdinati.forEach(([nome, npc]) => {
                const item = $('<div>').addClass('npc-default-item')
                    .attr('data-nome', nome)
                    .html(`
                        <h3>${nome}</h3>
                        <p>Piano: <span class="piano">${npc.piano || 'N/A'}</span></p>
                        <p>Classe: ${npc.classe || 'N/A'}</p>
                    `)
                    .click(() => {
                        // Carica l'NPC selezionato
                        caricaNPCDefault(nome);
                        $('#modalNPCDefault').modal('hide');
                    });
                
                $('#listaNPCDefault').append(item);
            });
        })
        .catch(error => {
            console.error('Errore nel caricamento degli NPC default:', error);
            alert('Errore nel caricamento degli NPC default. Controlla la console per i dettagli.');
        });
} 