'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FileImage, FolderArchive, ChevronDown, Upload, Trash2, Plus, Server, X, Ratio } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';

interface PhotoData {
  _id: string;
  imgUrl: string;
  category: string;
  serverId: string;
  serverName: string;
  orientation: 'horizontal' | 'vertical';
  createdAt: string;
  updatedAt: string;
}

interface UploadingPhoto {
  _id: string;
  file: File;
  preview: string;
  category: string;
  serverName: string;
  orientation: 'horizontal' | 'vertical';
  uploading: boolean;
  progress: number;
}

interface ServerData {
  _id: string;
  name: string;
  createdAt: string;
}

interface CategoryData {
  _id: string;
  name: string;
  createdAt: string;
}

type Orientation = 'horizontal' | 'vertical';

export default function PhotoGallerySection() {
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [uploadingPhotos, setUploadingPhotos] = useState<UploadingPhoto[]>([]);
    const [servers, setServers] = useState<ServerData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [newServer, setNewServer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedServer, setSelectedServer] = useState('');
    const [selectedOrientation, setSelectedOrientation] = useState<Orientation>('horizontal');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    const [isOrientationDropdownOpen, setIsOrientationDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadStartedRef = useRef(false); 
    const processingPhotosRef = useRef<Set<string>>(new Set()); 
    const selectedOrientationRef = useRef(selectedOrientation);
    const selectedServerRef = useRef(selectedServer);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsCategoryDropdownOpen(false);
        setIsServerDropdownOpen(false);
        setIsOrientationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    useEffect(() => {
        selectedOrientationRef.current = selectedOrientation;
    }, [selectedOrientation]);

    useEffect(() => {
        selectedServerRef.current = selectedServer;
    }, [selectedServer]);

  // Close other dropdowns when one opens
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (!isCategoryDropdownOpen) {
      setIsServerDropdownOpen(false);
      setIsOrientationDropdownOpen(false);
    }
  };

  const toggleServerDropdown = () => {
    setIsServerDropdownOpen(!isServerDropdownOpen);
    if (!isServerDropdownOpen) {
      setIsCategoryDropdownOpen(false);
      setIsOrientationDropdownOpen(false);
    }
  };

  const toggleOrientationDropdown = () => {
    setIsOrientationDropdownOpen(!isOrientationDropdownOpen);
    if (!isOrientationDropdownOpen) {
      setIsCategoryDropdownOpen(false);
      setIsServerDropdownOpen(false);
    }
  };

    const handleUploadComplete = useCallback((data: any[]) => {
    console.log('Upload completed - data received:', data);
    console.log('📱 Current selected orientation from ref:', selectedOrientationRef.current);
    
    if (data && data.length > 0) {
        setUploadingPhotos(currentUploadingPhotos => {
        if (currentUploadingPhotos.length === 0) {
            console.warn('No uploading photos found to process');
            return [];
        }
        
        console.log(`Processing ${data.length} files against ${currentUploadingPhotos.length} uploading photos`);
        
        data.forEach((file, index) => {
            const uploadingPhoto = currentUploadingPhotos[index];
            if (uploadingPhoto && !processingPhotosRef.current.has(uploadingPhoto._id)) {
            processingPhotosRef.current.add(uploadingPhoto._id);
            
            const imageUrl = file.ufsUrl || file.url;
            
            console.log(`📸 Saving ${uploadingPhoto.file.name} with orientation: ${uploadingPhoto.orientation}`);
            
            savePhotoToDatabase({
                imgUrl: imageUrl,
                category: uploadingPhoto.category,
                serverId: selectedServerRef.current,
                serverName: uploadingPhoto.serverName,
                orientation: uploadingPhoto.orientation,
            });
            
            URL.revokeObjectURL(uploadingPhoto.preview);
            }
        });

        console.log('✅ Upload processing complete');
        alert(`Successfully uploaded ${data.length} image(s)!`);
        
        setTimeout(() => {
            processingPhotosRef.current.clear();
        }, 5000);
        
        return [];
        });
    }
    }, []);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: handleUploadComplete,
    onUploadError: (error) => {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      setUploadingPhotos([]);
      uploadStartedRef.current = false;
      processingPhotosRef.current.clear();
    },
  });

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchPhotos();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedServer) {
      fetchPhotos();
    }
  }, [selectedServer]);

  const initializeData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchPhotos(), fetchServers(), fetchCategories()]);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'All') {
        queryParams.append('category', selectedCategory);
      }
      if (selectedServer) {
        queryParams.append('serverId', selectedServer);
      }

      const queryString = queryParams.toString();
      const url = `/api/gallery${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setPhotos(result.data);
      } else {
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/server');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setServers(result.data);
        if (result.data.length > 0 && !selectedServer) {
          setSelectedServer(result.data[0]._id);
        }
      } else {
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      } else {
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fix: Add duplicate prevention in savePhotoToDatabase
  const savePhotoToDatabase = async (photoData: {
    imgUrl: string;
    category: string;
    serverId: string;
    serverName: string;
    orientation: 'horizontal' | 'vertical';
  }) => {
    try {
      console.log('🔄 Attempting to save photo to database:', photoData);
      
      // Check if this photo was already processed
      const photoKey = `${photoData.imgUrl}-${photoData.serverId}`;
      if (processingPhotosRef.current.has(photoKey)) {
        console.log('⏭️ Photo already being processed, skipping:', photoKey);
        return;
      }
      
      processingPhotosRef.current.add(photoKey);
      
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoData),
      });

      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response error:', errorText);
        processingPhotosRef.current.delete(photoKey);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📊 API Response data:', result);
      
      if (result.success) {
        console.log('✅ Photo saved successfully:', result.data);
        setPhotos(prev => [result.data, ...prev]);
      } else {
        console.error('❌ Failed to save photo:', result.error);
      }
      
      // Remove from processing set after successful save
      processingPhotosRef.current.delete(photoKey);
      
    } catch (error) {
      console.error('💥 Failed to save photo to database:', error);
      // Ensure we remove from processing set on error too
      const photoKey = `${photoData.imgUrl}-${photoData.serverId}`;
      processingPhotosRef.current.delete(photoKey);
    }
  };

  const handleAddServer = async () => {
    if (!newServer.trim()) {
      alert('Please enter a server name');
      return;
    }

    try {
      const response = await fetch('/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newServer.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setServers(prev => [result.data, ...prev]);
        setSelectedServer(result.data._id);
        setNewServer('');
        setIsServerDropdownOpen(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to add server:', error);
      alert('Failed to add server');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setCategories(prev => [result.data, ...prev]);
        setNewCategory('');
        setIsCategoryDropdownOpen(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
      alert('Failed to add category');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedServer || uploadStartedRef.current) {
        if (!selectedServer) {
        alert('Please select or create a server first');
        }
        return;
    }

    // Prevent double execution
    if (uploadStartedRef.current) return;
    uploadStartedRef.current = true;

    const MAX_FILES = 50; // Increased to 50
    const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB in bytes

    if (files.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} files at once`);
        uploadStartedRef.current = false;
        return;
    }

    const validFiles = Array.from(files).filter(file => {
        // Check if it's an image file
        if (!file.type.startsWith('image/')) {
        return false;
        }
        
        // Check file size (32MB limit)
        if (file.size > MAX_FILE_SIZE) {
        console.warn(`File "${file.name}" is too large: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        return false;
        }
        
        return true;
    });

    // Check if any files were too large
    const oversizedFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') && file.size > MAX_FILE_SIZE
    );

    if (validFiles.length === 0) {
        if (files.length > 0 && oversizedFiles.length > 0) {
        alert(`Please select image files under 32MB. ${oversizedFiles.length} file(s) were too large.`);
        } else {
        alert('Please select valid image files (JPEG, PNG, etc.)');
        }
        uploadStartedRef.current = false;
        return;
    }

    if (validFiles.length !== files.length) {
        const skippedCount = files.length - validFiles.length;
        const sizeMessage = oversizedFiles.length > 0 ? ` (${oversizedFiles.length} files exceeded 32MB limit)` : '';
        alert(`${validFiles.length} file(s) selected. ${skippedCount} file(s) were skipped${sizeMessage}.`);
    }

    // Get current server and category data
    const currentServer = servers.find(s => s._id === selectedServer);
    const currentCategory = selectedCategory === 'All' ? 'Uncategorized' : selectedCategory;

    const newUploadingPhotos: UploadingPhoto[] = validFiles.map(file => ({
        _id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        category: currentCategory,
        serverName: currentServer?.name || 'Unknown Server',
        orientation: selectedOrientation,
        uploading: true,
        progress: 0,
    }));

    console.log('Uploading photos with data:', {
        category: currentCategory,
        serverId: selectedServer,
        serverName: currentServer?.name,
        orientation: selectedOrientation,
        fileCount: validFiles.length,
        totalSize: (validFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2) + 'MB'
    });

    setUploadingPhotos(prev => [...prev, ...newUploadingPhotos]);
    
    // Start upload with all valid files
    startUpload(validFiles);
    
    // Reset the ref after a short delay
    setTimeout(() => {
        uploadStartedRef.current = false;
    }, 1000);
    
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    };

  const handleRemoveUploadingPhoto = (id: string) => {
    const photoToRemove = uploadingPhotos.find(p => p._id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    setUploadingPhotos(prev => prev.filter(photo => photo._id !== id));
  };

  const handleRemovePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setPhotos(prev => prev.filter(photo => photo._id !== id));
      } else {
        alert('Failed to delete photo: ' + result.error);
      }
    } catch (error) {
      console.error('Failed to delete photo:', error);
      alert('Failed to delete photo');
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleServerChange = (serverId: string) => {
    setSelectedServer(serverId);
    setIsServerDropdownOpen(false);
  };

  const handleOrientationChange = (orientation: Orientation) => {
    setSelectedOrientation(orientation);
    setIsOrientationDropdownOpen(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const allDisplayCategories = [{ _id: 'All', name: 'All' }, ...categories];
  const allPhotos = [...uploadingPhotos, ...filteredPhotos];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50" />
        
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="font-extrabold text-4xl sm:text-5xl uppercase leading-tight text-primary mb-2">
                Photo Gallery
              </h1>
              <p className="text-lg text-gray-600">
                Upload and organize your photos by categories, servers, and orientation
              </p>
            </div>
            
            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
              {/* Server Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={toggleServerDropdown}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 min-w-[160px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    <span className="truncate">
                      {servers.find(s => s._id === selectedServer)?.name || 'Select Server'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServerDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServerDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {servers.map(server => (
                      <button
                        key={server._id}
                        onClick={() => handleServerChange(server._id)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedServer === server._id 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'text-gray-700'
                        }`}
                      >
                        {server.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={toggleCategoryDropdown}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 min-w-[160px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FolderArchive className="w-4 h-4" />
                    <span className="truncate">{selectedCategory}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {allDisplayCategories.map(category => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category.name)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedCategory === category.name 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'text-gray-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Orientation Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={toggleOrientationDropdown}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 min-w-[160px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Ratio className="w-4 h-4" />
                    <span className="truncate capitalize">{selectedOrientation}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOrientationDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOrientationDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                    {(['horizontal', 'vertical'] as Orientation[]).map(orientation => (
                      <button
                        key={orientation}
                        onClick={() => handleOrientationChange(orientation)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors capitalize ${
                          selectedOrientation === orientation 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'text-gray-700'
                        }`}
                      >
                        {orientation}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Add Server */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Server
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newServer}
                    onChange={(e) => setNewServer(e.target.value)}
                    placeholder="Server name"
                    className="flex-1 text-primary border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddServer()}
                  />
                  <button
                    onClick={handleAddServer}
                    disabled={!newServer.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Category
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Category name"
                    className="flex-1 text-primary border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategory.trim()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Orientation Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Orientation
                </label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <Ratio className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {selectedOrientation}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {selectedOrientation === 'horizontal' ? 'Landscape' : 'Portrait'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Selected orientation for uploads
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={!selectedServer || isUploading}
                />
                <button
                  onClick={triggerFileInput}
                  disabled={!selectedServer || isUploading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-5 h-5 animate-pulse" />
                      Uploading {uploadingPhotos.length} file(s)...
                    </>
                  ) : (
                    <>
                      <FileImage className="w-5 h-5" />
                      Select Multiple Photos
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {!selectedServer 
                    ? 'Select or create a server first' 
                    : `Selected: ${selectedOrientation} orientation`
                  }
                </p>
                
                {/* Uploading files list */}
                {uploadingPhotos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-600 font-medium">Uploading:</p>
                    {uploadingPhotos.map(photo => (
                      <div key={photo._id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <span className="truncate block">{photo.file.name}</span>
                          <span className="text-gray-500 text-xs capitalize">({photo.orientation})</span>
                        </div>
                        <button
                          onClick={() => handleRemoveUploadingPhoto(photo._id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          disabled={photo.uploading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                {selectedCategory} Photos ({filteredPhotos.length})
                {uploadingPhotos.length > 0 && ` (Uploading: ${uploadingPhotos.length})`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Ratio className="w-4 h-4" />
                <span>Orientation: {selectedOrientation}</span>
              </div>
            </div>

            {allPhotos.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {photos.length === 0 ? 'No photos uploaded yet.' : 'No photos in this category.'}
                </p>
                <button
                  onClick={triggerFileInput}
                  disabled={!selectedServer}
                  className="mt-4 text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload some photos to get started
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {allPhotos.map(photo => (
                  <div
                    key={photo._id}
                    className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square relative">
                      {'preview' in photo ? (
                        // Uploading photo
                        <>
                          <Image
                            src={photo.preview}
                            alt="Uploading photo"
                            // fill
                            width={100}
                            height={100}
                            className="object-cover opacity-60"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-white text-center p-4">
                              <Upload className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                              <p className="text-sm font-medium mb-1">Uploading...</p>
                              <div className="w-24 h-1 bg-gray-600 rounded-full overflow-hidden mx-auto">
                                <div 
                                  className="h-full bg-white transition-all duration-300"
                                  style={{ width: `${photo.progress}%` }}
                                />
                              </div>
                              <p className="text-xs mt-1">{Math.round(photo.progress)}%</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        // Uploaded photo from database
                        <>
                          <Image
                            src={photo.imgUrl}
                            alt="Uploaded photo"
                            // fill
                            width={100}
                            height={100}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <button
                            onClick={() => handleRemovePhoto(photo._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          
                          {/* Orientation badge */}
                          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs capitalize">
                            {photo.orientation}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex flex-wrap gap-1 mb-1">
                        <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                          {photo.serverName}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {'preview' in photo ? photo.category : photo.category}
                        </span>
                        <span className={`inline-block text-xs px-2 py-1 rounded capitalize ${
                          ('preview' in photo ? photo.orientation : photo.orientation) === 'horizontal' 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {'preview' in photo ? photo.orientation : photo.orientation}
                        </span>
                      </div>
                      {'preview' in photo ? null : (
                        <p className="text-xs text-gray-400">
                          {new Date(photo.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}