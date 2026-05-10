import type { Metadata } from "next";

// import NotificationCard from "@/components/cards/notification-card/NotificationCard";
// import NoResults from "@/components/common/page/NoResults";
// import PageTitle from "@/components/common/page/pageTitle";
// import TabFilter from "@/components/filter/tabFilter";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { getNotificationData, NOTIFICATION_LIMIT_PER_PAGE } from "@/helpers/notification.helpers";
// import { getPaginationItems } from "@/helpers/pagination.helpers";

// interface Props {
//   searchParams: Promise<{
//     filter?: string;
//     page?: string;
//   }>;
// }

// const filterValidValues = ["all", "active", "inactive"];

// export default async function Page({ searchParams }: Props) {
//   const queryParams = await searchParams;
//   const activeFilter = filterValidValues.includes(queryParams.filter || "")
//     ? queryParams.filter!
//     : "all";

//   const currentPage = Number(queryParams.page) || 1;
//   const { data: notifications, pagination } = await getNotificationData(
//     activeFilter,
//     currentPage,
//     "notification",
//     NOTIFICATION_LIMIT_PER_PAGE
//   );

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col gap-2.5">
//         <PageTitle>Notifications</PageTitle>
//         <div className="flex md:w-[443px]">
//           <TabFilter
//             tabs={filterValidValues}
//             value={activeFilter}
//             searchParam="filter"
//           />
//         </div>
//       </div>

//       <div className="space-y-2 md:space-y-4">
//         {notifications?.length > 0 ? (
//           notifications.map((item) => (
//             <NotificationCard
//               key={item._id}
//               title={item.title}
//               date={new Date(item.createdAt).toLocaleString()}
//               status={item.isUse}
//               description={item.content}
//             />
//           ))
//         ) : (
//           <NoResults className="py-28">
//             <p className="text-foreground/60 max-w-[178px] text-center">
//               No Results Found in{" "}
//               <span className="text-foreground">{activeFilter}</span>
//             </p>
//           </NoResults>
//         )}

//         {pagination && pagination.totalPages > 1 && (
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   className="bg-transparent"
//                   href={
//                     pagination.hasPrevPage
//                       ? `?filter=${activeFilter}&page=${pagination.prevPage}`
//                       : "#"
//                   }
//                 />
//               </PaginationItem>

//               {getPaginationItems(
//                 pagination.currentPage,
//                 pagination.totalPages
//               ).map((item, index) => (
//                 <PaginationItem key={index}>
//                   {typeof item === "string" ? (
//                     <PaginationEllipsis />
//                   ) : (
//                     <PaginationLink
//                       isActive={item === pagination.currentPage}
//                       href={`?filter=${activeFilter}&page=${item}`}
//                     >
//                       {item}
//                     </PaginationLink>
//                   )}
//                 </PaginationItem>
//               ))}

//               <PaginationItem>
//                 <PaginationNext
//                   className="bg-transparent"
//                   href={
//                     pagination.hasNextPage
//                       ? `?filter=${activeFilter}&page=${pagination.nextPage}`
//                       : "#"
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         )}
//       </div>
//     </div>
//   );
// }

export const metadata: Metadata = {
  title: "Notifications | GoodFriends",
  description: "Latest notifications and updates",
};

export default async function Page() {
  return <div></div>;
}
