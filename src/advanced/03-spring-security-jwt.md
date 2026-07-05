---
title: Spring Security JWT
tier: advanced
platform: java
position: 3
---

# Spring Security JWT

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Spring Security JWT

**Goal**

Add Spring Security with JWT bearer authentication. A `/auth/login` endpoint returns a token; protected endpoints require `Authorization: Bearer <token>`.

**Prerequisites**

- [Flyway migrations](./02-flyway-migrations.md)

## Dependencies

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.6</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
```

## Security config

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter();
    }
}
```

## JWT utility

```java
@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor("my-secret-key-at-least-256-bits-long-change-in-prod!".getBytes());

    public String generate(String username) {
        return Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 3600_000))
            .signWith(key)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(key).build()
            .parseSignedClaims(token).getPayload().getSubject();
    }
}
```

## Auth controller

```java
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtUtil jwt;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        // In production, verify username/password against a UserDetailsService
        String token = jwt.generate(body.getOrDefault("username", "user"));
        return Map.of("token", token);
    }
}
```

## JWT filter

```java
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired private JwtUtil jwt;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String user = jwt.extractUsername(token);
            var auth = new UsernamePasswordAuthenticationToken(user, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}
```

## Checkpoint

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -d '{"username":"alice"}' \
  -H "Content-Type: application/json" | jq -r '.token')

curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/items
# → [{"id":1,...}]  200 OK

curl http://localhost:8080/items
# → 403 Forbidden
```

**Next:** [Profiles and configuration](./04-profiles-config.md) — dev vs prod, .env, externalized config.
