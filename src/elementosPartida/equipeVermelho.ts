import type { Equipe } from "./equipe.js";
import { vermelhoTop, vermelhoJungle, vermelhoMid, vermelhoAdc, vermelhoSup } from "./jogadoresVermelhoTeste.js";

export const equipeVermelho: Equipe = {
    comunicacao: (vermelhoTop.comunicacao + vermelhoJungle.comunicacao + vermelhoMid.comunicacao + vermelhoAdc.comunicacao + vermelhoSup.comunicacao) / 5,
    controleEmocional: (vermelhoTop.controleEmocional + vermelhoJungle.controleEmocional + vermelhoMid.controleEmocional + vermelhoAdc.controleEmocional + vermelhoSup.controleEmocional) / 5,
    decisao: (vermelhoTop.decisao + vermelhoJungle.decisao + vermelhoMid.decisao + vermelhoAdc.decisao + vermelhoSup.decisao) / 5,
    mecanica: (vermelhoTop.mecanica + vermelhoJungle.mecanica + vermelhoMid.mecanica + vermelhoAdc.mecanica + vermelhoSup.mecanica) / 5,
    visaoJogo: (vermelhoTop.visaoJogo + vermelhoJungle.visaoJogo + vermelhoMid.visaoJogo + vermelhoAdc.visaoJogo + vermelhoSup.visaoJogo) / 5,
    moral: (vermelhoTop.moral + vermelhoJungle.moral + vermelhoMid.moral + vermelhoAdc.moral + vermelhoSup.moral) / 5,
    sinergia: 1.5,
    forcaTotal: 15
}