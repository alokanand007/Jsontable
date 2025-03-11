import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Navbar1 from "./Components/Navbar.js";
import NavModals from "./Components/NavModals.js";
import CustomDropDown from "./Components/Dropdown.js";

const defaultColumnOrder = [
  "Name",
  "City",
  "Country",
  "Coordinates",
  "Code",
  "Regions",
  "Province",
  "Timezone",
  "Unlocs",
];

function App() {
  const [data, setData] = useState({}); // for API data
  const [searchValue, setSearchValue] = useState(""); // for search
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [totalPages, setTotalPages] = useState(1); // total pages
  const [show, setShow] = useState(false); // modal visibility
  const [selectedItems, setSelectedItems] = useState([...defaultColumnOrder]); // selected columns
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // const itemsPerPage = 5;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/ports?_page=${currentPage}&_per_page=${itemsPerPage}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  // Fetch total pages
  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await fetch("http://localhost:3000/ports");
        const allData = await response.json();
        setTotalPages(Math.ceil(allData.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching total pages:", error);
      }
    };

    fetchTotalPages();
  }, [itemsPerPage]);

  // Filter data based on search value
  const currentData = useMemo(() => {
    if (!searchValue) {
      return data?.data || [];
    } else {
      return (
        data.data?.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().startsWith(searchValue.toLowerCase())
        ) || []
      );
    }
  }, [data, searchValue]);

  // Pagination functions
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Navbar1
        setSearchValue={setSearchValue}
        handleShow={() => setShow(true)}
      />
      <NavModals
        show={show}
        handleClose={() => setShow(false)}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <table border="1">
        <thead>
          <tr>
            {selectedItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentData.map((value, index) => (
            <tr key={index}>
              {selectedItems.map((item) => (
                <td key={item}>{value[item.toLowerCase()]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex">
        <button
          style={{ marginLeft: "10px", marginBottom: "10px" }}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <span>
          {" "}
          <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
            Next
          </button>
        </span>
        <span style={{ marginLeft: "20px" }}>
          <CustomDropDown setItemsPerPage={setItemsPerPage} />
        </span>
      </div>
    </>
  );
}

export default App;
