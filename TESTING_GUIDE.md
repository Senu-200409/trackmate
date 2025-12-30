# Profile Image System - Testing Guide

## 🧪 How to Test the Feature

### Setup
1. Start the React app: `npm start`
2. Navigate to any of the three dashboards (Owner, Driver, Parent)
3. The profile icon should be visible in the header

---

## Test Case 1: Upload Profile Image

### Steps:
1. Click on the profile icon/button in the header
2. The profile slide-over should open on the right side
3. You should see a placeholder avatar with a camera button
4. Click the camera button (or the avatar area)
5. The image cropper modal should open

### Expected Result:
✅ Modal shows "Upload Profile Picture" title
✅ File upload section is visible
✅ Can click upload area or browse files

---

## Test Case 2: Select and Crop Image

### Steps:
1. In the image cropper modal, click to upload or drag-drop an image
2. Wait for image to load in preview
3. The image should appear in a 250x250px canvas with controls

### Expected Result:
✅ Image displays in the canvas
✅ Circular crop guide is visible (gold/yellow circle)
✅ Zoom slider appears (1x - 3x range)
✅ Rotation slider appears (0-360°)
✅ Zoom and rotation values show in real-time

---

## Test Case 3: Zoom Control

### Steps:
1. In the cropper with image loaded
2. Drag the zoom slider to the right (increase)
3. Image should zoom in
4. Drag zoom slider to left (decrease)
5. Image should zoom out

### Expected Result:
✅ Image scales smoothly
✅ Zoom percentage updates in real-time
✅ Range is 1x (100%) to 3x (300%)
✅ Changes are visible immediately in preview

---

## Test Case 4: Rotation Control

### Steps:
1. In the cropper with image loaded
2. Drag the rotation slider right
3. Image should rotate clockwise
4. Drag rotation slider left
5. Image should rotate counter-clockwise
6. Click reset button (rotate icon)
7. Image should reset to 0°

### Expected Result:
✅ Image rotates smoothly
✅ Rotation angle updates (0-360°)
✅ Increments in 15° steps
✅ Reset button returns to 0°

---

## Test Case 5: Drag to Position

### Steps:
1. In the cropper with image loaded
2. Click and drag the image within the canvas
3. Image should move to new position
4. Release mouse to place

### Expected Result:
✅ Cursor changes to "grab" when hovering
✅ Cursor changes to "grabbing" while dragging
✅ Image moves smoothly within bounds
✅ Circular guide remains centered

---

## Test Case 6: Save Image

### Steps:
1. Adjust zoom and rotation to desired crop
2. Click "Save Image" button
3. Modal should close
4. Return to profile slide-over

### Expected Result:
✅ Modal closes automatically
✅ Profile avatar now shows cropped image
✅ Image is circular with border
✅ Camera button still visible for editing

---

## Test Case 7: Image Persistence

### Steps:
1. Upload and save a profile image
2. Close the profile slide-over (click X or backdrop)
3. Refresh the page (F5 or Ctrl+R)
4. Click profile icon again

### Expected Result:
✅ Profile image is still there after page refresh
✅ No need to re-upload
✅ Image loads from localStorage
✅ Works in all three roles (Owner, Driver, Parent)

---

## Test Case 8: Change Uploaded Image

### Steps:
1. Profile already has an image
2. Click the camera button on profile slide-over
3. Image cropper opens
4. Click "Choose Different Image" button
5. Select a different image file

### Expected Result:
✅ Previous image disappears from preview
✅ New image loads in canvas
✅ Zoom and rotation reset to defaults
✅ Can adjust and save new image

---

## Test Case 9: Header Icon Display

### Steps:
1. Upload a profile image
2. Close the profile slide-over
3. Look at the profile icon in header

### Expected Result:
✅ Header shows actual profile image (circular)
✅ Has gold/yellow ring on hover
✅ Matches the image in slide-over
✅ Works across all three header types

---

## Test Case 10: Responsive Design

### Desktop (1920px+):
1. Open profile image feature
2. Modal should be centered
3. All controls should be clearly visible
4. No overflow or layout issues

### Tablet (768px - 1024px):
1. Open profile image feature
2. Modal should fit within viewport
3. Controls should stack properly
4. Buttons should be touch-friendly

### Mobile (320px - 480px):
1. Open profile image feature
2. Modal should use full width with padding
3. Cropper canvas should resize proportionally
4. Sliders should be easy to drag on touch

### Expected Result:
✅ Works on all screen sizes
✅ No content cut off or hidden
✅ Touch interactions work smoothly
✅ Buttons accessible without zooming

---

## Test Case 11: Icon Fallback

### Steps:
1. Don't upload any profile image
2. Check header and slide-over

