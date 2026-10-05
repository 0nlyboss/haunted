local InteractionService={}
function InteractionService.new(deps)
 assert(deps and deps.RateLimiter and deps.Inventory and deps.Economy,"missing dependencies")
 local self={}
 function self.Handle(userId,request)
  if type(request)~="table" or type(request.Action)~="string" then return false,"invalid_request" end
  local allowed,retry=deps.RateLimiter.Allow(userId,request.Action,6,3);if not allowed then return false,{Code="rate_limited",RetryAfter=retry} end
  if request.Action=="collect" then
   if type(request.ItemId)~="string" or #request.ItemId>64 then return false,"invalid_item" end
   return deps.Inventory.Add(userId,request.ItemId,1)
  elseif request.Action=="purchase" then
   if type(request.ItemId)~="string" or type(request.Price)~="number" then return false,"invalid_purchase" end
   local price=math.floor(request.Price);if price<=0 then return false,"invalid_purchase" end
   local ok,reason=deps.Economy.Debit(userId,price);if not ok then return false,reason end
   local added=deps.Inventory.Add(userId,request.ItemId,1);if not added then deps.Economy.Credit(userId,price);return false,"inventory_error" end
   return true,{Balance=deps.Economy.Get(userId),Inventory=deps.Inventory.Snapshot(userId)}
  end
  return false,"unknown_action"
 end
 return self
end
return InteractionService