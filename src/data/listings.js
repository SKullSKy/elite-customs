const bmw525imgs  = Array.from({ length: 12 }, (_, i) => `/assets/cars/bmw525/bmw525-${i + 1}.webp`)
const bmw650imgs  = Array.from({ length: 10 }, (_, i) => `/assets/cars/bmw650/bmw650-${i + 1}.webp`)
const porscheImgs = Array.from({ length: 11 }, (_, i) => `/assets/cars/porsche911/porsche911-${i + 1}.webp`)

const rim1Imgs = Array.from({ length: 3 }, (_, i) => `/assets/wheels/rim1/rim1-${i + 1}.webp`)
const rim2Imgs = Array.from({ length: 3 }, (_, i) => `/assets/wheels/rim2/rim2-${i + 1}.webp`)
const rim3Imgs = Array.from({ length: 4 }, (_, i) => `/assets/wheels/rim3/rim3-${i + 1}.webp`)
const rim4Imgs = Array.from({ length: 4 }, (_, i) => `/assets/wheels/rim4/rim4-${i + 1}.webp`)
const rim5Imgs = Array.from({ length: 3 }, (_, i) => `/assets/wheels/rim5/rim5-${i + 1}.webp`)

export const listings = [
  {
    id: 1,
    type: 'car',
    name: 'BMW 525i',
    spec: '2007 · E60 · 2.5L Benzīns · 24 000 km',
    price: '12 000',
    imgs: bmw525imgs,
    specs: [
      { key: 'year',         value: '2007'                },
      { key: 'body',         value: 'E60 Sedans'          },
      { key: 'engine',       value: '2.5L Benzīns (N52)'  },
      { key: 'mileage',      value: '24 000 km'           },
    ],
    description: 'Nākusi no Japānas ar pierādāmu un oriģinālu nobraukumu 24 000 km — ļoti labā tehniskā un vizuālā stāvoklī. Tikko nomainīta motora eļļa un filtri, regulāras apkopes vēsture uzturēta. Pieejama Wess Select diagnostikas atskaite. Nepieciešams kārtot Eiropas sertifikātu. Sīkāka informācija pa tālruni.',
    ssLink: 'https://www.ss.com/msg/lv/transport/cars/bmw/525/ebfmk.html',
  },
  {
    id: 2,
    type: 'car',
    name: 'BMW 650i',
    spec: '2008 · 4.8L Benzīns · 370 ZS · 107 647 km',
    price: '15 000',
    imgs: bmw650imgs,
    specs: [
      { key: 'year',         value: '2008'               },
      { key: 'engine',       value: '4.8L Benzīns'       },
      { key: 'power',        value: '370 ZS / 270 kW'    },
      { key: 'mileage',      value: '107 647 km'         },
    ],
    description: 'Japānas tirgus automobilis ar oriģinālu un verificētu odometra rādījumu 107 647 km, ļoti labā stāvoklī. Eiropas sertifikācija pašlaik tiek nokārtota — visas izmaksas ir iekļautas cenā. Auto ir iespēja rezervēt un lietot jau šodien, negaidot sertifikācijas pabeigšanu. Norādītā cena ir spēkā tikai līdz Eiropas sertifikāta saņemšanai. Sīkāka informācija pa tālruni.',
    ssLink: 'https://www.ss.com/msg/lv/transport/cars/bmw/650/bcikmc.html',
  },
  {
    id: 3,
    type: 'car',
    name: 'Porsche 911 Carrera',
    spec: '2004 · 997 · 3.6L Benzīns · 322 ZS · 140 000 km',
    price: '35 000',
    imgs: porscheImgs,
    specs: [
      { key: 'year',         value: '2004 (Septembris)'  },
      { key: 'body',         value: '997'                },
      { key: 'engine',       value: '3.6L Benzīns'       },
      { key: 'power',        value: '322 ZS / 239 kW'    },
      { key: 'mileage',      value: '140 000 km'         },
    ],
    description: 'Modelis 997, 2004. gada septembris — ar nokārtotu sertifikātu Vācijā, piereģistrēta Latvijā un izgājusi tehnisko apskati bez jebkādiem aizrādījumiem. Automašīna atrodas ideālā stāvoklī — precīzi tāda, kāda redzama bildēs. Sīkāka informācija pa tālruni.',
    ssLink: 'https://www.ss.com/msg/lv/transport/cars/porsche/911/hpxdc.html',
  },
  {
    id: 4,
    type: 'wheel',
    name: 'Z-Performance ZP.09',
    spec: 'R19 · 21.6 cm · 5×112',
    price: '1 500',
    imgs: rim1Imgs,
    specs: [
      { key: 'size',  value: 'R19'    },
      { key: 'width', value: '21.6 cm' },
      { key: 'bolt',  value: '5×112'  },
    ],
    description: 'Z-Performance ZP.09 Matt Gunmetal. Komplekts no 4 diskiem, lieliski piemēroti BMW un citām vācu markām ar 5×112 stiprinājumu.',
    ssLink: null,
  },
  {
    id: 5,
    type: 'wheel',
    name: 'Pelēkie Diski R20',
    spec: 'R20 · 22.9 cm · 5×112',
    price: '700',
    imgs: rim2Imgs,
    specs: [
      { key: 'size',  value: 'R20'    },
      { key: 'width', value: '22.9 cm' },
      { key: 'bolt',  value: '5×112'  },
    ],
    description: 'Diski R20 izmērā, platums 9.0J, ET45. Piemēroti BMW un Mercedes modeliem ar 5×112 stiprinājumu.',
    ssLink: null,
  },
  {
    id: 6,
    type: 'wheel',
    name: 'BMW E30 Style 5 Oriģināli',
    spec: 'R14 · 4×100',
    price: '700',
    imgs: rim3Imgs,
    specs: [
      { key: 'size',  value: 'R14'   },
      { key: 'width', value: '—'     },
      { key: 'bolt',  value: '4×100' },
    ],
    description: 'Oriģinālie BMW E30 Style 5 diski — klasisks kolekcionāra atradums. Piemēroti E30 un citiem BMW ar 4×100 stiprinājumu.',
    ssLink: null,
  },
  {
    id: 7,
    type: 'wheel',
    name: 'Power Wheels Kaltie Diski R22',
    spec: 'R22 · 5×112 · ar ziemas riepām',
    price: '3 500',
    imgs: rim4Imgs,
    specs: [
      { key: 'size',  value: 'R22'   },
      { key: 'width', value: '—'     },
      { key: 'bolt',  value: '5×112' },
    ],
    description: 'Īpašs pasūtījums no Krievijas — Power Wheels kaltie (forged) diski R22. Komplektā ar vienu sezonu brauktām ziemas riepām. Piemēroti BMW X5/X6/X7.',
    ssLink: null,
  },
  {
    id: 8,
    type: 'wheel',
    name: 'AEZ Diski R22',
    spec: 'R22 · ET40 · 5×112',
    price: '1 100',
    imgs: rim5Imgs,
    specs: [
      { key: 'size',  value: 'R22'   },
      { key: 'width', value: '—'     },
      { key: 'bolt',  value: '5×112' },
    ],
    description: 'AEZ diski R22 ar ET40 nobīdi. Graciozs M-stila dizains, piemērots BMW X-sērijas un citiem modeliem ar 5×112 stiprinājumu.',
    ssLink: null,
  },
]
