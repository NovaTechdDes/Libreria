# Interface Design System — Lachi Librería

## Intent & Visual Direction
- **Human**: Operador / Administrador de la librería atendiendo caja o gestionando inventario.
- **Tone & Domain**: Obsidian & Warm Amber — ambiente de librería moderno, técnico y sobrio con acentos dorados/ámbar e interfaz con elevación sutil.
- **Aesthetics**: Dark mode con fondo obsidian slate (`#0B0F17`), panel glassmorfismo (`bg-slate-900/80 backdrop-blur-xl border-slate-800`), acentos ámbar (`#F59E0B`), tipografía moderna (`Outfit` / `Plus Jakarta Sans`).

## Hierarchy & Typography
- **Type Scale**: 11px uppercase labels · 14px body/input text · 24px-30px hero headings.
- **Font Families**:
  - Headings: `Outfit` (Bold, tracking-tight)
  - UI / Body: `Plus Jakarta Sans`

## Depth & Spacing Base
- **Depth**: Surface layering con bordes orgánicos sutiles (`rgba(255,255,255,0.08)` / `border-slate-800`) y resplandor ambiental tenue (`bg-amber-500/10 blur-3xl`).
- **Inputs**: Inset oscurecido (`bg-slate-950/70`) con foco dinámico de resplandor ámbar (`focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/60`).
- **Control Tokens**:
  - Button primary: `bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98]`
  - Inputs: `rounded-xl py-3 pl-10 text-sm`
