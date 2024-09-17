import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

interface Artwork {
  id: number;
  title: string;
  inscriptions: string | null;
  place_of_origin: string | null;
  artist_display: string;
  date_start: number;
  date_end: number;
}

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Set<number>>(
    new Set()
  );
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsToSelect, setRowsToSelect] = useState<number>(0); // New state for selecting rows

  useEffect(() => {
    const fetchArtworks = async (page: number, size: number) => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${size}`
        );
        if (!response.ok) throw new Error("Error in fetching API");
        const data = await response.json();
        setArtworks(data.data);
        setTotalRecords(data.pagination.total);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchArtworks(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div className="p-4">
      <Table
        artworks={artworks}
        selectedArtworks={selectedArtworks}
        setSelectedArtworks={setSelectedArtworks}
        rowsToSelect={rowsToSelect} // Pass rowsToSelect to Table
        setRowsToSelect={setRowsToSelect} // Pass setRowsToSelect to Table
      />
      <Pagination
        totalRecords={totalRecords}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onRowsPerPageChange={(size) => setRowsPerPage(size)}
      />
    </div>
  );
};

export default App;
