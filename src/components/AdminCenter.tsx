import React, { useState } from 'react';
import { Upload, Database, Save, RefreshCw } from 'lucide-react';

const AdminCenter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [modelEndpoint, setModelEndpoint] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [apiStatus, setApiStatus] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    // Simulating file upload
    setUploadStatus('Uploading...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadStatus('File uploaded successfully!');
    setFile(null);
  };

  const handleApiSave = async () => {
    if (!apiKey || !modelEndpoint) {
      setApiStatus('Please provide both API Key and Model Endpoint.');
      return;
    }

    // Simulating API configuration save
    setApiStatus('Saving API configuration...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setApiStatus('API configuration saved successfully!');
  };

  const handleRefreshKnowledgeBase = async () => {
    // Simulating knowledge base refresh
    setApiStatus('Refreshing knowledge base...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setApiStatus('Knowledge base refreshed successfully!');
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Admin Center</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upload Learning Materials</h3>
        <div className="flex items-center mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.txt"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center"
          >
            <Upload className="mr-2" size={18} />
            Choose File
          </label>
          <span className="ml-4 text-gray-600 dark:text-gray-400">
            {file ? file.name : 'No file chosen'}
          </span>
        </div>
        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Save className="mr-2" size={18} />
          Upload File
        </button>
        {uploadStatus && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{uploadStatus}</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">LLM API Configuration</h3>
        <div className="mb-4">
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="password"
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            placeholder="Enter API Key"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model-endpoint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model Endpoint
          </label>
          <input
            type="text"
            id="model-endpoint"
            value={modelEndpoint}
            onChange={(e) => setModelEndpoint(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            placeholder="Enter Model Endpoint"
          />
        </div>
        <button
          onClick={handleApiSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Database className="mr-2" size={18} />
          Save API Configuration
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Knowledge Base Management</h3>
        <button
          onClick={handleRefreshKnowledgeBase}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <RefreshCw className="mr-2" size={18} />
          Refresh Knowledge Base
        </button>
      </div>

      {apiStatus && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{apiStatus}</p>
      )}
    </div>
  );
};

export default AdminCenter;