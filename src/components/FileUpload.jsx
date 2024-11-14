import React, { useEffect, useRef, useState } from "react";
import DraggableTable from "./DataTable";
import { getFiles, uploadFile } from "../Service/services";
import { ProgressSpinner } from "primereact/progressspinner";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filesData, setFilesData] = useState([]);
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef(null);
  // Handle file upload
  const handleFileUpload = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };
  // Handle API call
  const handleApiCall = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadFile(formData);
    if (response.data) {
      const resp = await getFiles();
      const tableData = resp.data.map((info) => {
        return {
          id: info._id,
          filename: info.filename,
          fileUrl: info.fileUrl,
          fileType: info.fileType,
          priority: info.priority,
        };
      });
      setFilesData(tableData);
      fileInputRef.current.value = "";
      setFile(null);
    }
    setLoader(false);
  };

  const fetchFiles = async () => {
    setLoader(true);
    const resp = await getFiles();
    const tableData = resp.data.map((info) => {
      return {
        id: info._id,
        filename: info.filename,
        fileUrl: info.fileUrl,
        fileType: info.fileType,
        priority: info.priority,
      };
    });
    setFilesData(tableData);
    setLoader(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>
      {loader && (
        <div
          style={{ position: "fixed", top: "50%", left: "50%", zIndex: 2 }}
          className="spinner-container"
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileUpload}
        className="file-input"
        ref={fileInputRef}
      />
      <button
        style={{ opacity: !file || loader ? 0.3 : 1 }}
        disabled={!file || loader}
        onClick={handleApiCall}
      >
        Submit File
      </button>
      <DraggableTable
        data={filesData}
        setLoader={setLoader}
        setFilesData={setFilesData}
      />
    </div>
  );
};
export default FileUpload;
