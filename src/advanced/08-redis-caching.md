---
title: Redis caching
tier: advanced
platform: java
position: 8
---

# Redis caching

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Redis caching

**Goal**

Add Redis caching to the service layer. Frequently-read items are cached in Redis to reduce database load.

**Prerequisites**

- [OpenAPI documentation](./07-openapi-docs.md)

## Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

## Enable caching

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
        var config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10));
        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
    }
}
```

## Cache the service layer

```java
@Service
public class ItemService {

    @Cacheable("items")
    public List<Item> list() {
        // This method is called only on cache miss
        return repository.findAll();
    }

    @CacheEvict(value = "items", allEntries = true)
    public Item create(Item item) {
        return repository.save(item);
    }

    @CacheEvict(value = "items", key = "#id")
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
```

## Redis configuration

`application-prod.properties`:

```properties
spring.data.redis.host=redis
spring.data.redis.port=6379
```

## Add Redis to docker-compose

```yaml
services:
  # ... app and db services ...
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 3s
      retries: 5
```

Update `depends_on` for the app service:

```yaml
  app:
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }
```

## Verify caching

```bash
# First request — hits database
time curl http://localhost:8080/items
# ~200ms

# Second request — cached
time curl http://localhost:8080/items
# ~5ms (cache hit, no DB query)
```

Monitor with Redis CLI:

```bash
docker exec -it learning-docs-redis-1 redis-cli
127.0.0.1:6379> keys *
# 1) "items::SimpleKey []"
127.0.0.1:6379> TTL "items::SimpleKey []"
# (integer) 542  (seconds remaining)
```

## Checkpoint

```bash
# First request: slow (cache miss)
curl http://localhost:8080/items
# Second request: instant (cache hit)
curl http://localhost:8080/items
# Create a new item — cache evicted
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"new"}' http://localhost:8080/items
```

**Next:** [Actuator and health](./09-actuator-health.md) — production monitoring endpoints.
