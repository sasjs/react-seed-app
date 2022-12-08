const date = require('date-and-time')

const now = new Date()

_webout = {
  SYSDATE: date.format(now, 'DDMMMYY'),
  SYSTIME: date.format(now, 'HH:mm'),
  areas: [
    { AREA: 'Adak' },
    { AREA: 'Adel' },
    { AREA: 'Afognak' },
    { AREA: 'Ajo' },
    { AREA: 'Albany' },
    { AREA: 'Albuquerque' },
    { AREA: 'Alturas' },
    { AREA: 'Ashton' },
    { AREA: 'Atka' },
    { AREA: 'Atlanta' },
    { AREA: 'Attu' },
    { AREA: 'Aztec' }
  ]
}

_webout = JSON.stringify(_webout)
