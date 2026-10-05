local InventoryService={}
local inventories={}
local function get(userId) inventories[userId]=inventories[userId] or {};return inventories[userId] end
function InventoryService.Add(userId,itemId,amount)
 amount=math.floor(amount or 1);if amount<=0 then return false,"invalid_amount" end
 local inv=get(userId);inv[itemId]=(inv[itemId] or 0)+amount;return true,inv[itemId]
end
function InventoryService.Remove(userId,itemId,amount)
 amount=math.floor(amount or 1);local inv=get(userId);local current=inv[itemId] or 0
 if amount<=0 then return false,"invalid_amount" end;if current<amount then return false,"insufficient_items" end
 inv[itemId]=current-amount;if inv[itemId]==0 then inv[itemId]=nil end;return true,inv[itemId] or 0
end
function InventoryService.Has(userId,itemId,amount) return (get(userId)[itemId] or 0)>=(amount or 1) end
function InventoryService.Snapshot(userId) local out={};for k,v in pairs(get(userId)) do out[k]=v end;return out end
function InventoryService.Clear(userId) inventories[userId]=nil end
return InventoryService