/* 
Ciclo Reproductivo

*** 1. Nace = dia 0
    2. Primer servicio = nace + 15 meses // 450 dias
    3. Celo = dia 0
*** 4. Servicio  = celo + 12 horas 
    5. Celo(gestaFallida)  = servicio + 21 dias 

    6. Palpacion = servicio + 3 meses // dia 100
*** 7. Seca = servicio + 7 meses // dia 200   
*** 8. Parto = servicio + 9 meses //  dia 283 

    9. ProxServ = parto + 3 meses // 90 dias 


/* ----------------------------------------------------------- */
/* ----------------- Tiempos en dias ------------------------- */
/* ----------------------------------------------------------- */

// PERIODOS EN DIAS

const PERIODS = {
  nace: 0,
  first_serv: 450,
  celo: 21,
  celoFail: 21,
  serv: 0.5,
  palp: 100, 
  seca: 200,
  parto: 283,
  next_serv: 370,
  rest_time: 90,
  abortion: 0,
}

export const EVENTS_CONFIGURATION = [
  {
    type: 'static',
    label: 'Parto',
    key: 'parto',
    nextEvents: [
      { type: 'celo', checkin: PERIODS.celo }, // 1 celo
      { type: 'next-serv', checkin: PERIODS.celo * 3 }, // 3 celos
    ],
  },
  {
    type: 'static',
    label: 'Servicio',
    key: 'serv',
    nextEvents: [
      { type: 'palp', checkin: PERIODS.palp }, // 1 Fecha recomendad
      { type: 'seca', checkin: PERIODS.celo * 3 }, // Fecha recomendad
    ],
  },
]
