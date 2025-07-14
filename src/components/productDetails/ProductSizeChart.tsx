const ProductSizeChart = ({ chart, className }: { chart: string[][]; className?: string }) => {
  if (!chart || chart.length === 0) {
    return (
      <h3 className="mt-[30px] mb-3 text-[16px]">No size chart is available for this product.</h3>
    );
  }
  const [headers, ...rows] = chart;

  return (
    <div className={`mt-[30px] w-fit max-w-[450px] ${className}`}>
      <div className="mb-[15px] flex flex-col gap-[3px]">
        <p className="text-[16px] font-semibold">Size chart - In inches</p>
        <span className="text-[12px] text-muted">
          * The size chart is approximate and may not be exact (±3%).
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-quaternary">
          <thead>
            <tr className="">
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className="border border-quaternary bg-primary/80 px-2 py-1 text-center font-medium text-white"
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
                  <td key={cellIndex} className="border border-quaternary px-2 py-1 text-center">
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
