const {catalog}=require('./catalog');
function createCommands(economy){return{
 balance:(id)=>({ok:true,profile:economy.snapshot(id)}),
 beg:(id)=>economy.reward(id,'beg',{min:1,max:10,cooldownMs:15000}),
 work:(id)=>economy.reward(id,'work',{min:10,max:30,cooldownMs:30000}),
 daily:(id)=>economy.reward(id,'daily',{min:80,max:120,cooldownMs:86400000}),
 shop:()=>({ok:true,items:Object.values(catalog)}),
 buy:(id,itemId)=>catalog[itemId]?economy.buy(id,catalog[itemId]):{ok:false,reason:'unknown_item'},
 pay:(from,to,amount)=>economy.transfer(from,to,amount),
 leaderboard:(limit=10)=>({ok:true,profiles:economy.leaderboard(limit)})
}}
module.exports={createCommands};