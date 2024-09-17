import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import chevDown from "../icons/chevDown.png";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

interface Artwork {
  id: number;
  title: string;
  inscriptions: string | null;
  place_of_origin: string | null;
  artist_display: string;
  date_start: number;
  date_end: number;
}

interface TableProps {
  artworks: Artwork[];
  selectedArtworks: Set<number>;
  setSelectedArtworks: (selected: Set<number>) => void;
  rowsToSelect: number;
  setRowsToSelect: (rows: number) => void;
}

const Table: React.FC<TableProps> = ({
  artworks,
  selectedArtworks,
  setSelectedArtworks,
  rowsToSelect,
  setRowsToSelect,
}) => {
  const op = useRef<OverlayPanel>(null); // Reference for OverlayPanel
  const [inputValue, setInputValue] = useState(""); // State for input value // State for toggle selection

  // Handle selection change
  const handleSelectionChange = (e: { value: Artwork[] }) => {
    const selectedIds = new Set<number>(e.value.map((artwork) => artwork.id));
    setSelectedArtworks(selectedIds); // Directly set the selected artworks
  };

  // Handle overlay submission
  useEffect(() => {
    if (rowsToSelect > 0) {
      const selectedIds = new Set<number>(
        artworks.slice(0, rowsToSelect).map((artwork) => artwork.id)
      );
      setSelectedArtworks((prevSelected) => {
        const newSelected = new Set(prevSelected);
        selectedIds.forEach((id) => newSelected.add(id));
        return newSelected;
      });
      setRowsToSelect(0); // Reset after selection
    }
  }, [rowsToSelect, artworks, setRowsToSelect]);

  // Toggle select/deselect all rows

  // Custom header for the Title column
  const titleHeader = () => (
    <div
      className="custom-title-header"
      style={{
        backgroundImage: `url(${chevDown})`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "12px 12px",
        cursor: "pointer",
      }}
      onClick={(e) => {
        if (op.current) {
          op.current.toggle(e); // Toggle the OverlayPanel
        }
      }}
    >
      Title
    </div>
  );

  return (
    <div className="p-4" style={{ position: "relative" }}>
      <OverlayPanel ref={op}>
        <div style={{ padding: "10px" }}>
          <input
            type="number"
            placeholder="Select your rows"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Button
            label="Submit"
            onClick={() => {
              setRowsToSelect(parseInt(inputValue, 10) || 0);
              if (op.current) {
                op.current.hide(); // Hide the overlay after submitting
              }
            }}
            style={{ width: "100%" }}
          />
        </div>
      </OverlayPanel>

      <DataTable
        value={artworks}
        selectionMode="multiple"
        selection={artworks.filter((artwork) =>
          selectedArtworks.has(artwork.id)
        )}
        onSelectionChange={handleSelectionChange}
        dataKey="id"
        paginator={false}
        rows={5}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="title" header={titleHeader} />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist Display" />
        <Column field="date_start" header="Date Start" />
        <Column field="date_end" header="Date End" />
      </DataTable>
    </div>
  );
};

export default Table;
