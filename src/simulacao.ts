import { LADO } from "./enums/lado.js";
import { ROTA } from "./enums/rota.js";
import type { Equipe } from "./elementosPartida/equipe.js";
import { equipeAzul } from "./elementosPartida/equipeAzul.js";
import { equipeVermelho } from "./elementosPartida/equipeVermelho.js";
import { MapaPartida } from "./elementosPartida/mapaPartida.js";
import type { Estrutura } from "./elementosPartida/estrutura.js";
import { EVENTO } from "./enums/evento.js";

const k: number = 0.1;
const eventosPermitidos: [string, number][] = [
  [EVENTO[EVENTO.LUTA_PEQUENA], EVENTO.LUTA_PEQUENA],
  [EVENTO[EVENTO.LUTA_MEDIA], EVENTO.LUTA_MEDIA],
  [EVENTO[EVENTO.LUTA_GRANDE], EVENTO.LUTA_GRANDE]
];

export const iniciarSimulacao = () => {
  const mapa: MapaPartida = new MapaPartida();
  let minutagem: number = 0;

  const equipes: Equipe[] = pegaEquipes();
  const equipeAzul: Equipe = equipes[0]!;
  const equipeVermelho: Equipe = equipes[1]!;
  const deltaForca = equipeAzul.forcaTotal - equipeVermelho.forcaTotal;
  console.log("Forca Azul: ", equipeAzul.forcaTotal);
  console.log("Forca Vermelho: ", equipeVermelho.forcaTotal);
  let momento: number = 0;
  let vantagemCumulativa: number = 0;
  let estadoEmocional: number = calculaEstadoEmocional(equipeAzul, equipeVermelho, momento);
  let deltaTotal: number = calculaDeltaTotal(deltaForca, vantagemCumulativa, estadoEmocional);

  const intervaloId = setInterval(() => {
    minutagem += 0.5;
    console.log('\n Minuto ', minutagem);

    const vencedor: LADO = defineVencedorEvento(deltaTotal);
    console.log(vencedor);
    const torresEscolhidas: Estrutura[] = vencedor === LADO.AZUL ? mapa.ladoVermelho.torres : mapa.ladoAzul.torres;

    const valorTotalEvento = verificaEvento(torresEscolhidas);
    vantagemCumulativa += LADO.AZUL ? valorTotalEvento : -valorTotalEvento;
    momento += LADO.AZUL ? +2 : -2;
    estadoEmocional = calculaEstadoEmocional(equipeAzul, equipeVermelho, momento);
    deltaTotal = calculaDeltaTotal(deltaForca, vantagemCumulativa, estadoEmocional);

    if (mapa.ladoAzul.torres.find((estrutura: Estrutura) => estrutura.tier === 6)!.vida <= 0 ||
      mapa.ladoVermelho.torres.find((estrutura: Estrutura) => estrutura.tier === 6)!.vida <= 0) {
      clearInterval(intervaloId);

      if (mapa.ladoAzul.torres.find((estrutura: Estrutura) => estrutura.rota === ROTA.NEXUS && estrutura.tier === 6)!.vida <= 0) {
        console.log('Vitória do Time Vermelho');
      } else {
        console.log('Vitória do Time Azul');
      }
    }
  }, 1000);
}

const calculaDeltaTotal = (deltaForca: number, vantagemCumulativa: number, estadoEmocional: number): number => {
  return deltaForca + vantagemCumulativa + estadoEmocional;
}

const calculaEstadoEmocional = (equipeAzul: Equipe, equipeVermelho: Equipe, momento: number): number => {
  return (equipeAzul.moral - equipeVermelho.moral) + momento;
}

const defineVencedorEvento = (deltaTotal: number): LADO => {
  const randomNumber: number = Math.random();
  const prob: number = (1 / (1 + Math.exp(-k * deltaTotal)));

  console.log("Prob: ", prob);
  console.log("Random: ", randomNumber);

  return randomNumber <= prob ? LADO.AZUL : LADO.VERMELHO;
}

const verificaEvento = (torresEscolhidas: Estrutura[]): number => {
  console.log("Estruturas da Equipe: ", torresEscolhidas);

  const [nomeEvento, valorEvento] = sorteiaEvento();
  const rotaEscolhida: ROTA = escolherRota(torresEscolhidas);
  const proxEvento: boolean = Math.random() < 0.5;

  let danoNaEstrutura: number = 0;
  let estruturaDano: boolean = false;

  console.log("\nEvento que foi Escolhido: ", nomeEvento);
  switch (nomeEvento) {
    case 'LUTA_PEQUENA': {
      danoNaEstrutura = 500;
      estruturaDano = true;
    }
      break;
    case 'LUTA_MEDIA': {
      danoNaEstrutura = 1500;
      estruturaDano = true;
    }
      break;
    case 'LUTA_GRANDE': {
      danoNaEstrutura = 3000;
      estruturaDano = true;
    }
      break;
  }

  (estruturaDano && rotaEscolhida !== ROTA.JUNGLE) && danoEstrutura(rotaEscolhida, danoNaEstrutura, torresEscolhidas);

  return valorEvento;
}

const danoEstrutura = (rotaEscolhida: ROTA, dano: number, torresEscolhidas: Estrutura[]): void => {
  let randomNumber: number = Math.random() * 100;

  if (randomNumber > 50) {
    let estruturaEscolhida: Estrutura = torresEscolhidas.find((estrutura) => estrutura.rota === rotaEscolhida && estrutura.vida > 0)!;
    estruturaEscolhida.vida -= dano;
    console.log(`\nDano na Estrutura: ${estruturaEscolhida.tier} da Rota do: ${estruturaEscolhida.rota}, Dano: ${dano}`)
  }
}

const escolherRota = (torresEscolhidas: Estrutura[]): ROTA => {
  const rotas: ROTA[] = [ROTA.TOP, ROTA.JUNGLE, ROTA.MID, ROTA.BOT];

  let rotaEscolhida: ROTA = rotas[Math.floor(Math.random() * 4)]!;

  if (rotaEscolhida !== ROTA.JUNGLE) {
    const existeRotaDestruida: boolean = torresEscolhidas.some((estrutura) => estrutura.tier === 4 && estrutura.vida <= 0);
    rotaEscolhida = existeRotaDestruida ? ROTA.NEXUS : rotaEscolhida;
  }

  return rotaEscolhida;
}

const sorteiaEvento = (): [string, number] => {
  return eventosPermitidos[Math.floor(Math.random() * eventosPermitidos.length)]!;
}

const pegaEquipes = (): Equipe[] => {
  return [equipeAzul, equipeVermelho];
}

const proximoEvento = (proxEvento: boolean): number => {
  if (proxEvento) {
    const eventosAdicionais: [string, number][] = [
      
    ]
  } else {
    return 0;
  }
}