class EconomyService {
  constructor(){ this.users=new Map(); this.cooldowns=new Map(); }
  profile(id){ if(!this.users.has(id)) this.users.set(id,{id,balance:0,xp:0,inventory:[]}); return this.users.get(id); }
  key(id,action){ return `${id}:${action}`; }
  remaining(id,action){ return Math.max(0,(this.cooldowns.get(this.key(id,action))||0)-Date.now()); }
  reward(id,action,{min,max,cooldownMs=0}){
    const left=this.remaining(id,action); if(left) return {ok:false,reason:'cooldown',remainingMs:left};
    const amount=Math.floor(Math.random()*(max-min+1))+min,p=this.profile(id); p.balance+=amount;p.xp+=Math.max(1,Math.floor(amount/2));
    if(cooldownMs)this.cooldowns.set(this.key(id,action),Date.now()+cooldownMs); return {ok:true,amount,profile:{...p}};
  }
  buy(id,item){ const p=this.profile(id); if(!item||item.price<0)return{ok:false,reason:'invalid_item'}; if(p.balance<item.price)return{ok:false,reason:'insufficient_funds'};p.balance-=item.price;p.inventory.push(item.id);return{ok:true,profile:{...p}}; }
  transfer(from,to,amount){ if(!Number.isInteger(amount)||amount<=0)return{ok:false,reason:'invalid_amount'};const a=this.profile(from),b=this.profile(to);if(a.balance<amount)return{ok:false,reason:'insufficient_funds'};a.balance-=amount;b.balance+=amount;return{ok:true,from:{...a},to:{...b}}; }
}
module.exports={EconomyService};