import axios from "axios";
import { useState, useEffect } from "react";

const PlanetScaleStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch('https://www.planetscalestatus.com/api/v2/incidents/unresolved.json');
        const json = await response.json();
        setStatus(json);
        console.log("status", json);

      } catch (error) {
        setStatus("unknown");
      }
    };

    getStatus();
  }, []);

  return (
    <div>
      {status === 200 ? (
        <span style={{ color: "green" }}>PlanetScale is operational</span>
      ) : (
        <span style={{ color: "red" }}>PlanetScale is {status?.name}</span>
      )}
    </div>
  );
};

export default PlanetScaleStatus;
