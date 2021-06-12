# **DATA TYPES**

[doc](https://redis.io/topics/data-types)

> **String Data type commands**

get,set,setnx,getset,incr,incrby,decr,exists,del,flushall,keyspaces,expire,ttl,setex,clear,persist,mset,append,rename

> **List Data type commands**

lpush,rpush,linsert,lpop,rpop,lrange,lindex,llen

> **Sets Data type commands**

SADD,SCARD,SDIFF,SDIFFSTORE,SINTER,SINTERSTORE,SISMEMBER,SMEMBERS,SMISMEMBER,SMOVE,SPOP,SRANDMEMBER,SREM

> **Sorted-Sets Data type commands (by score)**

ZADD, zrank, zcount, zcard, zincrby, zrem... & many other `set commands` correspondents

> **Hashes Data type commands**

hset, hget, hgetall, hkeys, hvals, hlen, hdel, hexists, hincrby

<br/><br/>

# **PERSISTENCE**

[doc](https://redis.io/topics/persistence)

RDB (redis database snapshotting), AOF (append-only-file)

<br/><br/>

# **MISC**

Disable RDB `redis-cli config set save ""`
