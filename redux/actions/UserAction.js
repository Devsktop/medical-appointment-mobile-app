import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const SET_USER = "SET_USER";

const setUser = (user) => ({
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
      if (doc.exists) {
        dispatch(setUser(doc.data()));
      }
    }
  };
}
export const UPDATE_PROFILEPHOTO_URL = "UPDATE_PROFILEPHOTO_URL";

export const updateProfilePhotoUrl = (url) => ({
  type: UPDATE_PROFILEPHOTO_URL,
  payload: { url },
});
