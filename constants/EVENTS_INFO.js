// CONFIGURACION DE EVENTOS

// Los eventos que se crean son puntuales y son la base de los eventos subsecuentes

// El estatus actual se define en relacion con los eventos anteriores.

// No todos los eventos cambian el estatus. Por evemplo, el checkeo , o el registro

// Algunos eventos definen el estado de la la vaca por ejemplo
/*  COMO LOS EVENTOS DEFINEN LAS EL ESTADO ACTUAL 

    previusEvent_2 previusEvent_1 lastEvent   upcomingEvents 
    parto          servicio       seca        parto
    servicio        seca          parto       servicio    
    seca            parto         servicio    parto
    servicio       seca*          parto       servicio


*/

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
  BIRTH: 0,
  FIRST_SERV: 450,
  HEAT: 0,
  SERV_FAIL: 21,
  SERV: 0.5,
  PALP: 100,
  DRY: 200,
  PARTO: 283,
  NEXT_SERV: 370,
  REST_TIME: 90,
  ABORT: 0,
}

/* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
/*           LABELS             */
/* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

export const LABELS = {
  BIRTH: 'Nacimiento',
  FIRST_SERV: 'Primer Servicio',
  HEAT: 'Calor',
  SERV_FAIL: 'Servicio Fallo',
  SERV: 'Servicio',
  PALP: 'Palpación',
  DRY: 'Seca',
  PARTO: 'Parto',
  NEXT_SERV: 'Proximo Servicio',
  REST_TIME: 'Reposo',
  ABORT: 'Aborto',
}

/* 
KEY
TYPE
LABEL
OPTION
*/

// TODO el flujo de los detalles no esta optimizado
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
    eventClass: 'status',
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
    eventClass: 'status',
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
    eventClass: 'status',
  },

  /* -------------ESPECIALES----------------- */
  {
    type: 'abortion',
    label: 'Aborto',
    onDay: PERIODS.abortion,
    options: [],
    nextEvents: ['rest_time'],
    category: 'special',
    eventClass: 'status',
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
    nextEvents: ['serv'],
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
    type: 'registry',
    label: 'Registro',
    onDay: 0,
    nextEvents: [],
    category: 'admin',
  },
  {
    type: 'venta',
    label: 'Venta',
    onDay: 0,
    nextEvents: [],
    category: 'admin',
  },
  {
    type: 'compra',
    label: 'Compra',
    onDay: 0,
    nextEvents: [],
    category: 'admin',
  },
  {
    type: 'nace',
    label: 'Nacimiento',
    onDay: 0,
    nextEvents: ['first_serv'],
    category: 'admin',
  },
]

/* 

STATUS CHANGE
yes             Nace                   //  DIA 0
yes             Primer servicio        //  NACE + dia 450 (15 meses)
yes             Servicio               //  CELO + 12 horas 
                Palpacion              //  SERVICIO + 90 dias (3 meses)
yes             Seca                   //  SERVICIO + 200 dias (7 meses)
yes             Parto                  //  SERVICIO + 283 dias (9 meses)
                ProxServ               //  PARTO   + 90  dias (3 meses)


 
EVENTO        STATUS        
nace          novilla 
serv          preg
palp          
seca          not-lact
parto         lact



/* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, 

y si en el estatus se modifica manualmente  ??
          
 .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */
export const VARIANTS = {
  FIRST_SERV: [
    { key: 'INSEM', label: 'Inseminación' },
    { key: 'MONTA_MUÑE', label: 'Monta Directa - Muñeco' },
  ],
  PARTO: [
    { key: 'MACHO', label: 'Macho' },
    { key: 'HEMBRA', label: 'Hembra' },
    { key: 'DEAD', label: 'Muerto' },
  ],
}
export const EVENTS_TYPES_2 = [
  {
    key: 'BIRTH',
    type: '',
    label: LABELS.BIRTH,
    upcommingEvents: [{ key: 'FIRST_SERV', InDays: PERIODS.FIRST_SERV }],
  },
  {
    key: 'FIRST_SERV',
    label: LABELS.FIRST_SERV,
    variants: VARIANTS.FIRST_SERV,
    type: '',
    upcommingEvents: [{ key: 'PALP', InDays: PERIODS.PALP }],
  },
  {
    key: 'SERV',
    type: '',
    label: LABELS.SERV,
    upcommingEvents: [
      { key: 'PALP', InDays: PERIODS.PALP },
      { key: 'PARTO', InDays: PERIODS.PARTO },
    ],
  },
  { key: 'PALP', type: '', label: LABELS.PALP, upcommingEvents: [] },
  { key: 'DRY', type: '', label: LABELS.DRY, upcommingEvents: [] },
  {
    key: 'PARTO',
    type: '',
    label: LABELS.PARTO,
    upcommingEvents: [],
    variants: VARIANTS.PARTO,
  },
]

/* 

export const LABELS = {
  BIRTH: 'Nacimiento',
  FIRST_SERV: 'Primer Servicio',
  HEAT: 'Calor',
  SERV_FAIL: 'Servicio Fallo',
  SERV: 'Servicio',
  PALP: 'Palpación',
  DRY: 'Seca',
  PARTO: 'Parto',
  NEXT_SERV: 'Proximo Servicio',
  REST_TIME: 'Reposo',
  ABORT: 'Aborto',
}
*/
