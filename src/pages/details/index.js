import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail, getView } from "../../Service/services";
import Chart from "../../components/Chart"; // Import ViewsPieChart component
import "./index.css";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [viewsData, setViewsData] = useState([]);
  const [copied, setCopied] = useState(false);

  const fetchDetails = async () => {
    await getView(id);
    const detailResponse = await getDetail(id);
    if (detailResponse.data) {
      setDetails(detailResponse.data);
      setViewsData([
        { category: "Views", views: detailResponse.data.totalViews },
      ]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(details.fileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="details-container">
        <div className="banner">
          <img src={details?.fileUrl} alt="Banner" className="banner-image" />
          <button
            className="copy-url-button"
            onClick={handleCopy}
            style={{ backgroundColor: copied ? "#461694FF" : "#4b1b97" }}
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>

        <div className="details-card">
          <div className="details-info">
            <h2>{details?.filename}</h2>
            <p>
              <strong>Type:</strong> {details?.fileType}
            </p>
          </div>

          {/* Add the pie chart for views data */}
          <div className="views-chart">
            <h3>Views Breakdown</h3>
            <Chart data={viewsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
