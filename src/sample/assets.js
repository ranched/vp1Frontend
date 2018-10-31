const assets = [
  {
    title: 'HR Chatbot',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 10,
    description: 'Allow HR self-service',
    scrmId: '123',
    industry: '',
    tech: ['mobile', 'ada'],
    useCase: ['appDev']
  },
  {
    title: 'Healthcare Blockchain',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 20,
    description: 'Maintain perscription source of truth',
    scrmId: '234',
    industry: ['health'],
    tech: ['bcs'],
    useCase: ['blockChain']
  },
  {
    title: 'Warranty Claim Processing',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 15,
    description: 'Process claims with automation',
    scrmId: '345',
    industry: ['manufacturing'],
    tech: ['pcs'],
    useCase: ['blockChain']
  },
  {
    title: 'AR/VR Shopping App',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 8,
    description: 'Scan products with cell phone for details',
    scrmId: '456',
    industry: ['retail'],
    tech: ['mobile'],
    useCase: ['appDev']
  },
  {
    title: 'HR Chatbot 2',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 10,
    description: 'Allow HR self-service',
    scrmId: '567',
    industry: [''],
    tech: [''],
    useCase: ['']
  },
  {
    title: 'Healthcare Blockchain 2',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 20,
    description: 'Maintain perscription source of truth',
    scrmId: '678',
    industry: ['health'],
    tech: ['bcs'],
    useCase: ['blockChain']
  },
  {
    title: 'Warranty Claim Processing 2',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 15,
    description: 'Process claims with automation',
    scrmId: '789',
    industry: ['manufacturing'],
    tech: ['pcs'],
    useCase: ['blockChain']
  },
  {
    title: 'AR/VR Shopping App 2',
    imgUrl: '/images/placeholderImage.png',
    dateAdded: '2018-10-27T01:55:24.806Z',
    views: 8,
    description: 'Scan products with cell phone for details',
    scrmId: '890',
    industry: ['retail'],
    tech: ['mobile'],
    useCase: ['appDev']
  }
];
const assetsMap = {
  123: 0,
  234: 1,
  345: 2,
  456: 3,
  567: 4,
  678: 5,
  789: 6,
  890: 7
};

module.exports.assets = assets;
module.exports.recents = assets;
module.exports.assetsMap = assetsMap;
