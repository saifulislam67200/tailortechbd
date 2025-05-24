"use client";
import { useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

interface IProps {
  defaultValue?: string[][];
  onChange?: (value: string[][]) => void;
}

const TableInput: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const [tableData, setTableData] = useState<string[][]>(
    defaultValue?.length
      ? defaultValue
      : [
          ["Size", "Chest (Round)", "Length", "Sleeve"],
          ["", "", "", ""],
          ["", "", "", ""],
          ["", "", "", ""],
        ]
  );

  const [mouseOn, setMouseOn] = useState<{
    type: "add" | "delete";
    position: "row" | "column";
    index: number;
  } | null>();

  const handleCellChange = (row: number, col: number, value: string) => {
    const updated = tableData.map((inner) => [...inner]);
    updated[row][col] = value;
    setTableData(updated);
    onChange?.(updated);
  };

  const addRow = () => {
    const newRow = new Array(tableData[0].length).fill("");
    setTableData([...tableData, newRow]);
    onChange?.([...tableData, newRow]);
  };

  const addColumn = () => {
    const newData = tableData.map((row) => [...row, ""]);
    setTableData(newData);
    setMouseOn(null);
    onChange?.(newData);
  };

  const deleteRow = (rowIndex: number) => {
    if (tableData.length <= 1) return;
    const newData = tableData.filter((_, idx) => idx !== rowIndex);
    setTableData(newData);
    onChange?.(newData);
  };

  const deleteColumn = (colIndex: number) => {
    if (tableData[0].length <= 1) return;
    const newData = tableData.map((row) => row.filter((_, idx) => idx !== colIndex));
    setTableData(newData);
    onChange?.(newData);
  };

  return (
    <div className="relative flex w-full flex-col items-start">
      {/* Table with Row Delete Buttons */}
      <div className="flex w-full flex-col">
        {/* Delete Column Buttons */}
        <div className="mr-[40px] flex w-full">
          {tableData[0]?.map((_, colIndex) => (
            <div key={colIndex} className={`flex w-full justify-center`}>
              <button
                onMouseEnter={() =>
                  setMouseOn({ type: "delete", position: "column", index: colIndex })
                }
                onMouseLeave={() => setMouseOn(null)}
                type="button"
                onClick={() => deleteColumn(colIndex)}
                className="center mb-1 aspect-square w-[30px] cursor-pointer rounded-full border border-border-muted bg-transparent text-[16px] text-danger"
                title="Delete Column"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
        {tableData?.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {/* Row Cells */}
            {row?.map((cell, colIndex) => (
              <div
                key={colIndex + "-" + rowIndex}
                className={`flex h-[48px] w-full items-center justify-center border border-border-muted ${mouseOn?.type === "delete" && mouseOn?.position === "row" && mouseOn?.index === rowIndex ? "bg-danger/40" : ""} ${mouseOn?.type === "delete" && mouseOn?.position === "column" && mouseOn?.index === colIndex ? "bg-danger/40" : ""} `}
              >
                <input
                  className={`h-full w-full px-2 text-center outline-none ${
                    rowIndex === 0 ? "font-bold" : ""
                  }`}
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                />
              </div>
            ))}

            {/* display new column comming */}
            {mouseOn?.type == "add" && mouseOn.position == "column"
              ? Array.from({ length: 1 })?.map((cell, colIndex) => (
                  <div
                    key={colIndex + "-" + rowIndex + "new"}
                    className={`flex h-[48px] w-full items-center justify-center border border-border-muted bg-success/40`}
                  >
                    <input
                      className={`h-full w-full px-2 text-center outline-none ${
                        rowIndex === 0 ? "font-bold" : ""
                      }`}
                    />
                  </div>
                ))
              : ""}

            {/* Delete Row Button */}
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
              {rowIndex !== 0 ? (
                <button
                  onMouseEnter={() =>
                    setMouseOn({ type: "delete", position: "row", index: rowIndex })
                  }
                  onMouseLeave={() => setMouseOn(null)}
                  type="button"
                  onClick={() => deleteRow(rowIndex)}
                  className="center aspect-square w-[30px] cursor-pointer rounded-full border border-border-muted bg-transparent text-[16px] text-danger"
                  title="Delete Row"
                >
                  <FaRegTrashAlt />
                </button>
              ) : (
                <button
                  type="button"
                  title="Add Column"
                  onMouseEnter={() =>
                    setMouseOn({ type: "add", position: "column", index: rowIndex })
                  }
                  onMouseLeave={() => setMouseOn(null)}
                  onClick={addColumn}
                  className="center center h-[30px] w-[30px] cursor-pointer rounded-full border border-border-muted text-muted"
                >
                  <FaPlus />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Row and Column Buttons */}
      <button
        type="button"
        onClick={addRow}
        className="mt-4 cursor-pointer rounded-full border border-border-muted px-4 py-2 text-muted"
      >
        <FaPlus className="mr-1 inline" /> Add Row
      </button>
    </div>
  );
};

export default TableInput;
