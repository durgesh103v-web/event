export const CATEGORY_FILTER_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Blockchain', value: 'Blockchain' },
  { label: 'Web3', value: 'Web3' },
  { label: 'DeFi', value: 'DeFi' },
  { label: 'Ethereum', value: 'Ethereum' },
  { label: 'NFT', value: 'NFT' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Business', value: 'Business' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Database', value: 'Database' },
  { label: 'Design', value: 'Design' },
  { label: 'Security', value: 'Security' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'AI', value: 'AI' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Engineering', value: 'Engineering' },
];

const locations = [
  'Online',
  'Mumbai',
  'Powai',
  'Bandra',
  'Andheri',
  'Lower Parel',
  'Thane',
  'Navi Mumbai',
  'Pune',
  'Bengaluru',
  'Hyderabad',
  'Delhi',
];

export const LOCATION_FILTER_OPTIONS = [
  { label: 'All Locations', value: '' },
  ...locations.map(location => ({ label: location, value: location })),
];

export const DATE_FILTER_OPTIONS = [
  { label: 'Any Date', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Online Events', value: 'online' },
];
