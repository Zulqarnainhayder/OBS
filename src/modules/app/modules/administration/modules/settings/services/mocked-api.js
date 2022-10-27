import { makeApiResponse } from "src/services/mocked-response";

const languages = [
  {
    id: 1,
    language: 'Arabic/العربية',
    isoCode: 'ar',
    direction: 'rtl',
    translatable: true,
    active: true
  },
  {
    id: 3,
    language: 'Dutch/Nederlands',
    isoCode: 'nl',
    direction: 'ltr',
    translatable: false,
    active: true
  },
  {
    id: 2,
    language: 'Bengali/বাংলা',
    isoCode: 'bn',
    direction: 'ltr',
    translatable: true,
    active: false
  },
  {
    id: 4,
    language: 'English',
    isoCode: 'en',
    direction: 'ltr',
    translatable: false,
    active: true
  },
  {
    id: 5,
    language: 'French/française',
    isoCode: 'fr',
    direction: 'ltr',
    translatable: true,
    active: false
  },
]

const currencies = [
  {
    id: 1,
    currencyName: 'Egyptian pound',
    isoCode: 'EGP',
    fractionalUnit: 'Piastre',
    numberToBasic: 100,
    excuteDate: '01/12/2021',
    currentRate: 2,
    localCurrency: true,
    editablity: false,
    active: true
  },
  {
    id: 2,
    currencyName: 'United Arab Emirates dirham',
    isoCode: 'AED',
    fractionalUnit: 'Fils',
    numberToBasic: 100,
    excuteDate: '01/12/2021',
    currentRate: 15,
    localCurrency: false,
    editablity: false,
    active: false
  },
  {
    id: 3,
    currencyName: 'United States dollar',
    isoCode: 'USD',
    fractionalUnit: 'Cent',
    numberToBasic: 100,
    excuteDate: '01/12/2021',
    currentRate: 15,
    localCurrency: false,
    editablity: false,
    active: true
  },
  {
    id: 4,
    currencyName: 'Uruguayan peso',
    isoCode: 'UYU',
    fractionalUnit: 'Centésimo',
    numberToBasic: 100,
    excuteDate: '01/12/2021',
    currentRate: 15,
    localCurrency: false,
    editablity: true,
    active: true
  },
  {
    id: 5,
    currencyName: 'Uzbekstan so\'m',
    isoCode: 'UZS',
    fractionalUnit: 'Tiyin',
    numberToBasic: 100,
    excuteDate: '01/12/2021',
    currentRate: 15,
    localCurrency: false,
    editablity: false,
    active: false
  }
]

