// "use client";

// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import {
//   addUser,
//   deleteUser,
//   updateBalance,
//   reorderUser,
//   updateTrunks,
// } from "../redux/slices/userSlice";

// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users.users); // Correctly get the users from the state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState({});
//   const [newUser, setNewUser] = useState({
//     id: "",
//     name: "",
//     ip: "",
//     phone: "",
//     balance: 0,
//     trunks: [],
//   });

//   // Handle Add User
//   const handleAddUser = () => {
//     if (newUser.name && newUser.ip && newUser.phone) {
//       dispatch(
//         addUser({
//           ...newUser,
//           id: Date.now().toString(), // Ensure unique ID
//           balance: parseFloat(newUser.balance), // Ensure balance is numeric
//           trunks: [], // Default empty trunks
//         })
//       );
//       setModalOpen(false);
//       setNewUser({ id: "", name: "", ip: "", phone: "", balance: 0 });
//     } else {
//       alert("Please fill out all fields before adding a user.");
//     }
//   };

//   // Handle Delete User
//   const handleDeleteUser = (id) => {
//     dispatch(deleteUser(id));
//   };

//   // Handle Reorder
//   const handleReorder = (id, direction) => {
//     dispatch(reorderUser({ id, direction }));
//   };

//   // Handle Balance Change
//   const handleBalanceChange = (id, value) => {
//     dispatch(updateBalance({ id, value }));
//   };

//   // Handle Trunk Toggle
//   const handleTrunkToggle = (id, trunk) => {
//     const user = users.find((user) => user.id === id);
//     const updatedTrunks = user.trunks.includes(trunk)
//       ? user.trunks.filter((t) => t !== trunk) // Remove trunk if already selected
//       : [...user.trunks, trunk]; // Add trunk if not selected
//     dispatch(updateTrunks({ id, trunks: updatedTrunks }));
//   };

//   const availableTrunks = ["Trunk1", "Trunk2", "Trunk3", "Trunk4"]; // Example trunks

//   return (
//     <div className="bg-cover bg-fixed min-h-screen pt-8">
//       {/* Background */}
//       <div className="p-8 bg-gray-900 bg-opacity-70">
//         <h1 className="text-3xl text-white mb-4">Admin Dashboard</h1>

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           onClick={() => setModalOpen(true)}
//         >
//           Add New User
//         </button>
//         <button
//           className={`${deleteMode ? "bg-red-700" : "bg-red-500"
//             } text-white px-4 py-2 rounded`}
//           onClick={() => setDeleteMode(!deleteMode)}
//         >
//           {deleteMode ? "Exit Delete Mode" : "Delete a User"}
//         </button>

//         <table className="mt-6 w-full bg-white shadow-md rounded">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>IP Address</th>
//               <th>Phone</th>
//               <th>Balance</th>
//               <th>Trunks Allotted</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(users) && users.map((user, index) => (
//               <tr key={user.id} className="border-t">
//                 <td>{index + 1}</td>
//                 <td>{user.name}</td>
//                 <td>{user.ip}</td>
//                 <td>{user.phone}</td>
//                 <td>
//                   <div className="flex items-center">
//                     <button
//                       onClick={() =>
//                         handleBalanceChange(user.id, user.balance - 1)
//                       }
//                       className="bg-gray-300 px-2 rounded-l"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       value={user.balance}
//                       onChange={(e) =>
//                         handleBalanceChange(user.id, parseInt(e.target.value) || 0)
//                       }
//                       className="w-16 text-center border"
//                     />
//                     <button
//                       onClick={() =>
//                         handleBalanceChange(user.id, user.balance + 1)
//                       }
//                       className="bg-gray-300 px-2 rounded-r"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="relative">
//                     <button
//                       onClick={() =>
//                         setDropdownOpen((prev) => ({
//                           ...prev,
//                           [user.id]: !prev[user.id],
//                         }))
//                       }
//                       className="bg-gray-200 px-4 py-2 rounded"
//                     >
//                       {user.trunks.length > 0
//                         ? user.trunks.join(", ")
//                         : "No Trunk Allotted"}
//                     </button>

