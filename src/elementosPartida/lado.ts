import type { LADO } from "../enums/lado.js";
import { ROTA } from "../enums/rota.js";
import { Estrutura } from "./estrutura.js";

export class Lado {
    lado: LADO;
    torres: Estrutura[]  = [
        { vida: 5000, rota: ROTA.TOP, tier: 1 }, 
        { vida: 4000, rota: ROTA.TOP, tier: 2 },
        { vida: 3500, rota: ROTA.TOP, tier: 3 },
        { vida: 4000, rota: ROTA.TOP, tier: 4 },
        { vida: 5000, rota: ROTA.MID, tier: 1 },
        { vida: 4000, rota: ROTA.MID, tier: 2 },
        { vida: 3500, rota: ROTA.MID, tier: 3 },
        { vida: 4000, rota: ROTA.MID, tier: 4 },
        { vida: 5000, rota: ROTA.BOT, tier: 1 },
        { vida: 4000, rota: ROTA.BOT, tier: 2 },
        { vida: 3500, rota: ROTA.BOT, tier: 3 },
        { vida: 4000, rota: ROTA.BOT, tier: 4 },
        { vida: 3000, rota: ROTA.NEXUS, tier: 5 },
        { vida: 3000, rota: ROTA.NEXUS, tier: 5 },
        { vida: 5500, rota: ROTA.NEXUS, tier: 6 }
    ]
    constructor(lado: LADO) {
        this.lado = lado;
    }
}