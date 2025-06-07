"use client";

import React, { useState, useRef } from 'react';
import { X, Upload, Video, Image as ImageIcon, Type } from 'lucide-react';
import { useCreatePostMutation } from '@/redux/features/api/postApi';
import { useAppSelector } from '@/redux/hooks';
// import AuthGuard from '../Auth/AuthGuard';
import toast from 'react-hot-toast';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [createPost, { isLoading: createPostLoading }] = useCreatePostMutation();
  const user = useAppSelector((state) => state.auth.user);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Set post type based on file type
      if (file.type.startsWith('image/')) {
        setPostType('image');
      } else if (file.type.startsWith('video/')) {
        setPostType('video');
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to create posts!');
      return;
    }

    if (!postContent.trim() && !selectedFile) {
      toast.error('Please add some content or select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', postContent);
      formData.append('userId', user.id);
      formData.append('type', postType);
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      await createPost(formData).unwrap();
      toast.success('Post created successfully!');
      
      // Reset form
      setPostContent('');
      setSelectedFile(null);
      setPreview(null);
      setPostType('text');
      onClose();
    } catch (error) {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    // <AuthGuard>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1a1a] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-cyan-400/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Create Post</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {!user && (
            <div className="p-4 bg-yellow-900/20 border-b border-yellow-600/30">
              <p className="text-yellow-300 text-sm">
                🔐 Please sign in to create and share posts with the community!
              </p>
            </div>
          )}

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Post Type Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setPostType('text')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  postType === 'text' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Type size={16} />
                Text
              </button>
              <button
                onClick={() => setPostType('image')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  postType === 'image' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ImageIcon size={16} />
                Image
              </button>
              <button
                onClick={() => setPostType('video')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  postType === 'video' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Video size={16} />
                Video
              </button>
            </div>

            {/* Text Content */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={user ? "What's on your mind about crypto?" : "Sign in to share your thoughts..."}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              rows={4}
              disabled={!user}
            />

            {/* File Upload */}
            {(postType === 'image' || postType === 'video') && (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept={postType === 'image' ? 'image/*' : 'video/*'}
                  className="hidden"
                  disabled={!user}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  disabled={!user}
                >
                  <Upload size={16} />
                  Upload {postType}
                </button>
                
                {preview && (
                  <div className="relative">
                    {postType === 'image' ? (
                      <img src={preview} alt="Preview" className="max-h-40 rounded-lg" />
                    ) : (
                      <video src={preview} controls className="max-h-40 rounded-lg" />
                    )}
                    <button
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={createPostLoading || !user || (!postContent.trim() && !selectedFile)}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {createPostLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    // </AuthGuard>
  );
};

export default PostModal;
