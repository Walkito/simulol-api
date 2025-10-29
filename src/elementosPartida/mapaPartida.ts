import { LADO } from "../enums/lado.js";
import { Lado } from "./lado.js";


export class MapaPartida{
    ladoAzul: Lado = new Lado(LADO.AZUL);
    ladoVermelho: Lado = new Lado(LADO.VERMELHO);
}