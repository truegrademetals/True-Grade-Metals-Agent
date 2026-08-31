# True Grade Metals — Design Specification

**Date:** 2026-08-31
**Status:** Approved, ready for implementation planning

---

## 1. Context

True Grade Metals (TGM) is a new Australian company positioned between Australian
buyers of grade-critical metals and Chinese supply. It exists to remove the
uncertainty and risk that currently stops Australian buyers from sourcing
directly from China.

The reference point for the category is `shengxisteel.com` — a Chinese steel
group. TGM is explicitly *not* that: Shengxi is a mill selling its own scale,
whereas TGM is the accountable party that makes buying from a mill safe.

---

## 2. Assessment of the existing repository

The repository at `github.com/truegrademetals/Truegrademetals` was cloned to
`TrueGradeMetals/repo/` and assessed.

### Findings

- The site is a **complete, rebranded mirror of `www.aeether.com`**. The
  scraping scripts that produced it are committed alongside it (`mirror.py`,
  `recursive_mirror.py`, `complete_mirror.py`), and `mirror.py` names the source
  URL directly.
- Scale: 1,581 HTML pages, 3,112 images, 112 grade pages, and the source
  company's branded PDF catalogs.
- Branding was find-and-replaced across the corpus: zero occurrences of the
  source company name remain, and 1,580 pages carry "TrueGrade Metals".
- It is wired to deploy to GitHub Pages from `docs/` via
  `.github/workflows/static.yml`.
- **It is not currently live.** `truegrademetals.com` returns a GitHub Pages 404;
  the most recent commit (`38084f6`) deleted the CNAME.
- Positioning is inverted relative to the intended business. The existing meta
  description reads "Professional manufacturer of nickel alloys / superalloys in
  China" — the opposite of an Australian-accountable intermediary.

### Decision

**The mirror will not be launched, extended, or drawn from for assets.**

