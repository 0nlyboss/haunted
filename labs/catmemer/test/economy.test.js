const assert=require('assert');const {EconomyService}=require('../src/economy');
let now=1000;const e=new EconomyService({clock:()=>now,random:()=>0});
let r=e.reward('a','work',{min:20,max:20,cooldownMs:1000});assert.equal(r.ok,true);assert.equal(e.snapshot('a').balance,20);
assert.equal(e.reward('a','work',{min:20,max:20,cooldownMs:1000}).reason,'cooldown');now+=1001;assert.equal(e.reward('a','work',{min:20,max:20,cooldownMs:1000}).ok,true);
assert.equal(e.transfer('a','b',5).ok,true);assert.equal(e.snapshot('b').balance,5);assert.equal(e.transfer('a','a',1).reason,'same_account');
assert.equal(e.transfer('a','b',999).reason,'insufficient_funds');assert.equal(e.buy('a',{id:'x',price:10}).ok,true);assert.equal(e.snapshot('a').inventory.x,1);assert.equal(e.buy('a',{id:'x',price:10}).ok,true);assert.equal(e.snapshot('a').inventory.x,2);
e.reward('b','gift',{min:100,max:100});assert.equal(e.leaderboard(1)[0].id,'b');
const snap=e.snapshot('a');snap.balance=99999;assert.notEqual(e.snapshot('a').balance,99999);
console.log('CatMemer economy tests passed');