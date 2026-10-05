local ProfileService = {}
local profiles = {}

local function copy(t)
 local n = {}
 for k,v in pairs(t) do n[k] = type(v)=="table" and copy(v) or v end
 return n
end

function ProfileService.Create(userId)
 if profiles[userId] then return profiles[userId] end
 local profile = {UserId=userId, Level=1, XP=0, Coins=0, Inventory={}, Equipped={}}
 profiles[userId] = profile
 return profile
end

function ProfileService.Get(userId) return profiles[userId] end
function ProfileService.Snapshot(userId) local p=profiles[userId]; return p and copy(p) or nil end
function ProfileService.AddXP(userId, amount)
 local p=assert(profiles[userId],"profile missing"); p.XP += math.max(0,amount)
 while p.XP >= p.Level*100 do p.XP -= p.Level*100; p.Level += 1 end
 return p.Level,p.XP
end
function ProfileService.AddItem(userId,itemId)
 local p=assert(profiles[userId],"profile missing"); p.Inventory[itemId]=(p.Inventory[itemId] or 0)+1
end
function ProfileService.Remove(userId) profiles[userId]=nil end
return ProfileService