//                     {dropdownOpen[user.id] && (
//                       <div className="absolute bg-white border mt-1 shadow-md rounded p-2 z-10">
//                         {availableTrunks.map((trunk) => (
//                           <div key={trunk} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={user.trunks.includes(trunk)}
//                               onChange={() => handleTrunkToggle(user.id, trunk)}
//                               className="mr-2"
//                             />
//                             <label>{trunk}</label>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td>
//                   {deleteMode && (
//                     <button
//                       onClick={() => handleDeleteUser(user.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleReorder(user.id, "up")}
//                     className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
//                   >
//                     Move Up
//                   </button>
//                   <button
//                     onClick={() => handleReorder(user.id, "down")}
//                     className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
//                   >
//                     Move Down
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for adding a user */}
//       {modalOpen && (
//         <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-50 w-full h-full flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl mb-4">Add New User</h2>
//             <div className="mb-4">
//               <label className="block">Name</label>
//               <input
//                 type="text"
//                 value={newUser.name}
//                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                 className="w-full border p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block">IP Address</label>
//               <input
//                 type="text"
//                 value={newUser.ip}
//                 onChange={(e) => setNewUser({ ...newUser, ip: e.target.value })}
//                 className="w-full border p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block">Phone</label>
//               <input
//                 type="text"
//                 value={newUser.phone}
//                 onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//                 className="w-full border p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block">Balance</label>
//               <input
//                 type="number"
//                 value={newUser.balance}
//                 onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })}
//                 className="w-full border p-2"
//               />
//             </div>
//             <button
//               onClick={handleAddUser}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add User
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addUser,
  deleteUser,
  updateBalance,
  reorderUser,
  updateTrunks,
  fetchUsersFromAPI,
  fetchUsersRequest,
} from "../redux/slices/userSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users); // Access the users array directly
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    ip: "",
    phone: "",
    balance: 0,
    trunks: [],
  });

  // Handle Add User
  const handleAddUser = () => {
    if (newUser.name && newUser.ip && newUser.phone) {
      dispatch(
        addUser({
          ...newUser,
          id: Date.now().toString(), // Ensure unique ID
          balance: parseFloat(newUser.balance), // Ensure balance is numeric
          trunks: [], // Default empty trunks
        })
      );
      setModalOpen(false);
      setNewUser({ id: "", name: "", ip: "", phone: "", balance: 0 });
    } else {
      alert("Please fill out all fields before adding a user.");
    }
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)); // Delete from Redux
  };
  

  // Handle Reorder
  const handleReorder = (id, direction) => {
    dispatch(reorderUser({ id, direction }));
  };

  // Handle Balance Change
  const handleBalanceChange = (id, value) => {
    dispatch(updateBalance({ id, value }));
  };
  

  // Handle Trunk Toggle
  const handleTrunkToggle = (id, trunk) => {
    const user = users.find((user) => user.id === id);
    const updatedTrunks = user.trunks.includes(trunk)
      ? user.trunks.filter((t) => t !== trunk) // Remove trunk if already selected
      : [...user.trunks, trunk]; // Add trunk if not selected
    dispatch(updateTrunks({ id, trunks: updatedTrunks }));
  };
  

  const availableTrunks = ["Trunk1", "Trunk2", "Trunk3", "Trunk4"]; // Example trunks

  useEffect(() => {
    dispatch(fetchUsersFromAPI());
  }, [dispatch]);


  console.log(users,'myy');
  

  return (
    <div className="bg-cover bg-fixed min-h-screen pt-8">
      {/* Background */}
      <div className="p-8 bg-gray-900 bg-opacity-70">
        <h1 className="text-3xl text-white mb-4">Admin Dashboard</h1>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setModalOpen(true)}
        >
          Add New User
        </button>
        <button
          className={`${deleteMode ? "bg-red-700" : "bg-red-500"
            } text-white px-4 py-2 rounded`}
          onClick={() => setDeleteMode(!deleteMode)}
        >
          {deleteMode ? "Exit Delete Mode" : "Delete a User"}
        </button>

        <table className="mt-6 w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>IP Address</th>
              <th>Phone</th>
              <th>Balance</th>
              <th>Trunks Allotted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users && users.length > 0 ? (
          users.map((user,index) => (
              <tr key={user.id} className="border-t">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.ip}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleBalanceChange(user.id, user.balance - 1)
                      }
                      className="bg-gray-300 px-2 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={user.balance}
                      onChange={(e) =>
                        handleBalanceChange(user.id, parseInt(e.target.value) || 0)
                      }
                      className="w-16 text-center border"
                    />
                    <button
                      onClick={() =>
                        handleBalanceChange(user.id, user.balance + 1)
                      }
                      className="bg-gray-300 px-2 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          [user.id]: !prev[user.id],
                        }))
                      }
                      className="bg-gray-200 px-4 py-2 rounded"
                    >
                      {user?.trunks?.length > 0
                        ? user.trunks.join(", ")
                        : "No Trunk Allotted"}
                    </button>

                    {dropdownOpen[user.id] && (
                      <div className="absolute bg-white border mt-1 shadow-md rounded p-2 z-10">
                        {availableTrunks.map((trunk) => (
                          <div key={trunk} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={user.trunks.includes(trunk)}
                              onChange={() => handleTrunkToggle(user.id, trunk)}
                              className="mr-2"
                            />
                            <label>{trunk}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {deleteMode && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => handleReorder(user.id, "up")}
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Move Up
                  </button>
                  <button
                    onClick={() => handleReorder(user.id, "down")}
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Move Down
                  </button>
                </td>
              </tr>
           ) ))
            : (
              <tr>
                <td colSpan="6">No users available</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>

      {/* Modal for adding a user */}
      {modalOpen && (
        <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-50 w-full h-full flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block">IP Address</label>
              <input
                type="text"
                value={newUser.ip}
                onChange={(e) => setNewUser({ ...newUser, ip: e.target.value })}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block">Phone</label>
              <input
                type="text"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block">Balance</label>
              <input
                type="number"
                value={newUser.balance}
                onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })}
                className="w-full border p-2"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

