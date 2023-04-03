import { useRouter, useSegments } from "expo-router";
import { Store, registerInDevtools } from "pullstate";

// const segments = useSegments();
// const router = useRouter();

// (function useProtectedRoute(user) {

  
//     React.useEffect(() => {
//       const inAuthGroup = segments[0] === "(auth)";
  
//       if (
//         // If the user is not signed in and the initial segment is not anything in the auth group.
//         !user &&
//         !inAuthGroup
//       ) {
//         // Redirect to the sign-in page.
//         router.replace("/login");
//       } else if (user && inAuthGroup) {
//         // Redirect away from the sign-in page.
//         router.replace("/");
//       }
//     }, [user, segments]);
//   })();

export const AuthStore = new Store({
  isLoggedIn: false,
});

registerInDevtools({AuthStore});