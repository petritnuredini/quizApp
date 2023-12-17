import React, { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

const Sculptors = () => {
  const [sculptors, setSculptors] = useState([]);
  const [addNewSculptorMode, setAddNewSculptorMode] = useState(false);
  const [editingSculptorId, setEditingSculptorId] = useState(null);
  const [editedSculptor, setEditedSculptor] = useState({
    sculptorId: "",
    name: "",
    birthYear: "",
    isDeleted: false,
  });
  const [newSculptor, setNewSculptor] = useState({
    name: "",
    birthYear: "",
    isDeleted: false,
  });

  useEffect(() => {
    fetchSculptors();
  }, []);

  const fetchSculptors = () => {
    createAPIEndpoint(ENDPOINTS.sculptors)
      .fetch()
      .then((response) => {
        setSculptors(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSaveEdit = () => {
    createAPIEndpoint(ENDPOINTS.sculptors)
      .put(editingSculptorId, editedSculptor)
      .then((response) => {
        fetchSculptors();
        setEditingSculptorId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    createAPIEndpoint(ENDPOINTS.sculptors)
      .delete(id)
      .then((response) =>
        setSculptors(sculptors.filter((s) => s.sculptorId !== id))
      )
      .catch((err) => console.log(err));
  };

  const handleAddNewSculptor = () => {
    createAPIEndpoint(ENDPOINTS.sculptors)
      .post(newSculptor)
      .then((response) => {
        fetchSculptors();
        setNewSculptor({ name: "", birthYear: "", isDeleted: false });
        setAddNewSculptorMode(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Sculptors</h2>
      {!addNewSculptorMode && (
        <button onClick={() => setAddNewSculptorMode(true)}>
          Add new sculptor
        </button>
      )}
      {addNewSculptorMode && (
        <div>
          <input
            value={newSculptor.name}
            onChange={(e) =>
              setNewSculptor({ ...newSculptor, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="number"
            value={newSculptor.birthYear}
            onChange={(e) =>
              setNewSculptor({ ...newSculptor, birthYear: e.target.value })
            }
            placeholder="Birth Year"
          />
          <button onClick={handleAddNewSculptor}>Add New Sculptor</button>
        </div>
      )}
      <ul>
        {sculptors.map(
          (sculptor) =>
            sculptor.isDeleted !== true && (
              <li key={sculptor.sculptorId}>
                {editingSculptorId === sculptor.sculptorId ? (
                  <>
                    <input
                      value={editedSculptor.name}
                      onChange={(e) =>
                        setEditedSculptor({
                          ...editedSculptor,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      value={editedSculptor.birthYear}
                      onChange={(e) =>
                        setEditedSculptor({
                          ...editedSculptor,
                          birthYear: e.target.value,
                        })
                      }
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    {sculptor.name}, Born {sculptor.birthYear}
                    <button
                      onClick={() => {
                        setEditingSculptorId(sculptor.sculptorId);
                        setEditedSculptor({
                          sculptorId: sculptor.sculptorId,
                          name: sculptor.name,
                          birthYear: sculptor.birthYear,
                          isDeleted: false,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(sculptor.sculptorId)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sculptors;
