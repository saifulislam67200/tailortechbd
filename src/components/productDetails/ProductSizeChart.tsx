const ProductSizeChart = ({ chart }: { chart: string[][] }) => {
  console.log("chart", chart);
  if (!chart || chart.length === 0) return <div>hi there</div>;
  const [headers, ...rows] = chart;

  return (
    <div className="mt-6 overflow-x-auto">
      <h3 className="mb-3 text-lg font-semibold">Size Chart</h3>
      <table className="min-w-full border">
        <thead>
          <tr className="">
            {headers?.map((header, index) => (
              <th key={index} className="border px-4 py-2 text-left font-medium">
                {header} hi
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className="">
              {row?.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">
                  {cell} hello
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSizeChart;
