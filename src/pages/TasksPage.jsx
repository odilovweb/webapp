import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import telegramIcon from "../assets/telegram.svg";
import { FaCheck } from "react-icons/fa6";
import { telegram } from "../App";

function TasksPage() {
  const [tasksIds, setTasksIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTasks, setPendingTask] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [text, setText] = useState("");
  const getUserDatas = async (userIds) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", `${userIds}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDataUser(docSnap.data());
        setDoneTasks(docSnap.data().tasks);
        console.log(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("Eror");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const isPresent = (id) => {
    return doneTasks.includes(id);
  };

  const updateUserData = async (data, idX) => {
    try {
      const docRef = await updateDoc(doc(db, "users", `${idX}`), data);
      console.log("done");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getUserData = async (userId) => {
    setIsLoading(true);
    try {
      const docSnap = await getDocs(collection(db, "tasks", userId));

      const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasksIds(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    telegram.ready();

    if (telegram.initDataUnsafe) {
      getUserData(telegram.initDataUnsafe.user.id);
      setText(telegram.initDataUnsafe.user);
    }

    getUserData();
    console.log(tasksIds);
  }, [doneTasks]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>{text}</th>
              <th>Title</th>
              <th>Amount Prize</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasksIds.length > 0 &&
              tasksIds.map((task) => {
                return (
                  <tr key={task.telegram.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {task.telegram.type == "telegram" && (
                              <img src={telegramIcon} alt="Telegram Logo" />
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
                    {isPresent(task.telegram.id) ? (
                      <th>
                        <span>
                          <FaCheck />
                        </span>
                      </th>
                    ) : (
                      <th
                        onClick={() => {
                          setPendingTask(task.telegram.id);
                        }}
                      >
                        {pendingTasks == task.telegram.id ? (
                          <button
                            onClick={() => {
                              dataUser.balance += task.telegram.bonus;
                              dataUser.tasks.push(task.telegram.id);
                              doneTasks.push(task.telegram.id);
                              if (telegram.initDataUnsafe) {
                                updateUserData(
                                  dataUser,
                                  telegram.initDataUnsafe.user.id
                                );
                              }
                            }}
                            className="btn btn-warning"
                          >
                            Claim
                          </button>
                        ) : (
                          <a
                            className=" btn btn-info"
                            href={task.telegram.link}
                          >
                            Join
                          </a>
                        )}
                      </th>
                    )}
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
