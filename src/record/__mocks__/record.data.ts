export const mockRecordData = [
  { date: '2021-07-01', id: 'zoap', amount: 69, description: 'C' },
  { date: '2021-07-04', id: 'zogn', amount: 86, description: 'E' },
  { date: '2021-07-07', id: 'zojm', amount: 76, description: 'F' },
  { date: '2021-07-31', id: 'zoml', amount: 62, description: 'G' },
  { date: '2021-07-06', id: 'zopk', amount: 66, description: 'H' },
  { date: '2021-07-10', id: 'zovi', amount: 73, description: 'J' }
];

export const emptyMismatch = {
  fromBank: [],
  fromProxy: []
};

export const mockMismatchData = {
  fromBank: [mockRecordData[0]],
  fromProxy: [mockRecordData[1]]
};

export const mockUnreconciledData = [
  {
    ...mockRecordData[0],
    discrepancyCode: 'CODE',
    remarks: 'REMARKS'
  }
];
