local RateLimiter={};local buckets={}
function RateLimiter.Allow(userId,action,limit,windowSeconds)
 local now=os.clock();local key=tostring(userId)..":"..action;local b=buckets[key]
 if not b or now-b.started>=windowSeconds then buckets[key]={started=now,count=1};return true end
 if b.count>=limit then return false,math.max(0,windowSeconds-(now-b.started)) end
 b.count+=1;return true
end
function RateLimiter.Clear(userId) local prefix=tostring(userId)..":";for key in pairs(buckets) do if string.sub(key,1,#prefix)==prefix then buckets[key]=nil end end end
return RateLimiter