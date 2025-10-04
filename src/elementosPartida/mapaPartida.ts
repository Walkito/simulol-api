import { Lado } from "./elementosPartida/lado.js";
import { LADO } from "./enums/lado.js";

export class MapaPartida{
    ladoAzul: Lado = new Lado(LADO.AZUL);
    ladoVermelho: Lado = new Lado(LADO.VERMELHO);
}