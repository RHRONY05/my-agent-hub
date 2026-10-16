# TMDB (The Movie Database) Credentials Reference

Use these credentials when querying the TMDB API for official movie and TV media (posters, backdrops, cast portraits).

### API Key (v3 auth):
```text
0640e43265aa5fc930814dfb1f3cab7a
```
*Usage:* Pass as query param: `https://api.themoviedb.org/3/search/movie?api_key=0640e43265aa5fc930814dfb1f3cab7a&query=<title>`

---

### Read Access Token (v4 auth - Bearer):
```text
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQwZTQzMjY1YWE1ZmM5MzA4MTRkZmIxZjNjYWI3YSIsIm5iZiI6MTc5MTAyMTUzOS40OTUwMDAxLCJzdWIiOiI2YWMwZDFlMzBmODY0ZjZmODlkMWZiZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LUb1-hSvy9vL7N5kSDN7_d8cEzzUgfPIRb3KNrYpABk
```
*Usage:* Pass as HTTP header:
```javascript
headers: {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQwZTQzMjY1YWE1ZmM5MzA4MTRkZmIxZjNjYWI3YSIsIm5iZiI6MTc5MTAyMTUzOS40OTUwMDAxLCJzdWIiOiI2YWMwZDFlMzBmODY0ZjZmODlkMWZiZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LUb1-hSvy9vL7N5kSDN7_d8cEzzUgfPIRb3KNrYpABk'
}
```

---

### Verified Test Endpoints:
- **Search Movie:** `https://api.themoviedb.org/3/search/movie?api_key=0640e43265aa5fc930814dfb1f3cab7a&query=Inception`
- **Poster CDN Base:** `https://image.tmdb.org/t/p/w500` (e.g., `https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg`)
- **Backdrop CDN Base:** `https://image.tmdb.org/t/p/original`