The determining reason is commercial, not merely legal. TGM's entire product is
trust. A buyer evaluating whether to believe TGM will research the company; a
site that is a verbatim copy of another supplier's site destroys the proposition
irrecoverably. A reputation for verification cannot be built on unverified
foundations. (The copyright exposure is separately real and warrants the
company's own legal advice.)

### Disposition

- `TrueGradeMetals/repo/` is retained **offline** as market research only.
- `.github/workflows/static.yml` is to be disabled during setup so the mirror
  cannot be deployed accidentally.
- **Nothing from the mirror ships** — no pages, no copy, no images, no PDFs.
- Permitted reuse: the *category information architecture* as a structural
  reference, and the *list of grades* as a market signal. Grade chemistry and
  mechanical properties are published standards data (facts, not authorship) and
  will be rebuilt from ASTM/ASME sources rather than copied.

### Value extracted

The mirror revealed the genuinely useful strategic finding: the category is
**nickel alloys and superalloys**, not commodity steel. This is a materially
better business for TGM (see §4).

---

## 3. Positioning

### The insight

An Australian buyer needing Inconel 625 or Hastelloy C-276 has two bad options.
Buy domestically and pay a heavy distributor markup on limited stock with long
lead times and no control over grade or heat. Or buy direct from China and
inherit five unanswerable questions: Is this mill real? Is the grade real? Is
the mill test certificate real? Will it ship? And when it is wrong, who do I
call?

The last question is the one with no workaround, and it is why buyers who could
halve their material cost do not.

### The promise

> **Chinese pricing. Australian accountability.**

TGM collapses those five unknowns into one counterparty reachable in the buyer's
timezone, under the buyer's law.

### The line the business hangs on

> **We test the metal, not the paperwork — and we are not the ones who test it.**
> Every heat is verified by an accredited independent laboratory before it leaves
> China. The report goes to the buyer, unedited, whether it passes or not.

A mill test certificate is a document, and documents can be produced. Positive
material identification on the delivered heat is what converts a claim into a
fact. Crediting an *independent* lab is stronger than claiming in-house
inspection, because the verifier has no stake in whether the shipment moves.

The final clause — the report is passed on whether it passes or fails — is the
single highest-value sentence on the site.

---

## 4. Market and commercial structure

### Niche: nickel alloys and superalloys

Committed. Rationale:

- **Grade fraud is the real pain.** Substitution and off-spec material is an
  expensive, sometimes catastrophic failure mode in superalloys. Buyers will pay
  for certainty rather than shop on price.
- **The name is the promise.** *True Grade* — the material is the grade it
  claims to be.
- **Anti-dumping safety.** Australia's dumping and countervailing measures bite
  hardest on commodity carbon steel (rebar, HRC, plate, hollow sections,
  galvanised). Nickel superalloys largely sit outside that, which makes the
  principal tier viable where it would be dangerous in structural steel.
- **Margins fund the service.** Mill audits, third-party testing and
  pre-shipment inspection cannot be afforded on commodity margins. On
  superalloys they can, and the verification *is* the product.

Accepted trade-off: a narrow buyer list. That is treated as a feature — the
serious Australian buyers in this market can be individually named.

### Engagement structure: hybrid, led as principal

Two named tiers, presented one level below the homepage:

- **Managed Sourcing** — the buyer contracts the mill; TGM performs
  qualification, specification, verification and logistics for a fee.
- **Delivered** — TGM takes title and sells on an AUD invoice with Australian
  terms and local recourse.

The homepage sells the *outcome* and the Australian-entity backing, not the
corporate structure. This lets the business start capital-light without ever
appearing capital-light, and the site does not need rewriting as the mix shifts.

---

## 5. The verification chain

The centrepiece of the site. Five gates, each answering a question the buyer is
already silently asking.

| # | Gate | Answers |
|---|------|---------|
| 1 | **Mill qualification** — audited on site and approved, not found on a marketplace | Who are you actually buying from? |
| 2 | **Specification lock** — grade, standard, tolerance and full test regime fixed in writing before a PO exists | What exactly did you order? |
| 3 | **Production surveillance** — presence during the run, not only at the end | Is it being made as agreed? |
| 4 | **Independent pre-shipment verification** — accredited third-party lab testing against the actual heat, PMI on the delivered material, presence at loading with authority to stop the container | Is it the grade it says it is? |
| 5 | **Landed accountability** — Australian entity, AUD invoice, local recourse, material replaced if it fails | Who do I call when it is wrong? |

### Capability ladder

The chain must be written so it never requires rewriting as capability grows:

1. **Now** — verification commissioned from accredited third-party inspection
   houses (SGS, Bureau Veritas, Intertek, TÜV, Cotecna).
2. **Next** — a retained China-based QC inspector engaged per job.
3. **Later** — in-house PMI equipment and staff.

The claim *"nothing ships unverified"* is true at every rung. Only the mechanism
beneath it changes.

### The "on the ground" feeling

Delivered not by TGM personally holding the analyser, but by **making the opaque
visible**: timestamped photographs, documents and gate status delivered to the
buyer without being chased. TGM turns a black box into a window. This is
deliverable from day one with no prior experience.

---

## 6. Claims policy

Binding on all site copy. TGM's margin depends on being the party that does not
exaggerate; in a market this small, one discovered overstatement is repeated to
every other buyer.

### Permitted from day one

- Mill qualification: business and export licence verification, credit checks,
  physical factory visits.
- Specification lock: writing a PO naming the standard, test regime and witness
  points.
- Commissioning independent verification and holding release until it passes.
- Acting as the accountable Australian counterparty.
- Freight, customs and delivery coordination.

### Prohibited unless and until true

- "Our metallurgists" / "our engineers" — no claimed in-house technical staff.
- Years in the industry, tonnes shipped, client counts, shipment counts.
- Client names or logos.
- Any specific result, catch, or case study that did not occur.
- Any claim of in-house testing while testing is commissioned externally.

### Handling the experience gap

The genuine weakness is knowing which tests matter for which grade in which
service. Mitigation, reflected in site copy: TGM does not invent the test
regime — the standard defines it (e.g. Inconel 625 plate to ASTM B443, tube to
B444, bar to B446; Hastelloy C-276 plate to B575). TGM specifies to the
standard, requires the lab to verify against it, and adds PMI on the delivered
heat.

Optional trust device for early orders, permitted in copy: **the buyer may
nominate the inspection house.** This costs nothing and converts inexperience
into a display of confidence.

---

## 7. Audience

Primary buyers, in priority order:

1. Mining and resources OEMs and procurement
2. Oil, gas and chemical / petrochemical processing
3. Power generation
4. Specialist fabricators and engineering shops (cut across all of the above;
   no dedicated page)

**Explicitly out of scope:** construction and infrastructure contractors. The
superalloy niche removes rebar, structural sections and the associated AS/NZS
4671 / 3679 conformance liability. This is deliberate.

---

## 8. Information architecture

### Spine (conversion path)

| Route | Purpose |
|-------|---------|
| `/` | Promise, verification chain, proof, CTA |
| `/how-it-works` | The five gates in full detail. The trust engine. |
| `/engagement` | The two commercial tiers |
| `/about` | The Australian entity, honestly told |
| `/contact` | Contact details and RFQ entry |

### Materials

| Route | Purpose |
|-------|---------|
| `/materials` | Grade index, filterable by family, product form and service condition |
| `/materials/<grade>` | One page per grade |

### Industries

`/industries/<sector>` for: oil and gas, chemical and petrochemical processing,
mining and resources, power generation. Same promise, translated into each
buyer's failure mode.

### Deliberate exclusion

**One page per grade, not per grade-and-form.** The mirror used 112 grade pages;
20 grades × 5 product forms of near-identical templated text is thin,
duplicative content that search engines treat as doorway pages and that reads as
padding to humans. Product forms are sections within a single grade page.

---

## 9. Grade database

### Grade set (19)

- **Inconel** — 600, 601, 625, 718, X-750
- **Incoloy** — 800, 800H, 825, 925
- **Monel** — 400, K-500
- **Hastelloy** — B-2, B-3, C-22, C-276, X
- **Grade-critical stainless** — 904L, 2205, 2507

### Product forms

Pipe and tube · fittings · bar and rod · sheet, plate and coil · wire.

### Page content model

Standard technical layer (rebuilt from published standards):

- Designations — UNS number, trade name, EN/DIN equivalent, ASTM spec per form
- Chemical composition
- Mechanical properties
- Service characteristics — what it resists and what it is specified for
- Available forms, size ranges, tolerances

**Plus the differentiating block, unique per grade:**

> **What we verify on this grade** — the specific test regime for the alloy, the
> standard it is verified against, and the substitution risk. Example (C-276):
> the failure mode is under-molybdenum material passed off as spec, so PMI
> targets Mo content on the delivered heat rather than on the certificate.

This block converts a reference page into a sales page at the moment of maximum
technical engagement, proves alloy-level knowledge, restates the core promise in
its most concrete form, and supplies unique text per page so that nineteen grade
pages do not read as one template.

### Data architecture

Grades are **data, not hand-written HTML**. A single `grades.json` plus one
template, generated by `_build.js`. This keeps the corpus consistent, makes the
index filterable without extra work, and reduces adding a grade to a five-minute
data edit.

---

## 10. RFQ

The RFQ is a credibility display, not a contact form. It is the first gate of
the verification chain, experienced rather than described.

### Fields

Grade and standard · product form · dimensions and tolerance · quantity ·
**service medium, temperature and pressure** · required certifications and test
regime · delivery port · target date · contact details.

### Rationale

A longer form normally converts worse. Here it converts better: being asked
about service conditions signals that TGM is reasoning about how the buyer's
part fails rather than how many tonnes they will take. It qualifies hard,
filters unserious enquiries, and produces an enquiry that can actually be
priced.

---

## 11. Visual direction

### Register

Forensic laboratory / audit firm, **not** steelworks. Precise, evidentiary,
calm. Confidence carried by density of real detail rather than spectacle — a
procurement manager de-risking a six-figure purchase is reassured by rigour, not
drama. Restraint is the trust signal.

Explicitly **not** the Shengxi treatment: no cinematic forge aesthetic, no
WebGL hero, no bloom, no ember particles.

### The core device: evidence, not industry

Every competitor uses orange-lit factory photography. TGM's signature visual is
**the document, treated with reverence**: a pre-shipment inspection report as a
legible artifact, a PMI readout showing measured element percentages against
spec limits with the critical value called out, a timestamped loading photograph
with metadata visible.

**Photography rule: evidence photography, not marketing photography.** Flash-lit,
utilitarian, documentary, timestamped — how an inspector's phone photographs a
heat number stamp. More distinctive, cheaper given no owned assets exist, and
honest about what TGM is. Photography is minimised in favour of documents and
diagrams.

### Light-dominant

Against the sector norm and against the house style of adjacent projects. A
certificate on a black background is a design object; on paper it is a fact.
Light also separates TGM from the wall of dark-and-orange supplier sites and is
the correct register for the dense technical tables this site is full of.

Dark is used as **punctuation only**: the hero, and the verification chain
section. Light carries the evidence; dark carries the emotional beats.

### Palette

| Token | Role |
|-------|------|
| **Ink** | Near-black with a cool cast, not pure black. Text and dark punctuation. |
| **Paper** | Warm off-white for document surfaces, so certificates read as physical. |
| **Steel blue** | Brand accent. Instrument-grade, not corporate-tech blue. |
| **Pass green / flag amber** | Functional pair. **Used only on real measured values** — spec-limit indicators, gate status, test results. Never decorative. |

The functional pair makes the palette do positioning work: the business is
literally pass/fail. Decorative use destroys the effect and is prohibited.

### Typography

**IBM Plex Sans + IBM Plex Mono.** Plex was drawn for an engineering company and
carries technical authority without costume.

**Binding rule: every measured value is set in mono** — composition percentages,
UNS numbers, heat numbers, temperatures, tolerances, report IDs, dates. This
creates a consistent instrument texture across every page and makes numbers read
as measured rather than written.

### Motion

Minimal. **No count-up statistics** — a hype device, wrong register.

Motion earns its place in one place: the verification chain, where the five
gates advance on scroll and a PMI readout resolves from raw values into an
in-spec state. Motion that depicts measurement, not excitement.

`prefers-reduced-motion` respected throughout.

---

## 12. Tech and deployment

- **Static site with a `node _build.js` step.** Plain HTML/CSS/JS. One
  `grades.json` drives generated grade pages and the filterable index. No
  framework, no install friction, matching the established pattern in adjacent
  projects.
- **Deploy target: Netlify**, not GitHub Pages. Pages cannot handle form
  submissions, and the RFQ is the most important conversion on the site. Netlify
  provides forms, redirects and deploy previews.
- **Disable `repo/.github/workflows/static.yml`** during setup so the mirror
  cannot deploy.
- Responsive: mobile and desktop both verified in-browser before any task is
  called complete.
- Local preview server on a dedicated port, consistent with adjacent projects.

### Project layout

```
TrueGradeMetals/
  site/    <- new original build
  repo/    <- mirror, offline reference only, never deployed
  docs/    <- specs and planning
```

---

## 13. Phasing

**Launch:** home · how-it-works · engagement · about · contact/RFQ · materials
index · eight hero grades (625, 718, C-276, C-22, 825, 800H, Monel 400, 2507) ·
three industries (mining and resources, oil and gas, chemical and petrochemical
processing).

**Phase two:** remaining eleven grades · the power generation industry page ·
alloy weight calculator · grade comparison tool · insights/resources.

Every phase-two item is additive. Nothing requires rebuilding.

---

## 14. Pre-launch content checklist

The site is built with structured placeholders, clearly marked, to be replaced
with real material before launch. This is a deliberate decision, not an
omission. Placeholders must be visually distinguishable in the build so none
ships by accident.

To be supplied before launch:

- [ ] Registered Australian entity name, ABN, and registered address
- [ ] Real contact details and business phone
- [ ] At least one genuine specimen inspection report (redacted as needed)
- [ ] A genuine PMI readout for the hero evidence device
- [ ] Named inspection house relationships, once engaged
- [ ] Real supplier count or a decision to omit it entirely
- [ ] Terms of trade and the material-replacement commitment, legally reviewed
- [ ] Legal review of the anti-dumping position before the Delivered tier is
      offered publicly

---

## 15. Non-goals

- No content, imagery, copy or PDFs carried over from the mirror.
- No construction or infrastructure segment, and no AS/NZS structural
  conformance claims.
- No commodity carbon steel at launch.
- No claimed capability that does not yet exist (see §6).
- No CMS, customer accounts, or live pricing.

---

## 16. Open items

None blocking implementation. Two items are sequenced to be resolved by the
business rather than the build, and are captured in §14: the legal review of the
anti-dumping position before the Delivered tier is publicly offered, and the
real proof artifacts that replace launch placeholders.
