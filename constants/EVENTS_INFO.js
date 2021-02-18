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
  rest_time: 90,
}
export const EVENTS_TYPES = [
  /* -------------PERIODDICOS----------------- */

  {
    type: 'celo',
    label: 'Celo',
    onDay: PERIODS.celo,
    options: [],
    nextEvents: ['serv', 'celo', 'palp', 'seca', 'parto', 'next_serv'],
    category: 'regular',
  },
  {
    type: 'serv',
    label: 'Servicio',
    onDay: PERIODS.serv,
    options: [
      { type: 'montaMune', label: 'Monta Directa(Muñe)' },
      { type: 'IA_anguns', label: 'Inseminacón (Angus)' },
    ],
    nextEvents: ['celoFail', 'palp', 'seca', 'parto', 'next_serv'],
    category: 'regular',
  },
  {
    type: 'palp',
    label: 'Palpación ',
    onDay: PERIODS.palp,
    options: [
      { type: 'gestaFail', label: 'No Gestante' },
      { type: 'gestaOk', label: 'Gestante' },
    ],
    nextEvents: ['seca', 'parto', 'next_serv'],
    category: 'regular',
  },

  {
    type: 'seca',
    label: 'Secado',
    onDay: PERIODS.seca,
    options: [],
    nextEvents: ['parto', 'next_serv'],
    category: 'regular',
  },
  {
    type: 'parto',
    label: 'Parto',
    onDay: PERIODS.parto,
    options: [
      { type: 'female', label: 'Hembra' },
      { type: 'male', label: 'Macho' },
      { type: 'dead', label: 'Nacido Muerto' },
    ],
    nextEvents: ['next_serv'],
    category: 'regular',
  },

  /* -------------ESPECIALES----------------- */
  {
    type: 'abortion',
    label: 'Aborto',
    onDay: 0,
    options: [],
    nextEvents: ['rest_time'],
    category: 'special',
  },
  {
    category: 'special',
    type: 'first_serv',
    label: 'Primer Servicio',
    onDay: PERIODS.first_serv,
    nextEvents: ['serv'],
  },

  {
    category: 'special',
    type: 'celoFail',
    label: 'Celo (Gesta Fallida)',
    onDay: 21,
    nextEvents: [],
  },

  {
    category: 'special',
    type: 'next_serv',
    label: 'Prox. Servicio',
    onDay: PERIODS.next_serv,
    nextEvents: ['serv'],
  },

  /* -------------ADMINISTRATIVOS----------------- */

  {
    category: 'admin',
    type: 'registry',
    label: 'Registro',
    onDay: 0,
    nextEvents: [],
  },
  {
    category: 'admin',
    type: 'venta',
    label: 'Venta',
    onDay: 0,
    nextEvents: [],
  },
  {
    category: 'admin',
    type: 'compra',
    label: 'Compra',
    onDay: 0,
    nextEvents: [],
  },
  {
    category: 'admin',
    type: 'nace',
    label: 'Nacimiento',
    onDay: 0,
    nextEvents: ['first_serv'],
  },
]
