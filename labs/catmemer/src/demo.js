const {EconomyService}=require('./economy');
const economy=new EconomyService();
console.log('beg:',economy.reward('haunted','beg',{min:1,max:10,cooldownMs:1000}));
console.log('work:',economy.reward('haunted','work',{min:10,max:30,cooldownMs:1000}));
console.log('profile:',economy.profile('haunted'));
