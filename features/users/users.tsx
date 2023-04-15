import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { getUsers, updateUser } from ".";
import { Pagination } from "@/components/index";
import { HomeProps } from "./type";

export function Users({ data: users, total_pages }: HomeProps) {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState(users || []);
  const [loading, setLoading] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [userEditData, setUserEditData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState<number>();

  const tdClasses = "text-center mb-3 p-4";
  const inputClasses =
    "border border-gray-200 px-2 py-1 rounded-md mb-3 w-2/3 min-w-[200px] outline-none focus:border-blue-500 focus:border-2 transition ease-linear duration-300";

  const calcOdd = (index: number) => {
    return index % 2 === 1 && "bg-gray-100";
  };

  const handleUpdateUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    updateUser(selectedUserId as number, userEditData).then(
      ({ status, data }) => {
        if (status === 200) {
          setAllUsers((prev) =>
            prev.map((user) => {
              if (user.id === selectedUserId) {
                return {
                  ...user,
                  ...data,
                };
              }
              return user;
            })
          );
          setLoading(false);
        }
      }
    );
    setIsUpdateUser(false);
  };

  const handleIsUpdateUser = (id: number) => {
    setIsUpdateUser(true);
    setSelectedUserId(id);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserEditData((prev) => ({ ...prev, [name]: value }));
  };

  const getUserDefaultValue = (field: "email" | "first_name" | "last_name") => {
    if (!selectedUserId) return;
    return allUsers[(selectedUserId as number) - 1][field];
  };

  const renderUsers = allUsers.map((user, i) => (
    <tr key={user.id} className={`mb-10 ${calcOdd(i)}`}>
      <td className={tdClasses}>{user.first_name}</td>
      <td className={tdClasses}>{user.last_name}</td>
      <td className={tdClasses}>{user.email}</td>
      <td>
        <button
          onClick={() => handleIsUpdateUser(user.id)}
          className="bg-gray-700 p-2 rounded-md text-white"
        >
          Edit
        </button>
      </td>
    </tr>
  ));

  const onChangePage = (dir: "forward" | "back") => {
    const currentPage =
      dir === "forward" ? page + 1 : page === 1 ? 1 : page - 1;
    setLoading(true);
    getUsers(`/users?page=${currentPage}&delay=3`).then((res) => {
      setAllUsers(res.data);
      setPage(currentPage);
      setLoading(false);
    });
  };

  return (
    <>
      {isUpdateUser && (
        <form className="border border-gray-300 mt-5 w-1/2 mx-auto rounded-lg px-3 py-6 relative">
          <h3 className="text-center text-xl mb-6">Edit user Data</h3>
          <div className="w-2/3 flex justify-between">
            <label htmlFor="email" className="cursor-pointer">
              Email :
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onBlur={handleBlur}
              defaultValue={getUserDefaultValue("email")}
              className={inputClasses}
            />
          </div>
          <div className="w-2/3 flex justify-between">
            <label htmlFor="first_name" className="cursor-pointer">
              First Name :
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onBlur={handleBlur}
              defaultValue={getUserDefaultValue("first_name")}
              className={inputClasses}
            />
          </div>
          <div className="w-2/3 flex justify-between">
            <label htmlFor="last_name" className="cursor-pointer">
              Last Name :
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onBlur={handleBlur}
              defaultValue={getUserDefaultValue("last_name")}
              className={inputClasses}
            />
          </div>
          <button
            className="float-left absolute right-3 bottom-9 bg-green-400 px-4 py-2 rounded-md text-gray-700"
            type="submit"
            onClick={handleUpdateUser}
          >
            Edit
          </button>
        </form>
      )}
      {!isUpdateUser && (
        <>
          {loading && (
            <div className="w-full h-[400px] flex items-center justify-center">
              <Bars width={100} height={100} color="gray" />
            </div>
          )}
          {!loading && (
            <>
              <table className="rounded-2xl mt-4 mb-1 border border-gray-300 mx-auto min-w-[700px]">
                <thead className="px-2 bg-slate-200 border border-gray-300">
                  <tr className="rounded-2xl">
                    <th className="pt-9 pb-2">first name</th>
                    <th className="pt-9 pb-2">last name</th>
                    <th className="pt-9 pb-2">email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderUsers}</tbody>
              </table>
              <Pagination
                currentPage={page}
                onChangePage={onChangePage}
                totalPages={total_pages}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
