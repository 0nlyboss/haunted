local MatchService = {}
local queue, queued = {}, {}

function MatchService.Enqueue(userId)
 if queued[userId] then return false,"already_queued" end
 queued[userId]=true; table.insert(queue,userId); return true
end
function MatchService.Dequeue(userId)
 if not queued[userId] then return false end
 queued[userId]=nil
 for i,id in ipairs(queue) do if id==userId then table.remove(queue,i);break end end
 return true
end
function MatchService.PopMatch(size)
 if #queue < size then return nil end
 local players={}
 for _=1,size do local id=table.remove(queue,1);queued[id]=nil;table.insert(players,id) end
 return {Id=string.format("match-%d",os.time()),Players=players,CreatedAt=os.time()}
end
function MatchService.Count() return #queue end
return MatchService