import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import useMaintenances from "@/hooks/useMaintenances";
import moment from "moment";
import useUsvs from "@/hooks/useUsvs";
import useUsers from "@/hooks/useUsers";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewMaintenanceModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);

  const { mutate } = useMaintenances();
  const { usvs } = useUsvs();
  const { users } = useUsers();

  const [usv, setUsv] = useState<any>(null);
  const [repairJob, setRepairJob] = useState("");
  const [actions, setActions] = useState("");
  const [timestamp, setTimestamp] = useState(
    moment().format("YYYY-MM-DD[T]HH:mm")
  );
  const [maintenancePersonnel, setMaintenancePersonnel] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function save() {
    try {
      setIsSaving(true);
      await axios.post("/api/maintenances", {
        usv_id: usv.id,
        repair_job: repairJob,
        actions: actions,
        maintenance_personnel_id: maintenancePersonnel.id,
        timestamp: moment(timestamp).format(),
      });
      mutate();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PencilSquareIcon
                      className="h-6 w-6 text-teal-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add maintenance
                    </Dialog.Title>
                    <div className="mt-6 space-y-6">
                      <div>
                        <label
                          htmlFor="usv"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          USV
                        </label>
                        <div className="mt-2">
                          <Menu
                            as="div"
                            className="relative inline-block text-left w-full"
                          >
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <p className="flex-1 text-left">
                                  {usv?.name || "-"}
                                </p>
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {usvs?.map((usv) => (
                                    <Menu.Item key={usv.id}>
                                      {({ active }) => (
                                        <button
                                          onClick={() => setUsv(usv)}
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full"
                                          )}
                                        >
                                          {usv.name}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="repair-job"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Repair job
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="repair-job"
                            id="repair-job"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Lorem Ipsum"
                            aria-describedby="repair-job"
                            value={repairJob}
                            onChange={(event) =>
                              setRepairJob(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="actions"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Actions
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="actions"
                            id="actions"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Lorem Ipsum"
                            aria-describedby="actions"
                            value={actions}
                            onChange={(event) => setActions(event.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="timestamp"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Timestamp
                        </label>
                        <div className="mt-2">
                          <input
                            type="datetime-local"
                            name="timestamp"
                            id="timestamp"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Lorem Ipsum"
                            aria-describedby="timestamp"
                            value={timestamp}
                            onChange={(event) =>
                              setTimestamp(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maintenancePersonnel"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Maintenance personnel
                        </label>
                        <div className="mt-2">
                          <Menu
                            as="div"
                            className="relative inline-block text-left w-full"
                          >
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <p className="flex-1 text-left">
                                  {maintenancePersonnel?.username || "-"}
                                </p>
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {users?.map((user) => (
                                    <Menu.Item key={user.id}>
                                      {({ active }) => (
                                        <button
                                          onClick={() =>
                                            setMaintenancePersonnel(user)
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full"
                                          )}
                                        >
                                          {user.username}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto disabled:opacity-50"
                    onClick={save}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
