// src/components/FlockManager.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlock, updateFlockCount } from "../../features/flock/FlockSlice";

const FlockManager = () => {
  const dispatch = useDispatch();
  const flock = useSelector((state) => state.flock.flock);

  useEffect(() => {
    dispatch(fetchFlock());
  }, [dispatch]);

  const handleChange = (id, currentCount, delta) => {
    const newCount = currentCount + delta;
    if (newCount >= 0) {
      dispatch(updateFlockCount({ id, count: newCount }));
    }
  };

  const total = flock.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="glass-box">
      <h2>Stan stada</h2>
      <ul>
        {flock.map(({ id, type, count }) => (
          <li key={id} style={{ marginBottom: "10px" }}>
            <strong>{type}:</strong> {count}
            <button onClick={() => handleChange(id, count, 1)}>＋</button>
            <button onClick={() => handleChange(id, count, -1)}>－</button>
          </li>
        ))}
      </ul>
      <h3>Suma: {total}</h3>
    </div>
  );
};

export default FlockManager;
