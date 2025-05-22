const ProductSizeChart = ({ chart }: { chart: string[][] }) => {
  console.log("chart", chart);
  if (!chart || chart.length === 0) {
    return (
      <h3 className="mt-[30px] mb-3 text-[16px]">No size chart is available for this product.</h3>
    );
  }
  const [headers, ...rows] = chart;

  return (
    <div className="mt-[30px]">
      <h3 className="mb-3 text-[16px] font-semibold">Size Chart</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-quaternary">
          <thead>
            <tr className="">
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className="border border-quaternary px-4 py-2 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {row?.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-quaternary px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSizeChart;
