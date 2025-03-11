import Dropdown from "react-bootstrap/Dropdown";

function CustomDropDown({ setItemsPerPage }) {
  const selectPage = (eventKey) => {
    setItemsPerPage(Number(eventKey));
  };
  return (
    <Dropdown onSelect={selectPage}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
        Itemperpage
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="10">10</Dropdown.Item>
        <Dropdown.Item eventKey="20">20</Dropdown.Item>
        <Dropdown.Item eventKey="30">30</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropDown;
