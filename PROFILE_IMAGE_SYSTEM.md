# Profile Image Management System

## Overview
This system allows users (Parents, Drivers, and Owners) to upload, crop, and manage their profile pictures with a professional image editing experience.

## Features

### 1. **Image Cropper Component** (`ImageCropper.jsx`)
- Drag-and-drop file upload
- Interactive image cropping with circular guide
- Zoom control (1x to 3x)
- Rotation control (0-360 degrees)
- Real-time preview
- Mobile-responsive design

### 2. **Profile Image Context** (`ProfileImageContext.js`)
- Centralized state management for profile images
- Automatic localStorage persistence
- Simple hooks-based API for consuming components
- Per-user image storage

### 3. **Updated Headers**
All three header components now support profile images:
- **OwnerHeader** (`Owner/OwnerHeader.jsx`)
- **DriverHeader** (`Driver/DriverHeader.jsx`)
- **ParentHeader** (`Parent/ParentHeader.jsx`)

Features:
- Display actual profile images instead of icon placeholders
- Click to open profile slide-over
- Hover effect with ring indicator
- Fallback to icon if no image is set

### 4. **Enhanced Profile Slide-Over** (`ProfileSlideOver.jsx`)
- Large profile image display with border
- Camera button to edit/upload new image
- Image cropping modal integration
- Save functionality with context persistence

## Usage

### For Component Developers

#### Using the Profile Image Hook
```jsx
import { useProfileImage } from '../context/ProfileImageContext';

function MyComponent() {
  const { updateProfileImage, getProfileImage } = useProfileImage();
  
  // Get user's profile image
  const userImage = getProfileImage('user-id');
  
  // Update user's profile image
  const handleSaveImage = (croppedImage) => {
    updateProfileImage('user-id', croppedImage);
  };
  
  return (
    // Your component code
  );
}
```

#### Passing Profile Image to Headers
```jsx
<OwnerHeader
  notifications={[]}
  ownerName="David Smith"
  companyName="TrackMate Fleet"
  onMenuClick={handleMenuClick}
  setActiveTab={setActiveTab}
  onLogout={handleLogout}
  profileImage={ownerImage}
  onProfileImageUpdate={handleImageUpdate}
/>
```

#### Using the Image Cropper Modal
```jsx
import ImageCropper from './ImageCropper';

function MyComponent() {
  const [showCropper, setShowCropper] = useState(false);
  
  const handleSaveImage = (croppedImage) => {
    // Do something with the cropped image
    setShowCropper(false);
  };
  
  return (
    <>
      <button onClick={() => setShowCropper(true)}>Upload Photo</button>
      <ImageCropper
        isOpen={showCropper}
        onClose={() => setShowCropper(false)}
        onSave={handleSaveImage}
        title="Upload Profile Picture"
      />
    </>
  );
}
```

## File Structure

```
src/
├── components/
│   ├── ImageCropper.jsx           # Main cropping component
│   ├── ProfileSlideOver.jsx       # Updated with image editing
│   ├── Owner/
│   │   └── OwnerHeader.jsx        # Updated with image support
│   ├── Driver/
│   │   └── DriverHeader.jsx       # Updated with image support
│   └── Parent/
│       └── ParentHeader.jsx       # Updated with image support
├── context/
│   └── ProfileImageContext.js     # Image state management
└── App.js                         # Wrapped with ProfileImageProvider
```

## How It Works

### 1. Image Upload Flow
```
User clicks camera button
  ↓
ImageCropper modal opens
  ↓
User selects image from device
  ↓
Image displayed with crop controls
  ↓
User adjusts zoom/rotation
  ↓
User clicks "Save Image"
  ↓
Cropped image saved to context
  ↓
Context persists to localStorage
```

### 2. Image Display
```
Component mounts
  ↓
Context checks localStorage for saved images
  ↓
If found, displays real profile image
  ↓
If not found, displays icon placeholder
  ↓
Hover effect shows ring around image
```

### 3. Data Persistence
- All profile images are stored in browser's `localStorage`
- Key format: `profileImages` (JSON object)
- Structure: `{ "user-id": "base64-image-data", ... }`
- Automatic save on every image update
- Automatic load on app startup

## Supported Features

### Image Cropper
- ✅ Drag-and-drop upload
- ✅ File browser selection
- ✅ Zoom in/out (1x - 3x)
- ✅ Rotate image (0-360°)
- ✅ Reset rotation button
- ✅ Real-time preview
- ✅ Cancel/Save actions
- ✅ Circle crop guide
- ✅ Responsive design

### Profile Icons
- ✅ Real image display
- ✅ Circular shape with border
- ✅ Hover effects
- ✅ Fallback to icon
- ✅ All three roles (Parent, Driver, Owner)

### Storage
- ✅ localStorage persistence
- ✅ Automatic save/load
- ✅ Per-user image storage
- ✅ No size limitations (base64)

## Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations
1. **Image Size**: Base64 encoded images are stored in localStorage (~50KB limit per image)
2. **Storage Quota**: Browser's localStorage limit (usually 5-10MB)
3. **Loading**: Images load from cache immediately on startup
4. **Rendering**: Circular crop guide uses canvas for smooth rendering

## Styling
- Uses Tailwind CSS for responsive design
- Color scheme matches app branding (#1E3A5F, #3B6FB6, #F5C518)
- Consistent with existing UI components
- Dark mode ready

## Accessibility
- ✅ Keyboard navigation support
- ✅ ARIA labels on buttons
- ✅ Semantic HTML structure
- ✅ Color contrast compliant
- ✅ Touch-friendly controls

## Future Enhancements
- [ ] Server-side image storage (backend integration)
- [ ] Image filters and effects
- [ ] Multiple profile pictures/gallery
- [ ] Image sharing/export
- [ ] Advanced cropping shapes (square, rectangle)
- [ ] Image compression before save
- [ ] CDN integration for faster loading

## Troubleshooting

### Images not persisting
- Check browser's localStorage is enabled
- Check storage quota hasn't been exceeded
- Clear cache and try again

### Image quality issues
- Zoom in to crop optimal area
- Use high-quality source images
- Consider server-side optimization

### Performance issues
- Reduce image dimensions before upload
- Clear localStorage of old images
- Use browser dev tools to monitor memory

## API Reference

### ProfileImageContext

#### useProfileImage() Hook
```typescript
{
  profileImages: Record<string, string>,           // All images
  updateProfileImage: (userId: string, image: string) => void,
  getProfileImage: (userId: string) => string | null,
  removeProfileImage: (userId: string) => void
}
```

### ImageCropper Component Props
```typescript
{
  isOpen: boolean,                    // Modal visibility
  onClose: () => void,               // Close callback
  onSave: (croppedImage: string) => void,  // Save callback
  title?: string                     // Modal title (default: "Upload Profile Picture")
}
```

### Header Component Props
```typescript
{
  profileImage?: string | null,              // Current profile image
  onProfileImageUpdate?: (image: string) => void  // Image update callback
  // ... other existing props
}
```
