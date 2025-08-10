# Enhanced Spinner Component

A comprehensive, accessible, and highly customizable loading spinner component for React applications.

## Features

- **8 Animation Variants**: default, dots, pulse, logo, ring, bars, grid, wave
- **6 Size Options**: xs, sm, md, lg, xl, 2xl
- **7 Color Themes**: primary, secondary, muted, white, success, warning, error
- **3 Speed Settings**: slow, normal, fast
- **Accessibility**: Built-in ARIA labels and screen reader support
- **Overlay & Full Screen**: Built-in overlay and full-screen modes
- **Specialized Components**: Pre-configured spinners for common use cases

## Basic Usage

```tsx
import { Spinner } from '@/components/ui/spinner'

// Basic spinner
<Spinner />

// With custom text
<Spinner text="Loading..." />

// Different variant
<Spinner variant="dots" text="Processing..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size of the spinner |
| `variant` | `'default' \| 'dots' \| 'pulse' \| 'logo' \| 'ring' \| 'bars' \| 'grid' \| 'wave'` | `'default'` | Animation style |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'white' \| 'success' \| 'warning' \| 'error'` | `'muted'` | Color theme |
| `text` | `string` | `undefined` | Loading text to display |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `overlay` | `boolean` | `false` | Show as overlay |
| `fullScreen` | `boolean` | `false` | Show as full screen |
| `ariaLabel` | `string` | `'Loading...'` | ARIA label for accessibility |

## Variants

### Default
```tsx
<Spinner variant="default" />
```
Classic spinning animation with dots around a circle.

### Dots
```tsx
<Spinner variant="dots" />
```
Three bouncing dots with staggered animation.

### Pulse
```tsx
<Spinner variant="pulse" />
```
Pulsing circle animation.

### Logo
```tsx
<Spinner variant="logo" />
```
Spinning logo animation.

### Ring
```tsx
<Spinner variant="ring" />
```
Spinning ring with transparent top.

### Bars
```tsx
<Spinner variant="bars" />
```
Four vertical bars with staggered pulse animation.

### Grid
```tsx
<Spinner variant="grid" />
```
3x3 grid of dots with wave-like animation.

### Wave
```tsx
<Spinner variant="wave" />
```
Five bars with varying heights and bounce animation.

## Specialized Components

### LoadingSpinner
General-purpose loading spinner with customizable options.

```tsx
import { LoadingSpinner } from '@/components/ui/spinner'

<LoadingSpinner 
  size="lg" 
  text="Loading data..." 
  variant="dots" 
  color="primary" 
/>
```

### FullScreenSpinner
Full-screen overlay spinner for page-level loading.

```tsx
import { FullScreenSpinner } from '@/components/ui/spinner'

<FullScreenSpinner 
  text="Loading application..." 
  variant="ring" 
  color="primary" 
/>
```

### OverlaySpinner
Overlay spinner for component-level loading.

```tsx
import { OverlaySpinner } from '@/components/ui/spinner'

<div className="relative">
  <OverlaySpinner text="Loading content..." />
  {/* Your content */}
</div>
```

### ButtonSpinner
Optimized spinner for buttons.

```tsx
import { ButtonSpinner } from '@/components/ui/spinner'

<Button>
  <ButtonSpinner />
  <span>Loading...</span>
</Button>
```

### Context-Specific Spinners

```tsx
import { 
  PageSpinner, 
  DataSpinner, 
  SuccessSpinner, 
  ErrorSpinner 
} from '@/components/ui/spinner'

// Page loading
<PageSpinner text="Loading page..." />

// Data loading
<DataSpinner text="Loading data..." />

// Success state
<SuccessSpinner text="Processing..." />

// Error state
<ErrorSpinner text="Error occurred..." />
```

## Accessibility

The spinner component includes built-in accessibility features:

- **ARIA Labels**: Customizable `ariaLabel` prop
- **Role**: `role="status"` for screen readers
- **Semantic HTML**: Proper semantic structure

```tsx
<Spinner 
  ariaLabel="Loading user profile data" 
  text="Loading profile..." 
/>
```

## Customization Examples

### Different Sizes
```tsx
<div className="flex items-center space-x-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
  <Spinner size="2xl" />
</div>
```

### Different Colors
```tsx
<div className="flex items-center space-x-4">
  <Spinner color="primary" />
  <Spinner color="success" />
  <Spinner color="warning" />
  <Spinner color="error" />
</div>
```

### Different Speeds
```tsx
<div className="flex items-center space-x-4">
  <Spinner speed="slow" />
  <Spinner speed="normal" />
  <Spinner speed="fast" />
</div>
```

### Overlay Example
```tsx
<div className="relative h-64 border rounded-lg">
  <OverlaySpinner 
    text="Loading content..." 
    variant="dots" 
    color="secondary" 
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <p>Content area</p>
  </div>
</div>
```

## Demo

Visit `/spinner-demo` to see all variants and features in action.

## Migration from Legacy

The enhanced spinner maintains backward compatibility with the original component:

```tsx
// Old usage (still works)
<Spinner size="md" text="Loading..." />

// New enhanced usage
<Spinner 
  size="lg" 
  variant="ring" 
  color="primary" 
  speed="fast" 
  text="Loading..." 
  ariaLabel="Custom loading message"
/>
```

## Performance

- Lightweight animations using CSS transforms
- Minimal re-renders with React.memo optimization
- Efficient CSS classes with Tailwind CSS
- No external dependencies for animations

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Graceful degradation for older browsers
- Accessible across all major screen readers

