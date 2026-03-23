# App Architecture

## Folder Layout

- `App.tsx`: Root composition and route-less section orchestration.
- `domain/`: Business data models and static domain sources (`fleet.ts`).
- `layout/`: Global layout blocks shared across sections (`Navigation`, `Footer`).
- `sections/`: Page sections with business UI (`Hero`, `Collection`, `Yacht`, `Experience`, `Reservation`, `VehicleDetail`).
- `shared/`:
  - `hooks/`: Reusable app hooks (`useScrollLock`).
  - `media/`: Asset manifest + responsive image resolution.
  - `types/`: Shared app-level types (`assets`).
- `performance/`: Runtime performance instrumentation (`webVitals`).
- `components/ui` and `components/figma`: Internal UI kit and utility components.

## Conventions

- Keep section-specific code inside `sections/`.
- Keep cross-section primitives inside `shared/`.
- Avoid importing from `components/ui` directly in domain logic files.
- Prefer importing domain data from `domain/` only.
- If a section grows large, split into `sections/<feature>/` with local subcomponents.
