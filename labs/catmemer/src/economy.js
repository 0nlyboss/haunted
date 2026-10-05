class EconomyService {
  constructor({clock=()=>Date.now(),random=Math.random}={}){this.users=new Map();this.cooldowns=new Map();this.clock=clock;this.random=random;}
  clone(p){return {...p,inventory:{...p.inventory},stats:{...p.stats}};}
  profile(id){if(!this.users.has(id))this.users.set(id,{id,balance:0,xp:0,level:1,inventory:{},stats:{earned:0,spent:0,transferred:0}});return this.users.get(id);}
  snapshot(id){return this.clone(this.profile(id));}
  key(id,action){return `${id}:${action}`;}
  remaining(id,action){return Math.max(0,(this.cooldowns.get(this.key(id,action))||0)-this.clock());}
  addXP(p,xp){p.xp+=xp;while(p.xp>=p.level*100){p.xp-=p.level*100;p.level++;}}
  reward(id,action,{min,max,cooldownMs=0}){if(!Number.isInteger(min)||!Number.isInteger(max)||min<0||max<min)return{ok:false,reason:'invalid_reward'};const left=this.remaining(id,action);if(left)return{ok:false,reason:'cooldown',remainingMs:left};const amount=Math.floor(this.random()*(max-min+1))+min,p=this.profile(id);p.balance+=amount;p.stats.earned+=amount;this.addXP(p,Math.max(1,Math.floor(amount/2)));if(cooldownMs)this.cooldowns.set(this.key(id,action),this.clock()+cooldownMs);return{ok:true,amount,profile:this.clone(p)};}
  buy(id,item){const p=this.profile(id);if(!item||typeof item.id!=='string'||!Number.isInteger(item.price)||item.price<0)return{ok:false,reason:'invalid_item'};if(p.balance<item.price)return{ok:false,reason:'insufficient_funds'};p.balance-=item.price;p.stats.spent+=item.price;p.inventory[item.id]=(p.inventory[item.id]||0)+1;return{ok:true,profile:this.clone(p)};}
  transfer(from,to,amount){if(from===to)return{ok:false,reason:'same_account'};if(!Number.isInteger(amount)||amount<=0)return{ok:false,reason:'invalid_amount'};const a=this.profile(from),b=this.profile(to);if(a.balance<amount)return{ok:false,reason:'insufficient_funds'};a.balance-=amount;b.balance+=amount;a.stats.transferred+=amount;return{ok:true,from:this.clone(a),to:this.clone(b)};}
  leaderboard(limit=10){return[...this.users.values()].sort((a,b)=>b.balance-a.balance||b.xp-a.xp).slice(0,Math.max(1,limit)).map(p=>this.clone(p));}
}
module.exports={EconomyService};