"use client";

import useStats from "@/hooks/useStats";
import useUsvs from "@/hooks/useUsvs";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardPage() {
  const { stats } = useStats();

  const statsDisplay = [
    {
      id: 1,
      name: "Total Users",
      stat: stats?.totalUsers || "-",
      icon: UsersIcon,
      href: "/users",
    },
    {
      id: 2,
      name: "Total USVs",
      stat: stats?.totalUsvs || "-",
      icon: MapPinIcon,
      href: "/usvs",
    },
    {
      id: 3,
      name: "Total Data Points",
      stat: stats?.totalDataPoints || "-",
      icon: CursorArrowRaysIcon,
      href: "/usvs",
    },
  ];

  return (
    <div>
      {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3> */}

      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statsDisplay.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-teal-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href={item.href}
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
