import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

const Sculptures = () => {
  const [sculptures, setSculptures] = useState([]);
  const [sculptors, setSculptors] = useState([]);
  const [editSculptureId, setEditSculptureId] = useState(null);
  const [editedSculpture, setEditedSculpture] = useState({
    title: "",
    sculptorId: "",
  });
  const [newSculpture, setNewSculpture] = useState({
    title: "",
    material: "",
    sculptorId: "",
    isDeleted: false,
  });
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    fetchSculptures();
    fetchSculptors();
  }, []);

  const fetchSculptures = () => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .fetch()
      .then((response) => {
        setSculptures(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSculptors = () => {
    createAPIEndpoint(ENDPOINTS.sculptors)
      .fetch()
      .then((response) => setSculptors(response.data))
      .catch((err) => console.log(err));
  };

  const handleAddNew = () => {
    setAddingNew(true);
  };
  const handleSaveNew = () => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .post(newSculpture)
      .then((response) => {
        fetchSculptures();
        setAddingNew(false);
        setNewSculpture({
          title: "",
          material: "",
          sculptorId: "",
          isDeleted: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewSculpture({
      title: "",
      material: "",
      sculptorId: "",
      isDeleted: false,
    });
  };

  const handleEdit = (sculpture) => {
    setEditSculptureId(sculpture.sculptureId);
    setEditedSculpture({
      isDeleted: sculpture.isDeleted,
      title: sculpture.title,
      sculptorId: sculpture.sculptorId,
      material: sculpture.material,
      sculptor: sculpture.sculptor,
      sculptureId: sculpture.sculptureId,
    });
  };

  const handleSave = (id) => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .put(id, { ...editedSculpture })
      .then((response) => {
        fetchSculptures();
        setEditSculptureId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .delete(id)
      .then((response) =>
        setSculptures(sculptures.filter((s) => s.sculptureId !== id))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Sculptures</h2>
      {addingNew ? (
        <>
          <input
            value={newSculpture.title}
            onChange={(e) =>
              setNewSculpture({ ...newSculpture, title: e.target.value })
            }
            placeholder="Title"
          />
          <input
            value={newSculpture.material}
            onChange={(e) =>
              setNewSculpture({ ...newSculpture, material: e.target.value })
            }
            placeholder="Material"
          />
          <select
            value={newSculpture.sculptorId}
            onChange={(e) =>
              setNewSculpture({ ...newSculpture, sculptorId: e.target.value })
            }
          >
            <option value="">Select Sculptor</option>
            {sculptors.map((sculptor) => (
              <option key={sculptor.sculptorId} value={sculptor.sculptorId}>
                {sculptor.name}
              </option>
            ))}
          </select>
          <button onClick={handleSaveNew}>Add Sculpture</button>
          <button onClick={handleCancelNew}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddNew}>Add New Sculpture</button>
      )}
      <ul>
        {sculptures.map(
          (sculpture) =>
            sculpture.isDeleted !== true && (
              <li key={sculpture.sculptureId}>
                {editSculptureId === sculpture.sculptureId ? (
                  <>
                    <input
                      value={editedSculpture.title}
                      onChange={(e) =>
                        setEditedSculpture({
                          ...editedSculpture,
                          title: e.target.value,
                        })
                      }
                    />
                    <select
                      value={editedSculpture.sculptorId}
                      onChange={(e) =>
                        setEditedSculpture({
                          ...editedSculpture,
                          sculptorId: e.target.value,
                        })
                      }
                    >
                      {sculptors.map((sculptor) => (
                        <option
                          key={sculptor.sculptorId}
                          value={sculptor.sculptorId}
                        >
                          {sculptor.name}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    {sculpture.title} - Sculptor:{" "}
                    {sculptors.find(
                      (s) => s.sculptorId === sculpture.sculptorId
                    )?.name || "Unknown"}
                  </>
                )}
                {editSculptureId === sculpture.sculptureId ? (
                  <button onClick={() => handleSave(sculpture.sculptureId)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(sculpture)}>Edit</button>
                    <button onClick={() => handleDelete(sculpture.sculptureId)}>
                      Delete
                    </button>
                    <Link to={`/sculpture/${sculpture.sculptureId}/`}>
                      View Details
                    </Link>
                  </>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sculptures;
