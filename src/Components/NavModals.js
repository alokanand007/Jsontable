import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

function NavModals({ show, handleClose, selectedItems, setSelectedItems }) {
  const [tempSelectedItems, setTempSelectedItems] = useState([
    ...selectedItems,
  ]);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedItems;
    if (checked) {
      updatedItems = [...tempSelectedItems, value];
    } else {
      updatedItems = tempSelectedItems.filter((item) => item !== value);
    }
    updatedItems.sort(
      (a, b) => defaultColumnOrder.indexOf(a) - defaultColumnOrder.indexOf(b)
    );
    setTempSelectedItems(updatedItems);
  };

  // Save selected items
  const saveChanges = () => {
    setSelectedItems(tempSelectedItems);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Uncheck the coloum you want to hide</h4>
          <form>
            {defaultColumnOrder.map((item) => (
              <div className="form-check" key={item}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="boxes"
                  id={item.toLowerCase()}
                  value={item}
                  onChange={handleCheckboxChange}
                  checked={tempSelectedItems.includes(item)}
                />
                <label
                  className="form-check-label"
                  htmlFor={item.toLowerCase()}
                >
                  {item}
                </label>
              </div>
            ))}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavModals;
