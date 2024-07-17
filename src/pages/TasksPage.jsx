import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import telegram from "../assets/telegram.svg";
import { useDispatch } from "react-redux";
import { plusBalance } from "../redux/store";
function TasksPage() {
  const dispatch = useDispatch();
  const [tasksIds, setTasksIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTasks, setPendingTask] = useState(null);
  const getUserData = async (userId) => {
    setIsLoading(true);
    try {
      const docSnap = await getDocs(collection(db, "tasks"));

      const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasksIds(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    getUserData();
    console.log(tasksIds);
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasksIds.length > 0 &&
              tasksIds.map((task) => {
                return (
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {task.telegram.type == "telegram" && (
                              <img src={telegram} alt="Telegram Logo" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {task.telegram.title}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {task.telegram.description}
                      </span>
                    </td>
                    <td>{task.telegram.bonus}</td>
                    <th
                      onClick={() => {
                        setPendingTask(task.telegram.id);
                      }}
                    >
                      {pendingTasks == task.telegram.id ? (
                        <button
                          onClick={() => {
                            dispatch(plusBalance(task.telegram.bonus));
                          }}
                          className="btn btn-warning"
                        >
                          Claim
                        </button>
                      ) : (
                        <a className=" btn btn-info" href={task.telegram.link}>
                          Join
                        </a>
                      )}
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksPage;
