# FARO-2 — KAGE → FARO MASTER VISUAL ROADMAP

## Mission

Port the proven visual architecture of **Kage** into **Faro** without reinterpretation, shortcuts, cosmetic patches or speculative replacements.

This document is the single living source of truth for the visual port.

### Donor
- `Juanmaes83/kage`
- Kage is the visual/technical donor.

### Protected source / reference
- `Juanmaes83/MASTER-CLASS-HISTORIA-FARO-MEMORIA`
- Approved Faro remains the protected reference and fallback.

### Active implementation repo
- `Juanmaes83/FARO-2`
- All risky visual reconstruction happens here.

---

# NON-NEGOTIABLE PRINCIPLE

Do not reinterpret Kage.

Replicate the proven Kage system and adapt only what must change for Faro:

- Japanese temple → lighthouse / Atlantic coast
- Kage vegetation → Atlantic coastal vegetation
- temple stone → coastal basalt / granite / wet rock
- moon / lantern atmosphere → lighthouse beam / sea mist / horizon
- Kage scene plates → Faro Keeper / Machine plates

Do **not** replace Kage techniques with simplified CSS approximations.

---

# FINAL TARGET ARCHITECTURE

## KAGE

```text
WebGL world
↓
scene plates
↓
alpha near planes
↓
editorial
↓
vignette + grain
```

## FARO

```text
Faro WebGL world
↓
Keeper / Machine scene plates
↓
Atlantic alpha foregrounds
↓
storytelling
↓
vignette + grain
```

The goal is not similarity of idea. The goal is parity of visual system and premium quality.

---

# BLOCK 1 — PORT KAGE FOREGROUND SYSTEM

**STATUS: PENDING**

Kage uses a real alpha-preserving WebP library and moves the active chapter foreground into a fixed near-plane stage `#fg-sky`.

Assets remain visually solid, enter in sequence and retire with blur.

## Faro equivalent asset library

Create real alpha-preserving foreground assets:

- `coastal-basalt.webp`
- `wet-rocks.webp`
- `coastal-grass.webp`
- `cliff-edge.webp`
- `sea-spray.webp`
- `distant-headland.webp`
- optional `lighthouse-wall-fragment.webp` only if a scene genuinely requires it

No CSS-simulated rocks or vegetation.

## Architecture to replicate from Kage

- `.fg`
- `.fg-el`
- `.fg-active`
- `.fg-retiring`
- reparent active foreground into `#fg-sky`
- fixed viewport near plane
- bottom-anchored composition
- staggered entrance delays of 90 ms
- directional entrance from bottom / left / right
- full-opacity artwork
- retiring transition with blur + slight downward movement
- reduced-motion fallback
- chapter ownership of foreground stage

## Acceptance criteria

- foreground feels physically between viewer and WebGL world
- no obvious CSS polygon silhouettes
- no transparent wallpaper effect
- desktop and mobile compositions preserve depth
- active foreground changes by chapter without visual duplication

---

# BLOCK 2 — KEEPER AS A TRUE KAGE-STYLE SCENE PLATE

**STATUS: PENDING**

Do not invent a new effect.

Keeper must be treated as a real scene plate in the same visual logic used by Kage.

## Core rule

The complete Keeper image remains visible.

No aggressive mask that destroys the photograph.

## Layer architecture

```text
WebGL Faro
↓
Keeper scene plate
↓
Atlantic alpha foreground
↓
editorial content
↓
vignette / grain
```

## Plate adaptation

Use:

- exposure matching
- grading
- scrim
- contrast control
- local glow
- subtle parallax
- real foreground occlusion

Do not use destructive radial masking as the primary integration technique.

## Port Kage plate physical treatment

Reuse the donor's plate/canvas/WebGL treatment where appropriate to obtain:

- microdepth
- subtle deformation
- light response
- highlight
- contact shadow
- edge perspective

Use the same proven engine with Faro-specific parameters instead of building a new replacement system.

## Acceptance criteria

- full Keeper composition remains legible
- no hard rectangle appears pasted onto the world
- no visible aggressive crop
- at least one genuine Atlantic near-plane element crosses in front of the plate
- image and world share exposure, black level and atmosphere
- motion is subtle and cinematic, not effect-driven

---

# BLOCK 3 — MACHINE: PORT THE REAL “HOLE PUNCHED IN THE PAGE” SYSTEM

**STATUS: PENDING**

Kage renders the live world directly into measured HTML frames using viewport/scissor composition.

Machine must use the same principle.

Do not bolt a generic `setViewOffset()` hook onto an already-composed shot and call it finished.

## Exact process

1. Fix the Machine hero camera.
2. Define the HTML frame.
3. Measure its live rectangle.
4. Render the same Faro world directly into that rectangle with scissor/viewport.
5. Art-direct camera + frame together until architectural continuity is achieved.
6. Keep only **one lighthouse representation**.

## Composition landmarks

Use fixed visible landmarks during alignment, such as:

- lighthouse vertical axis
- balcony edge
- lantern room / Fresnel centre
- architectural contour at frame boundary

Temporary debug guides are allowed during implementation and must be removed after validation.

## Acceptance criteria

- no perception of “large lighthouse + second small lighthouse”
- lighthouse contour continues perceptually through the frame
- same world, same object, same shot
- frame behaves as a genuine aperture, not a second picture
- desktop and mobile both remain compositionally coherent

---

# BLOCK 4 — PORT KAGE PROCEDURAL MATERIALITY

**STATUS: PENDING**

Faro must not rely on a simple diffuse texture with generic roughness values.

Port the actual material-building philosophy used in Kage.

## Create `texCoastalRock()` based on Kage's proven stone system

Adapt for Atlantic coastal geology:

