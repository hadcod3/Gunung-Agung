'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Pagination, Modal, ModalContent, ModalBody, Button, ModalHeader } from '@heroui/react';
import { Download, X, RefreshCw } from 'lucide-react';
import ImageBoxSkeleton from './ImageBoxSkeleton';

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

interface ImageGalleryContainerProps {
  category?: string;
  title?: string;
  showTitle?: boolean;
  itemsPerPage?: number;
}

export default function ImageGalleryContainer({ 
  category = 'All', 
  title = 'Galeri',
  showTitle = true,
  itemsPerPage = 20
}: ImageGalleryContainerProps) {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  // Memoized fetch function
  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (category && category !== 'All') {
        queryParams.append('category', category);
      }

      const queryString = queryParams.toString();
      const url = `/api/gallery${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setPhotos(result.data);
      } else {
        throw new Error(result.error || 'Failed to load photos');
      }
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Memoized pagination calculations
  const { totalPages, currentPhotos } = useMemo(() => {
    const totalPages = Math.ceil(photos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPhotos = photos.slice(startIndex, startIndex + itemsPerPage);
    
    return { totalPages, currentPhotos };
  }, [photos, currentPage, itemsPerPage]);

  // Memoized image click handler
  const handleImageClick = useCallback((photo: PhotoData) => {
    setSelectedImage(photo);
    setIsModalOpen(true);
    setImageLoading(true);
    setCurrentImageUrl(getOptimizedImageUrl(photo.imgUrl, 3200, 1800));
  }, []);

  // Memoized modal handlers
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setImageLoading(false);
    setCurrentImageUrl('');
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    console.error('Failed to load image:', currentImageUrl);
  }, [currentImageUrl]);

  // Memoized download handler
  const handleDownload = useCallback(async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage.imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const filename = selectedImage.imgUrl.split('/').pop() || `photo-${selectedImage._id}.jpg`;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image');
    }
  }, [selectedImage]);

  // Memoized image URL generator
  const getOptimizedImageUrl = useCallback((url: string, width: number = 800, quality: number = 80) => {
    if (url.includes('ik.imagekit.io')) {
        return `${url}?tr=w-${width},q-${quality}`;
    }
    return url;
  }, []);

  // Memoized refresh function
  const handleRefresh = useCallback(() => {
    fetchPhotos();
    setCurrentPage(1);
  }, [fetchPhotos]);

  // Memoized image component generator
  const renderImage = useCallback((photo: PhotoData) => {
    const thumbnailUrl = getOptimizedImageUrl(photo.imgUrl, 320, 90);
    const blurUrl = getOptimizedImageUrl(photo.imgUrl, 32, 9);

    if (photo.orientation === "vertical") {
      return (
        <div className='relative flex-center w-full h-full'>
          <Image
            src={blurUrl}
            alt={`Photo from ${photo.category}`}
            width={320}
            height={90}
            className="flex-center text-center object-cover text-[2px] blur-xs grayscale w-full h-full"
            loading="lazy"
          />
          <div className='w-[120px] h-[320px] bg-accent/30 absolute'/>
          <Image
            src={thumbnailUrl}
            alt={`Photo from ${photo.category}`}
            width={120}
            height={90}
            className="flex-center text-center object-cover text-[2px] absolute z-10 grayscale"
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <Image
        src={thumbnailUrl}
        alt={`Photo from ${photo.category}`}
        width={320}
        height={90}
        className="flex-center text-center object-cover text-[2px] grayscale w-full h-full"
        loading="lazy"
      />
    );
  }, [getOptimizedImageUrl]);

  // Render skeleton grid for loading state
  const renderSkeletonGrid = useCallback(() => {
    return (
      <div className='relative flex-center flex-wrap gap-3 p-4'>
        {Array.from({ length: itemsPerPage }, (_, index) => (
          <ImageBoxSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }, [itemsPerPage]);

  // Loading state
  if (loading) {
    return (
      <div className='py-10 flex-center flex-col'>
        {showTitle && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-medium text-secondary">{title}</h1>
          </div>
        )}
        {renderSkeletonGrid()}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='py-10 flex-center flex-col'>
        {showTitle && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-medium text-secondary">{title}</h1>
          </div>
        )}
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-primary text-accent rounded hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='py-10 px-4 flex-center flex-col'>
      {showTitle && (
        <div className="mb-6 text-center">
          <h1 className="text-xl md:text-2xl font-medium text-secondary">
            {title}
          </h1>
          {category && category !== 'All' && (
            <p className="text-sm text-accent/60 mt-1">
              {photos.length >= 1 && `${photos.length} photo${photos.length !== 1 ? 's' : ''} found`}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
          )}
        </div>
      )}

      {photos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-accent/60 text-lg">
            {category && category !== 'All' 
              ? `No photos found in "${category}" category.` 
              : 'No photos uploaded yet.'
            }
          </p>
        </div>
      ) : (
        <>
          {/* Image Grid */}
          <div className='relative flex-center flex-wrap gap-3 p-4'>
            {currentPhotos.map((photo) => (
              <div 
                key={photo._id}
                className="relative aspect-video w-[23%] min-w-80 bg-zinc-950 flex-center overflow-hidden group cursor-pointer"
                onClick={() => handleImageClick(photo)}
              >
                {renderImage(photo)}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex-center">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                color="secondary"
                showControls
                showShadow
                classNames={{
                  cursor: "bg-secondary text-accent",
                  item: "text-gray-600 hover:text-primary",
                  prev: "text-gray-600 hover:text-primary",
                  next: "text-gray-600 hover:text-primary",
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Image Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        size="4xl"
        backdrop="blur"
        classNames={{
          base: "bg-transparent rounded-none",
          wrapper: "z-[100]",
          closeButton: "hidden"
        }}
      >
        <ModalContent className='bg-accent/10 backdrop-blur-sm'>
          <ModalBody className="p-2">
            {selectedImage && (
              <div className="relative">
                <div className="flex-center relative min-h-[400px]">
                  <div className="absolute inset-0 -z-10 max-h-[70vh] w-auto object-contain"/>
                  
                  {/* Loading skeleton */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-accent">
                      <div className="w-32 h-32 rounded-full flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
                      </div>
                    </div>
                  )}
                  
                  <Image
                    src={currentImageUrl}
                    alt={`Photo from ${selectedImage.category}`}
                    width={3200}
                    height={1800}
                    className={`${
                      selectedImage.orientation === "vertical" ? "max-h-[60vh]" : "max-h-[70vh]"
                    } w-auto object-contain transition-opacity duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    // priority
                    loading="lazy"
                    unoptimized={true}
                  />
                </div>

                <div className="p-2 pb-0 flex-center">
                  <div className="flex-center gap-2 w-full max-w-md">
                    <Button
                      onClick={handleModalClose}
                      className="w-32 bg-secondary hover:bg-secondary/90 transition-colors text-accent rounded-none"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={handleDownload}
                      startContent={<Download className="w-4 h-4" />}
                      className="w-32 text-primary bg-accent hover:bg-accent/90 transition-colors rounded-none"
                      disabled={imageLoading}
                    >
                      {imageLoading ? 'Loading...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}