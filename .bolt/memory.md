# Project memory

## Product intent & audience

- Personal portfolio site for Gowtham Chowdam.
- Audience: potential employers, clients, collaborators.
- Positioning: systems designer enabling ambitious ideas in production.

## Brand personality & voice

- Professional, confident, technically grounded.
- Concise hero statement emphasizing production systems.

## Visual design & UX direction

- Hero section pairs a profile photo with an intro line.
- Hero text sits close to the photo; layout must avoid overlap with the face.
- Desktop: text can be shifted horizontally (left) to clear the photo.
- Mobile/smaller screens: keep normal alignment for readability.
- Stack: Vite + React, Tailwind CSS, Lucide React icons.
- No extra UI/theme/icon packages beyond the stack defaults.

## Decisions, constraints & rationale

- Moved only the "I design the systems..." paragraph left on desktop to resolve overlap with the profile photo.
- Left smaller-screen alignment untouched to preserve readability.
- Project continues to build successfully after the change.
- Tailwind classes preferred for responsive positioning adjustments.

## Open questions & assumptions

- Exact hero layout structure (photo placement, container widths) not yet documented.
- Whether other sections have similar overlap risks with imagery is unknown.
- Intro text may contain a typo ("le" vs "let"); awaiting user confirmation before correcting.