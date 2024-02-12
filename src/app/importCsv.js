import React from "react";

const ExportCSV = ({ data, fileName }) => {
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // Add headers
    const headers = Object.keys(array[0]);
    str += headers.join(',') + '\r\n';

    // Add rows
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let j = 0; j < headers.length; j++) {
        if (line !== '') line += ',';
        line += array[i][headers[j]];
      }
      str += line + '\r\n';
    }

    return str;
  };

  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <button onClick={downloadCSV}style={{ padding: '10px', width: '132px' }}>Export CSV This Year</button>
  );
};

export default ExportCSV;
