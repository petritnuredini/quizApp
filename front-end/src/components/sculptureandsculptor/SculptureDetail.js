import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

const SculptureDetail = () => {
  const { id } = useParams();
  const [sculpture, setSculpture] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedSculpture, setEditedSculpture] = useState({
    title: "",
    material: "",
    isDeleted: false,
  });

  useEffect(() => {
    fetchSculpture();
  }, [id]);

  const fetchSculpture = () => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .fetchById(id)
      .then((response) => {
        setSculpture(response.data);
        setEditedSculpture({ ...response.data });
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    createAPIEndpoint(ENDPOINTS.sculptures)
      .put(sculpture.sculptureId, editedSculpture)
      .then((response) => {
        fetchSculpture();
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  if (!sculpture) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {editMode ? (
          <input
            type="text"
            value={editedSculpture.title}
            onChange={(e) =>
              setEditedSculpture({ ...editedSculpture, title: e.target.value })
            }
          />
        ) : (
          sculpture.title
        )}
      </h2>
      {editMode ? (
        <>
          <p>
            Material:{" "}
            <input
              type="text"
              value={editedSculpture.material}
              onChange={(e) =>
                setEditedSculpture({
                  ...editedSculpture,
                  material: e.target.value,
                })
              }
            />
          </p>
          <p>
            Deleted:{" "}
            <input
              type="checkbox"
              checked={editedSculpture.isDeleted}
              onChange={(e) =>
                setEditedSculpture({
                  ...editedSculpture,
                  isDeleted: e.target.checked,
                })
              }
            />
          </p>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Material: {sculpture.material}</p>
          <p>Deleted: {sculpture.isDeleted ? "Yes" : "No"}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default SculptureDetail;
