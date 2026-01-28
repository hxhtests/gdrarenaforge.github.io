# -*- coding: utf-8 -*-
# Script per rinominare le miniature da "piano°.png" a "Nome_Cognome.png".
# Esegui dalla cartella Default_NPC: python rename_by_nome.py
import os
import re

DIR = os.path.dirname(os.path.abspath(__file__))
PIANO_TO_FILE = {
    1: "Ibeve_Pitagonus.png",
    10: "Boki_Luagin.png",
    20: "Kristoff_Jortek.png",
    30: "Starius_Mourniol.png",
    40: "Rey_Budgerigar.png",
    50: "Damix_Urazuka.png",
    60: "Oldaf_Mitgefuhl.png",
    70: "Olga_Strapopovich.png",
    80: "Sphylos_Tender.png",
    90: "Oran_Lee.png",
    110: "Korinna_Fanning.png",
    130: "Darius_Cerberix.png",
    180: "Zero-F.png",
    190: "Red.png",
}

for f in os.listdir(DIR):
    m = re.match(r"^(\d+)\u00b0\.png$", f)  # \u00b0 = degree sign
    if not m:
        continue
    piano = int(m.group(1))
    new_name = PIANO_TO_FILE.get(piano)
    if not new_name:
        continue
    old_path = os.path.join(DIR, f)
    new_path = os.path.join(DIR, new_name)
    if old_path == new_path:
        continue
    try:
        os.rename(old_path, new_path)
        print("Rinominato:", f, "->", new_name)
    except Exception as e:
        print("Errore", f, e)
