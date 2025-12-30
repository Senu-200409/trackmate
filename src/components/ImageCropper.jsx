import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

function ImageCropper({ isOpen, onClose, onSave, title = "Upload Profile Picture" }) {
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setZoom(1);
        setRotation(0);
        setCroppedArea({ x: 0, y: 0, width: 200, height: 200 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setCroppedArea(prev => ({
      ...prev,
      x: Math.max(-prev.width / 2, Math.min(prev.width / 2, prev.x + deltaX)),
      y: Math.max(-prev.height / 2, Math.min(prev.height / 2, prev.y + deltaY))
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      drawPreview();
    }
  }, [image, croppedArea, zoom, rotation]);

  const drawPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      const canvasSize = 250;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw semi-transparent background
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Save context state
      ctx.save();

      // Move to center and rotate
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Draw scaled image
      const imgWidth = img.width * zoom;
      const imgHeight = img.height * zoom;
      ctx.drawImage(
        img,
        -imgWidth / 2 + croppedArea.x,
        -imgHeight / 2 + croppedArea.y,
        imgWidth,
        imgHeight
      );

      ctx.restore();

      // Draw crop guide (circle)
      ctx.strokeStyle = '#F5C518';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(canvasSize / 2, canvasSize / 2, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Draw corner handles
      const handles = [
        { x: canvasSize / 2 - 100, y: canvasSize / 2 - 100 },
        { x: canvasSize / 2 + 100, y: canvasSize / 2 - 100 },
        { x: canvasSize / 2 - 100, y: canvasSize / 2 + 100 },
        { x: canvasSize / 2 + 100, y: canvasSize / 2 + 100 },
      ];

      ctx.fillStyle = '#F5C518';
      handles.forEach(handle => {
        ctx.fillRect(handle.x - 5, handle.y - 5, 10, 10);
      });
    };
    img.src = image;
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      const cropCanvas = document.createElement('canvas');
      const size = 200;
      cropCanvas.width = size;
      cropCanvas.height = size;
      const ctx = cropCanvas.getContext('2d');

      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Draw the cropped image
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      const imgWidth = img.width * zoom;
      const imgHeight = img.height * zoom;
      ctx.drawImage(
        img,
        -imgWidth / 2 + croppedArea.x,
        -imgHeight / 2 + croppedArea.y,
        imgWidth,
        imgHeight
      );

      ctx.restore();

      const croppedImage = cropCanvas.toDataURL('image/png');
      onSave(croppedImage);
      handleClose();
    };
    img.src = image;
  };

  const handleClose = () => {
    setImage(null);
    setZoom(1);
    setRotation(0);
    setCroppedArea({ x: 0, y: 0, width: 200, height: 200 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {!image ? (
              <div className="flex flex-col items-center justify-center py-12">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#1E3A5F] hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Click to upload image</div>
                    <div className="text-sm text-gray-600">or drag and drop</div>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Canvas with preview */}
                <div
                  ref={containerRef}
                  className="flex justify-center bg-gray-100 p-4 rounded-lg"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <canvas
                    ref={canvasRef}
                    className="rounded-lg border-2 border-gray-200"
                  />
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  {/* Zoom Control */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-900">Zoom</label>
                      <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ZoomOut className="w-4 h-4 text-gray-600" />
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Rotation Control */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-900">Rotation</label>
                      <span className="text-sm text-gray-600">{rotation}°</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="15"
                        value={rotation}
                        onChange={(e) => setRotation(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <button
                        onClick={() => setRotation(0)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Reset rotation"
                      >
                        <RotateCw className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Upload New Image Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Choose Different Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            {image && (
              <button
                onClick={handleCrop}
                className="px-4 py-2 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors font-medium"
              >
                Save Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
