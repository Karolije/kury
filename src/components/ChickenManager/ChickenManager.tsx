import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlock, updateFlockCount } from "../../features/flock/FlockSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import "./style.css";

export type ChickenManagerProps = {};

export const ChickenManager: React.FC<ChickenManagerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const flock = useSelector((state: RootState) => state.flock.flock);

  useEffect(() => {
    dispatch(fetchFlock());
  }, [dispatch]);

  const handleChange = (id: string, currentCount: number, delta: number) => {
    const newCount = currentCount + delta;
    if (newCount >= 0) {
      dispatch(updateFlockCount({ id, count: newCount }));
    }
  };

  const total = useMemo(() => { 
    return flock.reduce((sum, item) => sum + item.count, 0);
  }, [flock]);

  return (
    <div className="glass-box flock-manager">
      <h2>Stan stada</h2>
      <ul>
        {flock.map(({ id, type, count }) => (
          <li key={id} style={{ marginBottom: "10px" }}>
            <strong>{type}:</strong> {count}
            <button onClick={() => handleChange(id, count, -1)}>－</button>
            <button onClick={() => handleChange(id, count, 1)}>＋</button>
          </li>
        ))}
      </ul>
      <h3>Suma: {total}</h3>
    </div>
  );
};
