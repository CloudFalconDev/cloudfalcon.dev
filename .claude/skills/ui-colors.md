# UI Color Palette

Use this earth-tone color palette for all UI/UX work in this project.

## Colors

| Name | Hex | Usage |
|------|-----|-------|
| Cream | `#F1F3E0` | Background, light surfaces |
| Sage | `#D2DCB6` | Secondary background, cards |
| Moss | `#A1BC98` | Accent, buttons, highlights |
| Olive | `#778873` | Text, icons, dark elements |

## Tailwind CSS Classes

When using these colors in components, apply them as:

```css
/* In globals.css @theme */
--color-cream: #F1F3E0;
--color-sage: #D2DCB6;
--color-moss: #A1BC98;
--color-olive: #778873;
```

## Usage Guidelines

- **Backgrounds**: Use `cream` for main backgrounds, `sage` for sections/cards
- **Primary Actions**: Use `moss` for buttons and interactive elements
- **Text**: Use `olive` for body text and icons
- **Contrast**: Pair `cream` backgrounds with `olive` text for readability

## Accessibility

- Ensure text contrast ratio meets WCAG 2.1 AA (4.5:1 for normal text)
- `olive` on `cream` passes contrast requirements
- For small text on `moss` backgrounds, use `#333` or darker
