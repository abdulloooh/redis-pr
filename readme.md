# **Quick notes**

- To test `Task List` project, change `start` script in `package.json` to `"node task-list-with-redis"`

- For caching with redis using _fetching from github_ as an example, leave `start` script as `node index.js`

<br/><br/>

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

**Setup automatic backup of rdb to disk**

1. Install `rdiff-backup`

   > `sudo apt-get install -y rdiff-backup`

2. setup rdiff-backup

   > `sudo rdiff-backup --preserve-numerical-ids <memory location eg /var/.../redis> <disk backup eg /home/.../redis>`

3. Setup cron job to do the automatically backups

- Edit cron jobs
  > `sudo crontab -e`
- Pick editor
- Input cron job eg run everyday at 12am
  > `0 0 * * * rdiff-backup --preserve-numerical-ids --no-file-statistics /var/lib/redis/ /home/.../redis`
