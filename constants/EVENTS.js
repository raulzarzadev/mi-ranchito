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
  celo: 21, //  => 
  celoFail: 21, //  =>
  serv: 0.5, // => pregn
  palp: 100, // 3 meses 
  seca: 200 , // if lactante 2 meses antes del parto => remove lactante
  parto: 283, // 9 meses => remove pregn add lactante
  next_serv: 370, // dos meses despues del parto
  rest_time: 90, // tiempo de descanso despues del parto
  abortion: 0, // => remove pregn add option lactate
}

/* 

****** EVENTS

BIRTH
SERVICE
FIRST_SERV
PALP
DRY
ABORT
HEAT

****** STATUS

PREG
DRIED
LACT
EMPTY

*/

const options = {
  BIRTH: [
    { key: 'DEAD', label: 'Vivo' },
    { key: 'COW', label: 'Macho' },
    { key: 'BULL', label: 'Hembra' },
  ],
  SERVICE:[
    {key:''}
  ]
}

const nextEvents = {
  BIRTH :[
    {key: 'HEAT', time:''},
    {key: 'SERVICE', time:''}
  ],
  SERVICE:[
    {key: 'BIRTH', time:}
  ],

}

export default [
  {
    key: 'BIRTH',
    label: 'Parto',
    options: options.BIRTH,
    nextEvents: nextEvents.BIRTH,
  },
  {
    key: 'SERVICE',
    label: 'Servicio',
    options: options.SERVICE,
    nextEvents: nextEvents.SERVICE,
  },
  {
    key: 'PALP',
    label: 'Palpación',
    options: options.SERVICE,
    nextEvents: nextEvents.SERVICE,
  },
  {
    key: 'DRIED',
    label: 'Seca',
    options: options.SERVICE,
    nextEvents: nextEvents.SERVICE,
  },
  {
    key: 'DRIED',
    label: 'Seca',
    options: options.SERVICE,
    nextEvents: nextEvents.SERVICE,
  },
]

