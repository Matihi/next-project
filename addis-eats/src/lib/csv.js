export const toCsv = (rows) => {
  const cell = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  return [Object.keys(rows[0]), ...rows.map(Object.values)]
    .map((r) => r.map(cell).join(","))
    .join("\n");
};
