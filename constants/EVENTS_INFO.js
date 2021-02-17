/* 
Ciclo Reproductivo

1. Nace = dia 0
2. Primer servicio = nace + 15 meses // 450 dias
3. Celo = dia 0
4. Servicio  = celo + 12 horas 
5. Celo(gestaFallida)  = servicio + 21 dias 

6. Palpacion = servicio + 3 meses // dia 100
7. Seca = servicio + 7 meses // dia 200
8. Parto = servicio + 9 meses //  dia 283

9. ProxServ = parto + 3 meses // 90 dias

*/

/* export const PERIODS = {
  nace: 0,
  first_serv: 450,
  serv: -283,
  celo: -253,
  palp: -190,
  seca: -90,
  parto: 0,
  next_serv: 90,
} */

export const PERIODS = {
  nace: 0,
  first_serv: 450,
  celo: 0,
  celoFail: 21,
  serv: 0.5,
  palp: 100,
  seca: 200,
  parto: 283,
  next_serv: 340,
}
export const EVENTS_TYPES = [
  {
    type: 'registration',
    label: 'Registro',
    onDay: 0,
    nextEvents: [],
  },
  {
    type: 'registry',
    label: 'Registro',
    onDay: 0,
    nextEvents: [],
  },
  {
    type: 'venta',
    label: 'Venta',
    onDay: 0,
    nextEvents: [],
  },
  {
    type: 'compra',
    label: 'Compra',
    onDay: 0,
    nextEvents: [],
  },
  {
    type: 'nace',
    label: 'Nacimiento',
    onDay: 0,
    nextEvents: ['first_serv'],
  },
  {
    type: 'first_serv',
    label: 'Primer Servicio',
    onDay: PERIODS.first_serv,
    nextEvents: ['serv'],
  },
  {
    type: 'celo',
    label: 'Celo',
    onDay: PERIODS.celo,
    nextEvents: ['serv', 'celo', 'palp', 'seca', 'parto', 'next_serv'],
  },
  {
    type: 'celoFail',
    label: 'Celo (Gesta Fallida)',
    onDay: 21,
    nextEvents: [],
  },
  {
    type: 'serv',
    label: 'Servicio',
    onDay: PERIODS.serv,
    nextEvents: ['celoFail', 'palp', 'seca', 'parto', 'next_serv'],
  },
  {
    type: 'palp',
    label: 'Palpación ',
    onDay: PERIODS.palp,
    nextEvents: ['seca', 'parto', 'next_serv'],
  },

  {
    type: 'seca',
    label: 'Secado',
    onDay: PERIODS.seca,
    nextEvents: ['parto', 'next_serv'],
  },
  {
    type: 'parto',
    label: 'Parto',
    onDay: PERIODS.parto,
    nextEvents: ['next_serv'],
  },
  {
    type: 'next_serv',
    label: 'Prox. Servicio',
    onDay: PERIODS.next_serv,
    nextEvents: ['serv'],
  },
]
