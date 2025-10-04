import type { Equipe } from "./equipe.js";
import { azulTop, azulJungle, azulMid, azulAdc, azulSup } from "./jogadoresAzulTeste.js";

export const equipeAzul: Equipe = {
    comunicacao: (azulTop.comunicacao + azulJungle.comunicacao + azulMid.comunicacao + azulAdc.comunicacao + azulSup.comunicacao) / 5,
    controleEmocional: (azulTop.controleEmocional + azulJungle.controleEmocional + azulMid.controleEmocional + azulAdc.controleEmocional + azulSup.controleEmocional) / 5,
    decisao: (azulTop.decisao + azulJungle.decisao + azulMid.decisao + azulAdc.decisao + azulSup.decisao) / 5,
    mecanica: (azulTop.mecanica + azulJungle.mecanica + azulMid.mecanica + azulAdc.mecanica + azulSup.mecanica) / 5,
    visaoJogo: (azulTop.visaoJogo + azulJungle.visaoJogo + azulMid.visaoJogo + azulAdc.visaoJogo + azulSup.visaoJogo) / 5,
    moral: (azulTop.moral + azulJungle.moral + azulMid.moral + azulAdc.moral + azulSup.moral) / 5,
    sinergia: 1.5,
    forcaTotal: 15
}