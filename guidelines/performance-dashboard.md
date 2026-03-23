# Performance Weekly Dashboard

Track these metrics every week (mobile p75 first):

| Metric | Target | Week N | Week N+1 | Trend |
|---|---:|---:|---:|---|
| LCP | <= 2.5s |  |  |  |
| INP | <= 200ms |  |  |  |
| CLS | <= 0.1 |  |  |  |
| Reservation Conversion Rate | no regression |  |  |  |

## Data Sources

- Vercel Speed Insights
- `/api/web-vitals` logs/warehouse
- Lighthouse CI run history

## Notes

- Include any deploys that changed media pipeline, animation behavior, or caching headers.
- Flag regressions >10% week-over-week.
