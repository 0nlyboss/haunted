local EconomyService={};local balances={}
local function balance(userId) return balances[userId] or 0 end
function EconomyService.Get(userId) return balance(userId) end
function EconomyService.Credit(userId,amount)
 amount=math.floor(amount or 0);if amount<=0 then return false,"invalid_amount" end
 balances[userId]=balance(userId)+amount;return true,balances[userId]
end
function EconomyService.Debit(userId,amount)
 amount=math.floor(amount or 0);if amount<=0 then return false,"invalid_amount" end
 if balance(userId)<amount then return false,"insufficient_funds" end
 balances[userId]=balance(userId)-amount;return true,balances[userId]
end
function EconomyService.Transfer(fromUserId,toUserId,amount)
 if fromUserId==toUserId then return false,"same_account" end
 local ok,result=EconomyService.Debit(fromUserId,amount);if not ok then return false,result end
 EconomyService.Credit(toUserId,amount);return true,{From=balance(fromUserId),To=balance(toUserId)}
end
function EconomyService.Clear(userId) balances[userId]=nil end
return EconomyService