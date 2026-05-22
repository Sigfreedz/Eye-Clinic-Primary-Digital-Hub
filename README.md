# iDoctor Eye Clinic Primary Digital Hub

Single-page clinic website with dynamic sections for Home, Products, Services, and About, plus appointment booking via EmailJS.

## Dark Mode

Dark mode is implemented globally across the site, including:
- Navbar and footer
- All SPA-rendered sections (home/products/services/about)
- Cards, buttons, customizer panel, and branch selection cards
- Booking and confirmation modals
- Form fields and alerts (via Bootstrap theme support)

### Theme selection behavior

Theme initialization follows:
1. Saved user preference from `localStorage` (`idoctor-theme`)
2. Light mode default

### User preference persistence

- Toggling the navbar theme button saves the selected theme in `localStorage`.
- After a user saves a preference, that preference is used on future visits until toggled again.

### Notes

- Bootstrap components are themed via `data-bs-theme` on the document root/body.
- Custom UI surfaces are themed using CSS variables under `:root` and `:root[data-theme='dark']`.
