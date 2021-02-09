export const PERIODS = {
  nace: 0,
  first_serv: 450,
  serv: 0,
  celo: 21,
  palp: 90,
  seca: 200,
  parto: 283,
  next_serv: 343,
}

export const EVENTS_TYPES = [
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
    type: 'serv',
    label: 'Servicio',
    onDay: PERIODS.serv,
    nextEvents: ['celo', 'palp', 'seca', 'parto', 'next_serv'],
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
    nextEvents: ['celo'],
  },
]
