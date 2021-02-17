import firestore from "@react-native-firebase/firestore";

export const SET_DOCTORS_DATA = "SET_DOCTORS_DATA";

const setDoctorsDataAction = (user) => ({
  type: SET_DOCTORS_DATA,
  payload: { user },
});

export function setDoctorsData() {
  return async (dispatch) => {
    const colletion = await firestore().collection("especialties").get();
    if (!colletion.empty) {
      colletion.forEach((doc) => {
        console.log(doc.data());
      });
    }
  };
}
