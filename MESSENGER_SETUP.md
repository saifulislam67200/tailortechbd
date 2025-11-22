# Facebook Messenger Chat Widget Setup

This project uses a chat widget popup that redirects users to your Facebook page's Messenger chat using `m.me` links. The widget features a modern design with Messenger blue theme colors, water drop ripple animation, and full responsive support.

## Setup Instructions

### 1. Get Your Facebook Page Username

1. Go to your Facebook Page
2. Click on "About" in the left sidebar
3. Find your Page username (e.g., `yourpagename`)
4. If you don't have a username, go to Page Settings > Page Info and create one

### 2. Configure Environment Variable

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_MESSENGER_PAGE_USERNAME=yourpagename
```

Replace `yourpagename` with your actual Facebook page username.

### 3. Usage

The `ChatWidget` component is already integrated into the main page (`src/app/(main)/page.tsx`) and will appear as a floating button.

#### Using ChatWidgetPopup Component Directly

You can also use the `ChatWidgetPopup` component directly in any component:

```tsx
import ChatWidgetPopup from "@/components/ChatBox/ChatWidgetPopup";

// Basic usage (uses env variable for pageUsername)
<ChatWidgetPopup />

// With custom configuration
<ChatWidgetPopup
  pageUsername="yourpagename"
  companyName="Your Company Name"
  companyLogo="/images/logos/your-logo.png"
  responseTime="Typically replies within 30 minutes"
  greetingMessage="Hello! 👋\nHow can we help you today?"
  showNotification={true}
/>
```

## Features

### Core Features

- **Floating Chat Button**: A circular button with Messenger icon positioned in the bottom-right corner
  - Responsive sizing: 48px on mobile, 56px on desktop
  - Positioned at `bottom-14` on mobile/tablet, `bottom-6` on desktop
  - Smooth hover and active state animations

- **Water Drop Ripple Animation**: 
  - Messenger blue (#0084FF) notification indicator with animated ripple effect
  - Three expanding ripple layers that create a water drop effect
  - Animation automatically stops when the popup is open
  - Always visible (unless `showNotification={false}`)
  - Optimized with `will-change` for smooth performance

- **Chat Popup Widget**: Opens when clicking the floating button, featuring:
  - **Header Section**:
    - Company/brand name and logo (or initial letter avatar)
    - Online status indicator (green dot)
    - Response time message
    - Close button (X)
  - **Timestamp**: Current time in 24-hour format
  - **Greeting Message**: Customizable message with newline support
  - **Chat on Messenger Button**: Messenger blue button that opens Messenger in a new tab

### Design & Theme

- **Messenger Blue Theme**: Uses official Messenger colors (#0084FF, #0066CC)
- **Project Theme Integration**: Uses project's theme colors for borders, backgrounds, and text
- **Responsive Design**: Fully optimized for all device sizes
  - Mobile phones (320px+)
  - Tablets (768px+)
  - Desktop (1024px+)
  - Large screens (1280px+)
- **Safe Area Support**: Respects device safe areas (notches, home indicators)

### Responsive Features

- **Adaptive Sizing**: All elements scale appropriately across devices
- **Touch Optimized**: 
  - Minimum 44px touch targets
  - `touch-manipulation` for better mobile performance
  - Active state feedback
  - Removed tap highlight color
- **Smart Positioning**: 
  - Avoids bottom navigation bars on mobile
  - Proper spacing on all screen sizes
- **Content Handling**:
  - Text truncation for long company names
  - Word wrapping for messages
  - Flexible layouts that prevent overflow

### Animations

- **Slide-up Animation**: Smooth popup appearance
- **Ripple Animation**: Continuous water drop effect (stops when popup is open)
- **Hover Effects**: Scale and shadow transitions
- **Active States**: Visual feedback on button presses

## How It Works

1. Users see the floating Messenger button in the bottom-right corner
2. The notification indicator shows a continuous ripple animation (if enabled)
3. Clicking the button opens the chat popup widget
4. The popup displays company info, greeting message, and timestamp
5. Clicking "Chat on Messenger" opens Facebook Messenger in a new tab/window
6. Users can start a conversation with your Facebook page
7. The link format is: `https://m.me/yourpagename`

## Customization Options

The `ChatWidgetPopup` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageUsername` | `string?` | `undefined` | Your Facebook page username (overrides env variable) |
| `companyName` | `string` | `"Tailortech Support"` | Name to display in the widget header |
| `companyLogo` | `string` | `"/images/logos/logo-.webp"` | URL to your company logo/avatar |
| `responseTime` | `string` | `"Typically replies within an hour"` | Response time message |
| `greetingMessage` | `string` | `"Hi there 👋\nHow can I help you?"` | Greeting message (supports `\n` for newlines) |
| `showNotification` | `boolean` | `true` | Whether to show the notification indicator |

## Component Structure

```
ChatWidget (Wrapper)
└── ChatWidgetPopup (Main Component)
    ├── Floating Chat Button
    │   ├── Messenger Icon
    │   └── Notification Indicator (with ripple animation)
    └── Chat Popup (when open)
        ├── Header
        │   ├── Company Logo/Avatar
        │   ├── Company Name
        │   ├── Response Time
        │   └── Close Button
        ├── Timestamp
        ├── Greeting Message
        └── Chat on Messenger Button
```

## File Locations

- **Component**: `src/components/ChatBox/ChatWidgetPopup.tsx`
- **Wrapper**: `src/components/ChatBox/ChatWidget.tsx`
- **Usage**: `src/app/(main)/page.tsx`
- **Styles**: `src/app/globals.css` (ripple animations)
- **Icon**: `public/images/Messenger.svg`

## Notes

- The widget will not render if no page username is provided (shows console warning)
- Make sure your Facebook page has messaging enabled
- Users need to be logged into Facebook to use Messenger
- The notification indicator always shows (unless `showNotification={false}`)
- The ripple animation automatically stops when the popup is open
- The popup can be closed by clicking the X button
- All animations are optimized for performance
- The component uses Next.js Image component for optimized image loading
- Safe area insets are respected for devices with notches/home indicators