const addresses = [
  {
    id: 1,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 2,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 3,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 4,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 5,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 6,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
  {
    id: 7,
    country: 'Egypt',
    active: true,
    state: 'Nasr City',
    city: 'Cairo'
  },
]

const tags = [
  {
    id: 1,
    tagName: 'tag',
    tagLabel: 'tag label',
    charts: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
  },
  {
    id: 2,
    tagName: 'tag',
    tagLabel: 'tag label',
    charts: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
  },
  {
    id: 3,
    tagName: 'tag',
    tagLabel: 'tag label',
    charts: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
  },
  {
    id: 4,
    tagName: 'tag',
    tagLabel: 'tag label',
    charts: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
  },
  {
    id: 5,
    tagName: 'tag',
    tagLabel: 'tag label',
    charts: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
  },
]

const seriesList = [
  {
    id: 1,
    seriesName: 'Series Name',
    stator: 'Stator',
    year: 2022,
    month: 5,
    sequenceStart: 2,
    executeModule: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
    active: true,
  },
  {
    id: 2,
    seriesName: 'Series Name',
    stator: 'Stator',
    year: 2022,
    month: 5,
    sequenceStart: 2,
    executeModule: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
    active: false,
  },
  {
    id: 3,
    seriesName: 'Series Name',
    stator: 'Stator',
    year: 2022,
    month: 5,
    sequenceStart: 2,
    executeModule: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
    active: false,
  },
  {
    id: 4,
    seriesName: 'Series Name',
    stator: 'Stator',
    year: 2022,
    month: 5,
    sequenceStart: 2,
    executeModule: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
    active: true,
  },
  {
    id: 5,
    seriesName: 'Series Name',
    stator: 'Stator',
    month: 5,
    sequenceStart: 2,
    executeModule: [{id: 'a', label:'A'}, {id: 'b', label:'B'}, {id: 'c', label:'C'}],
    active: true,
  },
]

const businessSectors = [
  {
    id:1,
    activityType: 'Service',
    businessSector: 'Energy'
  },
  {
    id:2,
    activityType: 'Industrial',
    businessSector: 'Food & Agro'
  },
  {
    id:3,
    activityType: 'Trading',
    businessSector: 'General Trading'
  },
  {
    id:4,
    activityType: 'Service',
    businessSector: 'Energy'
  },
]
const accountingPeriods = [
  {
    id: 1,
    accountingPeriod: '2018',
    openingDate: '10/10/2020',
    endingDate: '1/10/2022',
    closing: true,
  },
  {
    id: 2,
    accountingPeriod: '2019',
    openingDate: '10/10/2020',
    endingDate: '1/10/2022',
    closing: true,
  },
  {
    id: 3,
    accountingPeriod: '2020',
    openingDate: '10/10/2020',
    endingDate: '1/10/2022',
    closing: true,
  },
  {
    id: 4,
    accountingPeriod: '2022',
    openingDate: '10/10/2020',
    endingDate: '1/10/2022',
    closing: true,
  },
  {
    id: 5,
    accountingPeriod: '2021',
    openingDate: '10/10/2020',
    endingDate: '1/10/2022',
    closing: true,
  },
]
const dimensionsTypes = [
  {
    id: 1,
    dimensionsTypes: '',
  },
  {
    id: 2,
    dimensionsTypes: '',
  },
  {
    id: 3,
    dimensionsTypes: '',
  },
  {
    id: 4,
    dimensionsTypes: 'dimensionsTypes',
  },
  {
    id: 5,
    dimensionsTypes: 'dimensionsTypes',
  },
]

const taxes = [
  {
    id: '1',
    name: 'ABC 123',
    label: '15%',
    scope: 'Tax Sign',
    computation: 'percentage of price',
    value: 15,
    account: '',
    accountForReturns: '',
    active: false,
  },
  {
    id: '2',
    name: 'ABC 123',
    label: '15%',
    scope: 'Tax Sign',
    computation: 'percentage of price',
    value: 15,
    account: '',
    accountForReturns: '',
    active: false,
  },
  {
    id: '3',
    name: 'ABC 123',
    label: '15%',
    scope: 'Tax Sign',
    computation: 'percentage of price',
    value: 15,
    account: '',
    accountForReturns: '',
    active: false,
  },
  {
    id: '4',
    name: 'ABC 123',
    label: '15%',
    scope: 'Tax Sign',
    computation: 'percentage of price',
    value: 15,
    account: '',
    accountForReturns: '',
    active: false,
  },
  {
    id: '5',
    name: 'ABC 123',
    label: '15%',
    scope: 'Tax Sign',
    computation: 'percentage of price',
    value: 15,
    account: '',
    accountForReturns: '',
    active: false,
  },
];

export default {
  getLanguages: () => makeApiResponse({ items: languages.sort((a,b) => a.language > b.language ? 1 : -1) }),
  editLanguage: (editedLanguage) => makeApiResponse({ editedItems: languages.filter(item => item.id !== editedLanguage.id) }),
  getCurrencies: () => makeApiResponse({ items: currencies }),
  editCurrency: (editedCurrency) => makeApiResponse({ editedItems: currencies.filter(item => item.id !== editedCurrency.id) }),
  getAddresses: () => makeApiResponse({ items: addresses }),
  editAddress: (editedAddress) => makeApiResponse({ editedItems: addresses.filter(item => item.id !== editedAddress.id) }),
  getTags: () => makeApiResponse({ items: tags }),
  addTag: () => (addedTag) => makeApiResponse({ editedItems: tags.push(addedTag) }),
  editTag: () => (editedTag) => makeApiResponse({ editedItems: tags.filter(item => item.id !== editedTag.id) }),
  deleteTag: () => (deletedTag) => makeApiResponse({ editedItems: tags.filter(item => item.id !== deletedTag.id) }),
  getSeries: () => makeApiResponse({ items: seriesList.sort((a,b) => a.active < b.active ? 1 : -1) }),
  addSeries: () => (addedSeries) => makeApiResponse({ addedItems: seriesList.filter(item => item.id !== addedSeries.id) }),
  editSeries: () => (editedSeries) => makeApiResponse({ editedItems: seriesList.filter(item => item.id !== editedSeries.id) }),
  deleteSeries: () => (deletedSeries) => makeApiResponse({ editedItems: seriesList.filter(item => item.id !== deletedSeries.id) }),
  getBusinessSectors: () => makeApiResponse({ items: businessSectors }),
  deleteBusinessSector: () => (deletedSector) => makeApiResponse({ editedItems: businessSectors.filter(item => item.id !== deletedSector.id) }),
  addSector: () => (addedSector) => makeApiResponse({ editedItems: businessSectors.push(addedSector) }),
  editSector: () => (editedSector) => makeApiResponse({ editedItems: businessSectors.filter(item => item.id !== editedSector.id) }),
  deleteSector: () => (deletedSector) => makeApiResponse({ editedItems: businessSectors.filter(item => item.id !== deletedSector.id) }),

  getAccountingPeriods: () => makeApiResponse({ items: accountingPeriods }),
  addAccountingPeriods: () => (addedAccountingPeriods) => makeApiResponse({ editedItems: accountingPeriods.filter(item => item.id !== addedAccountingPeriods.id) }),
  editAccountingPeriods: () => (editedAccountingPeriods) => makeApiResponse({ editedItems: accountingPeriods.filter(item => item.id !== editedAccountingPeriods.id) }),
  deleteAccountingPeriods: () => (deletedAccountingPeriods) => makeApiResponse({ editedItems: accountingPeriods.filter(item => item.id !== deletedAccountingPeriods.id) }),
  getDimensionsTypes: () => makeApiResponse({ items: dimensionsTypes }),
  addedDimensionsTypes: () => (addedDimensionsTypes) => makeApiResponse({ editedItems: dimensionsTypes.filter(item => item.id !== addedDimensionsTypes.id) }),
  deletedDimensionsTypes: () => (deletedDimensionsTypes) => makeApiResponse({ editedItems: dimensionsTypes.filter(item => item.id !== deletedDimensionsTypes.id) }),
  deleteBusinessSector: () => (deletedSector) => makeApiResponse({ editedItems: businessSectors.filter(item => item.id !== deletedSector.id) }),

  getTaxes: () => makeApiResponse({ items: taxes }),
};
