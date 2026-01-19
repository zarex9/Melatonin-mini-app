# Notification Bell Icon - Implementation Guide

## Overview
I've added a beautiful notification bell icon system to your Melatonin mini-app. This bell icon appears in the header and shows notifications for important game events like game over, new best scores, and achievements.

## Features

### 🔔 Notification Bell Component
- **Location**: `/components/NotificationBell.tsx`
- **Features**:
  - Bell icon with animated badge showing unread count
  - Dropdown menu displaying all notifications
  - Auto-dismiss notifications after 10 seconds
  - Manual dismiss with close button (✕)
  - "Clear All" button to dismiss all notifications
  - Click overlay to close dropdown
  - Responsive design with dark mode support

### 📱 Notification Types
1. **info** - Blue (general information)
2. **success** - Green (achievements unlocked)
3. **milestone** - Yellow (new best scores, major events)

### 🎮 Auto-Notifications

The app automatically shows notifications for:

1. **Game Over Event** (info type)
   ```
   "Game Over! Score: [score]"
   ```

2. **New Best Score** (milestone type)
   ```
   "🎉 New Best Score: [score]!"
   ```

3. **Achievement Unlocked** (success type)
   ```
   "Achievement Unlocked: [achievement-name]"
   ```

## Usage

### In Components
To manually add notifications anywhere in your app, use the global function:

```javascript
// @ts-ignore
window.appShowNotification('Your message here', 'success');
```

### Current Triggers
- Game over → notification
- New best score → milestone notification
- Achievement unlock → success notification

## Styling
The component uses TailwindCSS with support for:
- Light and dark modes
- Responsive design
- Smooth transitions and animations
- Color-coded notification types

## Files Modified
1. `/App.tsx` - Added notification state, effects, and bell icon header
2. `/components/NotificationBell.tsx` - New notification bell component

## What You Can Customize
- Auto-dismiss timeout (currently 10 seconds)
- Notification colors in `getIconColor()` function
- Bell icon SVG design
- Dropdown styling and position
- Badge styling and colors

Enjoy your new notification system! 🎉
