"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Input from "@/components/ui/Input";
import { admin as adminNavLinks } from "@/utils/dashboardNavLinks"; // adjust path if needed
import { HiChevronRight } from "react-icons/hi";
import UserDropdown from "../Navbar/UserDropdown";

interface SearchableLink {
  label: string;
  path: string | undefined;
  breadcrumb: string;
}

const DashboardHeader = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Flatten the admin nav links with breadcrumb info
  const searchableLinks = useMemo(() => {
    const links: SearchableLink[] = [];

    for (const item of adminNavLinks) {
      if (item.children) {
        for (const child of item.children) {
          links.push({
            label: child.label,
            path: child.path,
            breadcrumb: `${item.label} > ${child.label}`,
          });
        }
      } else {
        links.push({
          label: item.label,
          path: item.path,
          breadcrumb: item.label,
        });
      }
    }

    return links;
  }, []);

  const filteredLinks = useMemo(() => {
    return searchableLinks.filter((link) => link.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, searchableLinks]);

  return (
    <div className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between border-b border-border-muted bg-white px-4">
      <div className="w-[300px] shrink-0">
        <Image src="/images/logos/logo-text.png" alt="logo" width={150} height={150} />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="relative flex w-full max-w-[400px] items-center">
          <div className="flex w-full items-center rounded border border-muted/50 pr-2">
            <Input
              className="border-none bg-transparent py-2"
              placeholder="Search in dashboard"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <BsSearch />
          </div>

          {query && (
            <div className="absolute top-[48px] left-0 z-50 max-h-[200px] w-full overflow-auto rounded bg-white shadow-md">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <div
                    key={link.path}
                    onClick={() => {
                      if (link.path) {
                        router.push(link.path);
                      }
                      setQuery("");
                    }}
                    className="flex items-center justify-between gap-[5px] px-4 py-2 hover:bg-dashboard/5"
                  >
                    <div className="flex w-full cursor-pointer flex-col">
                      <span className="cursor-pointer font-[600] text-dashboard">{link.label}</span>
                      <span className="text-[12px] text-primary/50">{link.breadcrumb}</span>
                    </div>
                    <HiChevronRight />
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
        <UserDropdown />
      </div>
    </div>
  );
};

export default DashboardHeader;
