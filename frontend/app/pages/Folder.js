"use client";
import { useState } from 'react';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [path, setPath] = useState([]);

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    if (!files.length) return;

    if (type === 'folder') {
      // Create a map to group files by folders
      const folderMap = {};

      Array.from(files).forEach(file => {
        const pathParts = file.webkitRelativePath.split('/');
        const folderName = pathParts[0];
        if (!folderMap[folderName]) {
          folderMap[folderName] = {
            name: `Folder: ${folderName}`,
            type: 'folder',
            items: []
          };
        }
        folderMap[folderName].items.push({
          name: file.name,
          type: 'file',
          info: `File Name : ${file.name}\ Size : ${file.size} bytes`,
        });
      });

      const newFolders = Object.values(folderMap);
      setItems(prevItems => [...prevItems, ...newFolders]);
      setSelectedItem(newFolders[0]);  // Select the first newly added folder
    } else {
      const newItems = Array.from(files).map(file => ({
        name: file.name,
        type: 'file',
        info: `File Name : ${file.name}\ Size : ${file.size} bytes`,
      }));

      setItems(prevItems => [...prevItems, ...newItems]);
      setSelectedItem(newItems[0]); // Select the first newly added file
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setPath(prevPath => [...prevPath, selectedItem]);
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
    }
  };

  const handleBack = () => {
    const newPath = [...path];
    const prevItem = newPath.pop();
    setPath(newPath);
    setSelectedItem(prevItem);
  };

  return (
    <div className="flex p-12 min-h-60">
      <div className="w-3/4 bg-gray-100 p-4">
        {path.length > 0 && (
          <button onClick={handleBack} className="mb-4 p-2 bg-blue-500 text-white rounded">Back</button>
        )}
        <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {(selectedItem && selectedItem.type === 'folder' ? selectedItem.items : items).map((item, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${
                selectedItem === item ? 'bg-blue-500 text-white' : 'text-black'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input type="file" onChange={(e) => handleFileChange(e, 'file')} className="file-input mt-4" multiple />
        <input type="file" onChange={(e) => handleFileChange(e, 'folder')} className="folder-input mt-4" webkitdirectory="true" mozdirectory="true" multiple />
      </div>

      <div className="w-3/4 bg-black p-4 text-white">
        {selectedItem ? (
          <>
            <div className="mb-4 font-bold text-xl">{selectedItem.name}</div>
            <div>{selectedItem.info || 'Folder contents listed above'}</div>
          </>
        ) : (
          <div className="mb-4 font-bold text-xl">Select or upload a file/folder</div>
        )}
      </div>
    </div>
  );
}
