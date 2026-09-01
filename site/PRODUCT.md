# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS with a `node _build.js` step generating grade pages from a
single `grades.json`. No framework. Deploy target Netlify (chosen over GitHub
Pages because the RFQ form is the primary conversion and needs native form
handling). Confirmed by the user.

## Users

Australian procurement and technical buyers of grade-critical metals, in
priority order:

1. Mining and resources OEMs and procurement teams
2. Oil, gas and chemical / petrochemical processing
3. Power generation
4. Specialist fabricators and engineering shops (cut across the above)

The situation: the buyer needs a specific superalloy grade to a specific
standard. Buying domestically means a heavy distributor markup on limited stock
with long lead times and no control over grade or heat. Buying direct from China
means inheriting five questions they cannot answer from an Australian office —
is the mill real, is the grade real, is the mill test certificate real, will it
ship, and who do they call when it is wrong. The job is to obtain correct,
certified material without personally carrying that risk.

Explicitly out of scope: construction and infrastructure contractors.

## Product Purpose

True Grade Metals is an Australian intermediary that lets Australian buyers
source nickel alloys and superalloys from China without carrying the
counterparty, grade or logistics risk. Success is an enquiry from a qualified
technical buyer, and a buyer who never has to wonder whether the metal is what
the certificate says.

## Positioning

**Chinese pricing. Australian accountability.**

The mechanism a neighbouring broker could not truthfully copy: every heat is
verified by an accredited independent laboratory before it leaves China, and the
report is passed to the buyer unedited whether it passes or fails. Positive
material identification is performed on the delivered heat, not on the
certificate — "we test the metal, not the paperwork".

Crediting an independent lab rather than in-house inspection is deliberate and
is the stronger claim: the verifier has no stake in whether the shipment moves.

## Operating Context

The company's service is a five-gate verification chain, which is also the
central content structure of the site:

1. **Mill qualification** — audited on site and approved, not found on a marketplace
2. **Specification lock** — grade, standard, tolerance and test regime fixed in writing before a PO exists
3. **Production surveillance** — presence during the run, not only at the end
4. **Independent pre-shipment verification** — accredited third-party lab testing against the actual heat, PMI on delivered material, presence at loading with authority to stop the container
5. **Landed accountability** — Australian entity, AUD invoice, local recourse, material replaced if it fails

Two commercial tiers sit one level below the homepage: **Managed Sourcing** (the
buyer contracts the mill; TGM qualifies, specifies, verifies and moves it for a
fee) and **Delivered** (TGM takes title and sells on an AUD invoice with
Australian terms).

Buyers evaluate on documents: mill test certificates, third-party inspection
reports, PMI readouts, heat numbers, loading photography. These artifacts are
the material of the product and of the site.

## Capabilities and Constraints

- Material scope at launch: nickel alloys and superalloys — Inconel 600, 601,
  625, 718, X-750; Incoloy 800, 800H, 825, 925; Monel 400, K-500; Hastelloy B-2,
  B-3, C-22, C-276, X; plus grade-critical stainless 904L, 2205, 2507. Nineteen
  grades total, eight at launch.
- Product forms: pipe and tube, fittings, bar and rod, sheet/plate/coil, wire.
- No commodity carbon steel. The niche deliberately avoids Australia's
  anti-dumping measures on Chinese steel, which concentrate on rebar, hot-rolled
  coil, plate, hollow sections and galvanised product.
- Verification is currently **commissioned from accredited third-party
  inspection houses**, not performed in-house. The capability ladder is:
  commissioned inspection now, a retained China-based QC inspector next, in-house
  PMI equipment and staff later. All site copy must remain true at every rung.
- Undecided: whether the Delivered (take-title) tier is publicly offered at
  launch. It requires legal review of the anti-dumping position first.

## Brand Commitments

- Name: **True Grade Metals**. The name is the promise — the material is the
  grade it claims to be — and copy should exploit that rather than treat it as
  decoration.
- **Bilt & Co is the Australian entity behind the business** (existing user
  company, Rockhampton QLD). Confirmed by the user: True Grade Metals is the
  trading brand and Bilt & Co is the backing entity, surfaced in the footer and
  About page rather than in the primary lockup. Bilt & Co is the answer to the
  buyer's question "who do I call when it is wrong" — an existing Australian
  company with a trading history, not a new shell.
- Binding claims policy. Prohibited unless and until true: "our metallurgists"
  or "our engineers"; years in the industry; tonnes shipped; client counts or
  names; any specific catch or case study that did not occur; any claim of
  in-house testing while testing is commissioned externally. This constraint is
  strategic, not merely legal — the company's margin depends on being the party
  that does not exaggerate.
- Deliberate anti-reference: `shengxisteel.com` and the wider category's
  orange-lit factory photography. Also an anti-reference is the inherited
  mirrored site (see Evidence).

## Evidence on Hand

**Partial.** Entity and contact details are now confirmed; everything else below
is still outstanding and remains a clearly marked placeholder on the site.
Future work must not fabricate any of it:

- Entity confirmed: Bilt & Co Pty Ltd, ACN 700 798 509.
- Contact confirmed: hello@truegrademetals.com, 07 9999 9999.
- No genuine inspection report, PMI readout, or mill test certificate yet
- No named inspection house relationships yet
- No clients, testimonials, case studies, shipment counts or supplier counts
- No owned photography — the company owns no mill and has no site imagery

Reference material only, never to be shipped: `../repo/` holds a rebranded
mirror of another supplier's website (1,581 pages, 3,112 images, their branded
PDF catalogs). It is retained offline for category IA reference and the grade
list only. No copy, imagery or PDF from it may be used.

Grade chemistry and mechanical properties will be rebuilt from published
ASTM/ASME standards, which are facts rather than authorship.

## Product Principles

1. **Evidence over assertion.** Every trust claim is carried by an artifact a
   buyer can read, not by an adjective.
2. **Never claim a capability that does not exist yet.** Write so that nothing
   needs rewriting as capability grows.
3. **The opaque made visible.** The service is not being on the ground; it is
   delivering timestamped documents and status to the buyer without being
   chased.
4. **Specificity is the trust signal.** A procurement manager de-risking a
   six-figure purchase is reassured by rigour, not drama.
5. **Ask the technical question.** Being asked about service medium,
   temperature and pressure proves TGM reasons about how the buyer's part fails.

## Accessibility & Inclusion

Dense technical tables must stay legible and navigable. Colour is never the sole
carrier of pass/fail meaning — a text or icon indicator always accompanies it.
`prefers-reduced-motion` respected. Responsive to mobile, since buyers check
enquiries on phones from site.
