import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Navbar1({ setSearchValue, handleShow, show }) {
  const [userInput, setUserInput] = useState("");

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setUserInput(searchValue);
    setSearchValue(searchValue); // Send search value to App.js
  };

  const handleClear = () => {
    setUserInput("");
    setSearchValue("");
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between p-3">
      <Form className="w-100">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={userInput}
              onChange={handleSearch}
              className="mr-sm-2"
            />
            <div xs="auto">
              <Button type="button" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>

          <div>
            <Button type="button" onClick={handleShow}>
              filter
            </Button>
          </div>
        </div>
      </Form>
    </Navbar>
  );
}

export default Navbar1;