- basalt / granite mineral variation
- feldspar-like light mineral population where appropriate
- quartz-like mid mineral population
- dark mineral speckle
- salt traces
- erosion
- moisture
- lichens
- pitting
- fractures
- wet zones

## Required outputs

- albedo map
- normal map
- roughness map

Where appropriate, derive surface behaviour from the same procedural height information rather than painting unrelated noise layers.

## Acceptance criteria

- rocks no longer read as grey plastic
- wet/dry difference is visible but restrained
- close and mid-distance surfaces both retain visual information
- material reacts credibly to Faro lighting

---

# BLOCK 5 — PORT KAGE SPATIAL WORLD STRUCTURE

**STATUS: PENDING**

Do not improve the world by simply adding more generic rocks.

Kage achieves depth through a hierarchy of spatial planes.

## Faro hierarchy

### FAR BACKGROUND
- sky dome / plate
- distant cloud haze
- far headland

### BACKGROUND
- horizon haze
- far sea

### MIDGROUND
- ocean
- island / cliff
- lighthouse

### NEAR GROUND
- wet rock
- shore fragments
- coastal grass

### FOREGROUND
- real alpha cutouts
- sea spray
- dark rock silhouette

## Acceptance criteria

- at least three clearly readable depth planes in every principal Faro shot
- lighthouse does not float against an empty background
- near / mid / far elements respond differently to fog and light
- world retains clarity without becoming visually busy

---

# BLOCK 6 — PORT KAGE ATMOSPHERE

**STATUS: PENDING**

The lighthouse must exist **inside air**, not in front of a background.

## Required behaviour

- horizon colour converges toward fog colour
- far sea disappears progressively into haze
- headland is partially consumed by atmospheric depth
- beam visibility comes from moisture / particulate air
- sea spray exists at multiple depths
- exposure can evolve by narrative section
- sky / horizon / fog should meet without a visible seam

## Acceptance criteria

- no hard horizon seam
- distance is readable atmospherically
- beam feels volumetric because of the environment, not merely brighter
- Faro world feels humid, coastal and nocturnal

---

# BLOCK 7 — PORT KAGE SCENE-PLATE PHILOSOPHY

**STATUS: PENDING**

Kage does not force every visually rich moment into pure procedural 3D.

It uses art-directed generated stills where a plate produces a richer result, then integrates them with the live WebGL world.

## Keeper

Use the real Keeper plate.

## Machine

If a dedicated plate is required, create one specifically art-directed for the exact Faro camera and frame.

Never force an arbitrary image into geometry that does not match it.

## Acceptance criteria

- every plate has a defined role in the shot
- plate perspective supports the camera
- no plate is introduced only because it looks attractive in isolation
- plate and WebGL world read as one composition

---

# BLOCK 8 — KAGE-LEVEL VISUAL QA

**STATUS: PENDING**

QA must validate the resulting image, not merely confirm that functions executed.

## Keeper QA

Validate:

- complete image visible
- no hard rectangular edge
- no aggressive crop
- genuine foreground element in front
- visual integration with world

## Machine QA

Validate:

- landmark continuity
- same lighthouse axis
- same geometry reading across the frame
- perceptual continuity
- no duplicate lighthouse representation

## World QA

Validate:

- minimum three readable depth planes
- real alpha foreground
- normal / roughness material response
- atmospheric depth
- no hard horizon seam

## Mandatory viewports

- Desktop: `1440 × 1000`
- Mobile: `390 × 844`

## Mandatory evidence

- checkpoint screenshots
- side-by-side Kage/Faro reference review where useful
- Playwright geometry / state checks
- human visual review before approval

Automated PASS does not replace human visual approval.

---

# WHAT WE DO NOT DO

Do not reintroduce:

- another aggressive mask
- another decorative gradient as a substitute for an asset
- more `clip-path` fake geology
- more generic rocks simply to increase density
- a third arbitrary sea plane
- cosmetic hacks around Machine frame
- a new visual system invented instead of porting Kage

If a proposed solution cannot be traced back to the Kage donor architecture or is not necessary for Faro adaptation, it requires explicit justification before implementation.

---

# EXECUTION ORDER

The approved implementation order is:

1. **Foreground engine + real Faro alpha asset library**
2. **Kage material system → `texCoastalRock()` and related Faro materials**
3. **World depth hierarchy**
4. **Keeper scene plate integration**
5. **Machine scissor/viewport composition**
6. **Atmospheric integration**
7. **Scene-plate refinement where required**
8. **Kage-level QA + human review**

Do not skip forward simply because a later block is visually tempting.

---

# STATUS BOARD

| Block | Scope | Status |
|---|---|---|
| 1 | Kage foreground system → Atlantic foreground system | PENDING |
| 2 | Keeper scene plate | PENDING |
| 3 | Machine hole-punched viewport | PENDING |
| 4 | Procedural coastal materiality | PENDING |
| 5 | Spatial world hierarchy | PENDING |
| 6 | Atmosphere | PENDING |
| 7 | Scene-plate philosophy / art direction | PENDING |
| 8 | Visual QA + human approval | PENDING |

---

# GOVERNANCE

- This is the single roadmap for the Kage → Faro visual port.
- Do not create `V2`, `FINAL`, `CURRENT`, or parallel roadmap files.
- Update this document as work progresses.
- A block may move from `PENDING` → `IN PROGRESS` → `VALIDATED` only with evidence.
- Human visual review is mandatory for Blocks 1–8 before final acceptance.
- `MASTER-CLASS-HISTORIA-FARO-MEMORIA` remains protected and unchanged by this experimental port.
- `FARO-2` is the implementation laboratory.

---

# NORTH STAR

We are not trying to make Faro “inspired by Kage”.

We are porting the visual system that already worked in Kage and adapting it faithfully to Faro until the result reaches the same premium, layered and cinematic standard.
