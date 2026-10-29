"use client";
import { toCsv } from "@/lib/csv";
const CsvExportButton = ({ toCsvArray }) => {
  const download = (text, filename) => {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleClick = () => {
    const csvFormat = toCsv(toCsvArray);
    download(csvFormat, "orders");
  };

  return (
    <button
      className="p-1 bg-indigo-500 hover:bg-indigo-600 hover:text-white active:bg-sky-500 m-1 rounded"
      onClick={handleClick}
    >
      Download CSV file
    </button>
  );
};

export default CsvExportButton;
