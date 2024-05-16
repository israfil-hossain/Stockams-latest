// // adminQueryClient.js
// import { QueryClient } from "@tanstack/react-query";
// import adminAPI from "./adminAPI";


// // Move adminQueryClient creation here
// const defaultQueryFn = async ({ queryKey, signal }) => {
//     const { data } = await adminAPI(`${queryKey[0]}`, { signal });
//     return data;
//   };
  
//   const adminQueryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false,
//         refetchOnmount: false,
//         refetchOnReconnect: false,
//         retry: 1,
//         staleTime: 5 * 1000,
//         queryFn: defaultQueryFn,
//       },
//     },
//   });

// export default adminQueryClient;

