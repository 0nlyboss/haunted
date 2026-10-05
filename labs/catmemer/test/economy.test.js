const assert=require('assert');const {EconomyService}=require('../src/economy');
const e=new EconomyService();
let r=e.reward('a','work',{min:20,max:20});assert.equal(r.ok,true);assert.equal(e.profile('a').balance,20);
assert.equal(e.transfer('a','b',5).ok,true);assert.equal(e.profile('a').balance,15);assert.equal(e.profile('b').balance,5);
assert.equal(e.transfer('a','b',999).reason,'insufficient_funds');
assert.equal(e.buy('a',{id:'x',price:10}).ok,true);assert.deepEqual(e.profile('a').inventory,['x']);
console.log('CatMemer economy tests passed');