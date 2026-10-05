const {catalog}=require('./catalog');
function createCommands(economy){return{
 balance:(id)=>({ok:true,profile:economy.profile(id)}),
 beg:(id)=>economy.reward(id,'beg',{min:1,max:10,cooldownMs:15000}),
 work:(id)=>economy.reward(id,'work',{min:10,max:30,cooldownMs:30000}),
 shop:()=>({ok:true,items:Object.values(catalog)}),
 buy:(id,itemId)=>catalog[itemId]?economy.buy(id,catalog[itemId]):{ok:false,reason:'unknown_item'},
 pay:(from,to,amount)=>economy.transfer(from,to,amount)
}}
module.exports={createCommands};