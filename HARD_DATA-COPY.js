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
  { type: 'gestaFail', label: 'G.Fallida', nextEvent: '', nextCheckOnWeeks: '' },
  { type: 'gestaSuccess', label: 'G.Exitosa', nextEvent: '', nextCheckOnWeeks: '' },
  { type: 'secado', label: 'Secado', nextEvent: '', nextCheckOnWeeks: '' },
]
