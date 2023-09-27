"use client";

import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RemoveUserModal from "./RemoveUserModal";
import PromoteAdminModal from "./PromoteAdminModal";
import NewUserModal from "./NewUserModal";

export default function ProfilePage() {
  const router = useRouter();

  const { user } = useUser();
  const { users } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                {user && (
                  <img
                    className="mx-auto h-20 w-20 rounded-full"
                    src={`https://ui-avatars.com/api/${user.username}/128/random`}
                    alt=""
                  />
                )}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user?.username}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {user?.role}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={async () => {
                  await axios.delete("/api/auth/logout");
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-6 py-5 text-center text-sm font-medium"
          >
            <span className="text-gray-900">{stat.value}</span>{" "}
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div> */}
      </div>

      <div className="mt-10 py-10 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users, their roles, and their privileges.
              </p>
            </div>
            {user?.privilege === 1 && (
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  onClick={() => setOpenNewModal(true)}
                >
                  Create a new user
                </button>
              </div>
            )}
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Privilege
                      </th>
                      {user?.privilege === 1 && (
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                        >
                          <span className="sr-only">Details</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(users || []).map((u) => (
                      <tr key={u.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {u.username}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {u.role}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {u.privilege ? "Admin" : "User"}
                        </td>
                        {user?.privilege === 1 && (
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8 space-x-4">
                            <>
                              {u.privilege === 0 && (
                                <button
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setOpenPromoteModal(true);
                                  }}
                                  className="text-teal-600 hover:text-teal-900"
                                >
                                  Promote to admin
                                  <span className="sr-only">
                                    , {u.username}
                                  </span>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setOpenRemoveModal(true);
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                                <span className="sr-only">
                                  , {user.username}
                                </span>
                              </button>
                            </>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RemoveUserModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        user={selectedUser}
      />

      <PromoteAdminModal
        open={openPromoteModal}
        setOpen={setOpenPromoteModal}
        user={selectedUser}
      />

      <NewUserModal open={openNewModal} setOpen={setOpenNewModal} />
    </>
  );
}
