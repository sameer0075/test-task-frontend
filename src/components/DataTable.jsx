import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/saga-blue/theme.css"; // Use a theme if not already imported
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { changePriority, getFiles } from "../Service/services";
import { useNavigate } from "react-router-dom";

const DraggableTable = (props) => {
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onRowReorder = async (e) => {
    props.setLoader(true);
    let priority1 = e.value[0].priority;
    let priority2 = e.value[1].priority;
    setData(e.value); // Update the data array after reordering
    const updatedData = [
      {
        _id: e.value[0].id,
        priority: priority2,
      },
      {
        _id: e.value[1].id,
        priority: priority1,
      },
    ];
    await changePriority(updatedData);
    const resp = await getFiles();
    props.setFilesData(resp.data);
    props.setLoader(false);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "url copied to clipboard",
    });
  };

  const navigateToDetail = (rowData) => {
    return (
      <div
        className="copy-icon-container"
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <i
          className="pi pi-eye"
          onClick={() => navigate(`/details/${rowData.id}`)}
          style={{ fontSize: "1.2rem", color: "#4b1b97" }}
          title="Copy URL"
        ></i>
      </div>
    );
  };

  const fileUrlTemplate = (rowData) => {
    const filter = props.data.filter((info) => info.id === rowData.id);
    return (
      <div
        className="copy-icon-container"
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <i
          className="pi pi-copy"
          onClick={() => copyToClipboard(rowData.fileUrl)}
          style={{ fontSize: "1.2rem", color: "#4b1b97" }}
          title="Copy URL"
        ></i>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Toast ref={toast} />
      <DataTable
        value={data}
        reorderableRows
        onRowReorder={onRowReorder}
        responsiveLayout="scroll"
        scrollable
        className="p-datatable-custom"
      >
        <Column rowReorder style={{ width: "4em" }} />{" "}
        {/* Enable row reorder on the first column */}
        <Column
          style={{ width: "6em", padding: "8px" }}
          field="id"
          header="Id"
        />
        <Column
          style={{ width: "12em", padding: "8px" }}
          field="filename"
          header="Name"
        />
        <Column
          style={{ width: "15em", padding: "8px" }}
          body={fileUrlTemplate}
          header="Url"
        />
        <Column
          style={{ width: "8em", padding: "8px" }}
          field="fileType"
          header="Type"
        />
        <Column
          style={{ width: "8em", padding: "8px" }}
          field="priority"
          header="Priority"
        />
        <Column
          style={{ width: "8em", padding: "8px" }}
          body={navigateToDetail}
          header="View"
        />
      </DataTable>
    </div>
  );
};

export default DraggableTable;
