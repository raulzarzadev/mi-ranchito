export const EARRINGS = [
  {
    earring: '001',
    name: 'Pinta',
    birth: '2020-12-15',
    id: '01',
  },
  {
    earring: '002',
    name: 'Pinta',
    birth: '2020-07-03',
    id: '02',
  },
  {
    earring: '003',
    name: 'vaca',
    birth: '2019-03-20',
    id: '03',
  },
]

export const EVENTS = [
  {
    earring: '001',
    type: 'parto',
    date: '2019-05-12',
  },
  {
    earring: '002',
    type: 'servicio',
    date: '2019-12-15',
  },
  {
    earring: '003',
    type: 'parto',
    date: '2020-12-01',
  },
  {
    earring: '003',
    type: 'celo',
    date: '2018-12-25',
  },
  {
    earring: '006',
    type: 'servicio',
    date: '2019-07-25',
  },
  {
    earring: '004',
    type: 'servicio',
    date: '2020-12-30',
  },
  {
    earring: '004',
    type: 'parto',
    date: '2018-12-17',
  },
  {
    earring: '004',
    type: 'servicio',
    date: '2020-11-15',
  },
  {
    earring: '004',
    type: 'celo',
    date: '2020-12-30',
  },
  {
    earring: '005',
    type: 'celo',
    date: '2021-01-12',
  },
]

/* export const EVENTS_LABEL = {
  parto: "Parto",
  celo: "Celo",
  monta: "Monta",
  insem: "Inseminación",
  gesta: "Gestación",
  gestaFail: "G.Fallida",
  gestaSuccess: "G.Exitosa",
  secado: "Secado",
};
 */
export const ALL_EVENTS = [
  { type: 'parto', label: 'Parto', nextEvent: 'celo', nextCheckOnWeeks: 8 },
  { type: 'celo', label: 'Celo', nextEvent: 'celo', nextCheckOnWeeks: 3 },
  { type: 'monta', label: 'Monta', nextEvent: 'celo', nextCheckOnWeeks: 3 },
  { type: 'insem', label: 'Insem', nextEvent: 'celo', nextCheckOnWeeks: 3 },
  { type: 'check', label: 'Revisión', nextEvent: '', nextCheckOnWeeks: 0 },
  { type: 'gesta', label: '¿Gesta?', nextEvent: '', nextCheckOnWeeks: '' },
  {
    type: 'gestaFail',
    label: 'G.Fallida',
    nextEvent: '',
    nextCheckOnWeeks: '',
  },
  {
    type: 'gestaSuccess',
    label: 'G.Exitosa',
    nextEvent: '',
    nextCheckOnWeeks: '',
  },
  { type: 'secado', label: 'Secado', nextEvent: '', nextCheckOnWeeks: '' },
]

export const RESOURCES = [
  {
    src: '/files/agrobanco_peru/Alimentacion_ganado_bovino_2010.pdf',
    title: ' Alimentacion de Ganado Bovino 2010',
    fileName: 'Alimentacion_ganado_bovino_2010.',
    image: '/files/agrobanco_peru/agro_banco_peru_2010.png',
  },
  {
    src:
      '/files/corfo_chile/nutricion-y-alimentacion-de-vacas-lecheras-en-pastoreo.pdf',
    title: ' Nutrición y Alimentacion de vacas en lecheras en pastoreo',
    fileName: 'Nutricion_alimentacion_lecheras_pastoreo_2012.',
    image: '/files/corfo_chile/corfo_book_2012.png',
  },

  {
    src: '/files/Agrobanco_Panama/VacasLecheras.pdf',
    image: '/files/Agrobanco_Panama/agrobanco_panama.png',
    title: ' Producción Bovina en sierra',
    fileName: 'Produccion_ganado_vacuno_sierra',
  },
  {
    src: '/files/castilla_leon/288-VACUNO_LECHE.pdf',
    image: '/files/castilla_leon/castill_leon.png',
    title: ' Manual práctico de manejo de una explotacionde vacuno lechero',
    fileName: 'manual_practico_bovinos_lecheros',
  },
  {
    src:
      '/files/corfo_chile/nutricion-y-alimentacion-de-vacas-lecheras-en-pastoreo.pdf',
    image: '/files/corfo_chile/corfo_book_2012.png',
    title: 'Plan de Alimentación de vacunos lecheros en pastoreo',
    fileName: 'alimentacion_de_vacunos_lecheros_en_pastoreo',
  },
  {
    src:
      'files/corfo_prolesur_chile/Manual_de_manejo_y_bienestar_de_la_vaca_lechera.pdf',
    image: '/files/corfo_prolesur_chile/corfo_prolesur_chile.png',
    title: 'Manual de manejo y bienestar de la vaca lechera',
    fileName: 'manual_y_bienestar_vacuno',
  },
  {
    src: '/files/FAO_Roma/vacasLecheras2.pdf',
    image: '/files/FAO_Roma/FAO_roma_2011.png',
    title: 'Guía de Buenas Practicas en expolotaciones lecheras',
    fileName: 'buenas_practicas_FOA_roma',
  },
]