### Expected Result:
✅ Header shows icon placeholder (User icon)
✅ Icon has background color (#F5C518)
✅ Slide-over shows larger icon placeholder
✅ Gradient background visible
✅ Can still click to upload image

---

## Test Case 12: Multiple Users

### Owner Dashboard:
1. Upload a profile image as owner

### Switch to Driver Dashboard:
2. Driver should not have the owner's image
3. Driver can upload their own image

### Switch to Parent Dashboard:
4. Parent should not have other images
5. Parent can upload their own image

### Expected Result:
✅ Each user has separate image storage
✅ Images don't get mixed up
✅ LocalStorage properly isolates users
✅ Each header shows correct image

---

## Test Case 13: Cancel Upload

### Steps:
1. Click camera button to open cropper
2. Don't select any file, just click Cancel
3. Modal should close without changes
4. Profile image should remain unchanged

### Expected Result:
✅ Modal closes immediately
✅ Previous image (or placeholder) unchanged
✅ No save happens
✅ Can retry upload

---

## Test Case 14: File Type Validation

### Steps:
1. Try uploading a non-image file (PDF, TXT, etc.)
2. Try uploading a valid image (JPG, PNG, GIF)

### Expected Result:
✅ Only image files are accepted
✅ Non-image files are ignored
✅ Multiple formats supported (JPG, PNG, GIF, WebP)

---

## Test Case 15: Image Quality

### Steps:
1. Upload a high-resolution image (4K+)
2. Zoom and rotate to find best crop
3. Save the image

### Expected Result:
✅ No quality loss after saving
✅ Cropped image is crisp (200x200px)
✅ Colors are accurate
✅ Smooth curves without artifacts

---

## Browser Testing

### Chrome/Edge:
- [ ] Upload works
- [ ] Cropping works
- [ ] LocalStorage persists
- [ ] Responsive layout works

### Firefox:
- [ ] Upload works
- [ ] Cropping works
- [ ] LocalStorage persists
- [ ] Responsive layout works

### Safari:
- [ ] Upload works
- [ ] Cropping works
- [ ] LocalStorage persists
- [ ] Responsive layout works

### Mobile Safari (iPhone):
- [ ] Touch upload works
- [ ] Drag positioning works
- [ ] Sliders responsive
- [ ] Modal fits screen

### Chrome Mobile (Android):
- [ ] Touch upload works
- [ ] Drag positioning works
- [ ] Sliders responsive
- [ ] Modal fits screen

---

## Performance Testing

### Image Loading Time:
- First upload: Should be instant
- Subsequent loads: Should be instant (from localStorage)

### Memory Usage:
- Open/close modal: No memory leaks
- Upload multiple images: Memory grows linearly

### Responsiveness:
- Slider drag: Smooth (60fps)
- Canvas preview: Updates in real-time
- Modal animation: No stuttering

---

## Accessibility Testing

### Keyboard Navigation:
- [ ] Tab through buttons
- [ ] Space/Enter to activate buttons
- [ ] Escape to close modal

### Screen Reader:
- [ ] Buttons have proper labels
- [ ] Images have alt text
- [ ] Form fields are labeled

### Color Contrast:
- [ ] All text readable
- [ ] Icons visible against background
- [ ] Hover states clear

---

## Common Issues & Troubleshooting

### Image not saving after refresh
**Cause**: localStorage disabled
**Fix**: Enable localStorage in browser settings

### Image quality degraded
**Cause**: Source image too small
**Fix**: Use higher resolution source images

### Modal won't open
**Cause**: JavaScript error
**Fix**: Check browser console for errors

### Drag not working
**Cause**: Mouse event not firing
**Fix**: Try clicking different area of canvas

### Large file size
**Cause**: No image compression
**Fix**: Compress source image before upload

---

## Regression Testing Checklist

When making changes to the feature:

- [ ] Profile images still display in headers
- [ ] ImageCropper still opens correctly
- [ ] Zoom/rotation controls still work
- [ ] Save button stores image in localStorage
- [ ] Images persist after page refresh
- [ ] Different users have separate images
- [ ] Fallback icon shows when no image
- [ ] All three header types work correctly
- [ ] Mobile responsive still works
- [ ] No console errors

---

## Test Data

### Sample Test Images
Use these descriptions when testing:

1. **Portrait**: A person's headshot
2. **Landscape**: A wide scenery image
3. **Square**: Equal width and height
4. **Small**: Under 200x200px
5. **Large**: Over 4000x4000px
6. **Various Formats**: JPG, PNG, GIF, WebP

### Test User IDs
```
Owner:  'owner-david'
Driver: 'driver-john'
Parent: 'parent-sarah'
```

---

## Performance Benchmarks

### Target Metrics:
- Modal open: < 100ms
- Image load: < 500ms
- Cropper preview: 60fps
- Save image: < 200ms
- localStorage access: < 50ms

### Memory:
- Base app: ~5MB
- With image: +50-100KB
- Multiple images: Linear growth (~50KB each)

---

## Sign-Off

When all tests pass:
- [x] Feature is production-ready
- [x] No known bugs
- [x] All browsers supported
- [x] Performance acceptable
- [x] User experience smooth

---

**Last Updated**: December 30, 2025
**Test Version**: 1.0
**Status**: Ready for QA
