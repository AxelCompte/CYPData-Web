# Case Studies Grid Layout Guide

## 📍 Where to View the Layout

**URL:** `http://localhost:3002/case-studies`

(Assuming your dev server is running on port 3002 - adjust if using a different port)

---

## 🎨 Current Grid Configuration

### Desktop Layout (4 columns × auto rows)
- **Base unit size:** 190px height per row
- **Gap between cards:** 16px (4 in Tailwind)
- **Grid system:** CSS Grid with auto-placement

### Grid Pattern (15 items optimized):

```
┌─────────┬─────────┬─────────────────┐
│  SEAT   │ Pfizer  │     Magna       │  ← Row 1
│  (1×1)  │  (1×1)  │     (2×1)       │
├─────────┼─────────┼─────────┬───────┤
│Gestamp  │  Lear   │         │Nissan │  ← Row 2
│  (1×2)  │  (1×1)  │  Mango  │ (2×1) │
│         ├─────────┤  (2×2)  ├───────┤
│         │Plastic  │         │Bente. │  ← Row 3
│         │  (1×1)  │         │ (1×1) │
├─────────┴─────────┴─────────┴───────┤
│           Autoneum, TI Auto          │  ← Row 4
│  (1×1)  │  (1×1)  │  (1×1)  │ (1×1) │
├─────────┼─────────┼─────────┴───────┤
│Ant.Grp  │Balearia │   Volkswagen    │  ← Row 5
│  (1×1)  │  (1×1)  │     (2×1)       │
└─────────┴─────────┴─────────────────┘
```

### Mobile Layout (2 columns)
All items stack in 2 columns with the same span rules applied proportionally.

---

## 📊 Item Size Distribution

| Size   | Count | Projects                                    |
|--------|-------|---------------------------------------------|
| 1×1    | 11    | SEAT, Pfizer, Lear, Plastic, Benteler, etc. |
| 2×1    | 3     | Magna, Nissan, Volkswagen                   |
| 1×2    | 1     | Gestamp                                     |
| 2×2    | 1     | Mango (featured large)                      |

**Total:** 15 projects

---

## 🔧 Recent Changes

1. **Reduced gaps:** From `gap-4 md:gap-6` to `gap-3 md:gap-4`
2. **Fixed row height:** Set to `auto-rows-[190px]` for consistency
3. **Optimized layout:** Rearranged gridSize assignments to minimize empty spaces
4. **Better flow:** Wide (2×1) and tall (1×2) items placed strategically

---

## 🎯 How Grid Sizing Works

Edit in: `src/data/caseStudies.ts`

```typescript
gridSize: { cols: 1, rows: 1 } // Regular square
gridSize: { cols: 2, rows: 1 } // Wide rectangle
gridSize: { cols: 1, rows: 2 } // Tall rectangle
gridSize: { cols: 2, rows: 2 } // Large square
```

The grid automatically places items based on these dimensions using CSS Grid's auto-placement algorithm.

---

## 📝 Files Involved

- **Data:** `src/data/caseStudies.ts` - Grid size configuration
- **Grid Layout:** `src/app/(marketing)/case-studies/page-client.tsx` - Grid container
- **Card Component:** `src/components/sections/CaseStudyCard.tsx` - Individual cards
- **Styles:** `src/app/globals.css` - Custom CSS for grid (minimal)

---

## 🚀 To Make Changes

1. **Change card sizes:** Edit `gridSize` in `src/data/caseStudies.ts`
2. **Adjust gaps:** Modify `gap-3 md:gap-4` in page-client.tsx
3. **Change row height:** Modify `auto-rows-[190px]` in page-client.tsx
4. **Change column count:** Modify `grid-cols-2 md:grid-cols-4`

---

## 💡 Tips for Perfect Layout

- Total column-spans should be divisible by 4 for clean rows
- Mix 1×1, 2×1, and 1×2 items for visual variety
- Place one 2×2 item as a focal point
- Current setup: ~4 rows with minimal gaps

---

Last Updated: October 14, 2025
