import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export function setUserAction(navigation) {
  return async (dispatch) => {
    const { currentUser } = auth();
    if (!currentUser) {
      navigation.navigate("SignUp");
    } else {
      const doc = await firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();

      // await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(console.log("termine"));
      //   }, 3000);
      // });
      if (doc.exists) {
        const user = { ...doc.data() };
        if (!user.isNewUser) {
          user.userData.bornDate = user.userData.bornDate.toDate();
        }
        dispatch(setUser(user));
      }
    }
  };
}

export const UPDATE_PROFILEPHOTO_URL = "UPDATE_PROFILEPHOTO_URL";

export const updateProfilePhotoUrl = (url) => ({
  type: UPDATE_PROFILEPHOTO_URL,
  payload: { url },
});
export const LOGOUT = "LOGOUT";

export const logout = () => ({
  type: LOGOUT,
});
