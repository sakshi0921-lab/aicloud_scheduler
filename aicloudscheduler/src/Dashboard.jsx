import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const [suspiciousActivity, setSuspiciousActivity] = useState(false); 

  useEffect(() => {
    const fetchData = () => {
      const mockData = {
        memory: 65,
        cpu: { gsu1: 40, gsu2: 50, gsu3: 60 },
        network: 70,
        costOverview: 45,
        scalingMethods: 85,
        costSuggestion: 55,
        cpuVsNetwork: 75,
        reports: { report1: 80, report2: 90, report3: 95 },
      };
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchData();

    let clickCount = 0;
    let keyPressCount = 0;
    const suspiciousThreshold = 5; 
    const detectSuspiciousBehavior = () => {
      if (clickCount >= suspiciousThreshold || keyPressCount >= suspiciousThreshold) {
        setSuspiciousActivity(true);
        setPopupMessage('Suspicious activity detected! Monitoring...');
        setTimeout(() => {
          setPopupMessage(null);
        }, 3000);
      }
    };

    const handleUserClick = () => {
      clickCount++;
      detectSuspiciousBehavior();
    };

    const handleUserKeyPress = () => {
      keyPressCount++;
      detectSuspiciousBehavior();
    };

    window.addEventListener('click', handleUserClick);
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('click', handleUserClick);
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, []);

  useEffect(() => {
    if (suspiciousActivity) {
      console.log('Reporting suspicious activity to backend...');
      setTimeout(() => {
        setSuspiciousActivity(false);
        setPopupMessage('Suspicious activity resolved.');
      }, 5000);
    }
  }, [suspiciousActivity]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div className="container">
      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}

      <header>
        <h1><b>AI-Based Cloud Infrastructure</b></h1>
      </header>

      <section className="dashboard">
        <div className="grid">
          <div className="item large">
            <h2><u>Dashboard - Cloud Infrastructure in real time</u></h2>
          </div>

          <div className="item small">
            <h2>Memory</h2>
            <div className="circle">
              <span>{data.memory}%</span>
            </div>
          </div>

          <div className="item small">
            <h2><u>CPU GSU</u></h2>
            <div className="card">
              <p><b>{data.cpu.gsu1}U</b></p>
              <p><b>{data.cpu.gsu2}U</b></p>
              <p><b>{data.cpu.gsu3}U</b></p>
            </div>
          </div>

          <div className="item small">
            <h2>Network</h2>
            <div className="circle">
              <span>{data.network}%</span>
            </div>
          </div>

          <div className="item small">
            <h2>Cost Overview</h2>
            <div className="circle">
              <span>{data.costOverview}%</span>
            </div>
          </div>

          <div className="item medium">
            <h2>Scaling Methods</h2>
            <div className="circle">
              <span>{data.scalingMethods}%</span>
            </div>
          </div>

          <div className="item small">
            <h2>Cost Suggestion</h2>
            <div className="circle">
              <span>{data.costSuggestion}%</span>
            </div>
          </div>

          <div className="item small">
            <h2>CPU vs Network</h2>
            <div className="bar-chart">
              <div className="bar" style={{ width: `${data.cpuVsNetwork}%` }}></div>
            </div>
          </div>

          <div className="item small">
            <h2>Reports</h2>
            <div className="card">
              <p><b>{data.reports.report1}%</b></p>
              <p><b>{data.reports.report2}%</b></p>
              <p><b>{data.reports.report3}%</b></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
