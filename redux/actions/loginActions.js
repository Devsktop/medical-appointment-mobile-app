export const IS_LOGIN = "IS_LOGIN";

const isLogin = () => ({
  type: IS_LOGIN,
});

export const CORRECT_LOG = "CORRECT_LOG";

const correctLog = (idUser, username) => ({
  type: CORRECT_LOG,
  payload: { idUser, username },
});

export const BAD_LOG = "BAD_LOG";

const badLog = () => ({
  type: BAD_LOG,
});

export function login({ user, pass }) {
  return (dispatch) => {
    dispatch(isLogin());
    // HACER FETCH A LA BDD
    const config = {
      method: "POST",
      body: JSON.stringify({ user, password: pass }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch("http://localhost:3500/api/login", config)
      .then((res) => res.json())
      .then(({ idUser, username }) => {
        if (!idUser) dispatch(badLog());
        else {
          dispatch(correctLog(idUser, username));
        }
      });
  };
}

export const RESET_ATTEMPTS = "RESET_ATTEMPTS";

export const resetAttempts = () => ({
  type: RESET_ATTEMPTS,
});

export const DATA_LOADED = "DATA_LOADED";

const dataLoadedAction = () => ({
  type: DATA_LOADED,
});

// Call initial app data and dispatch it an then set dataLoaded true
export function fetchData() {
  return (dispatch) =>
    // HACER FETCH A LA BDD
    new Promise((resolve) => setTimeout(resolve, 0)).then(async () => {
      // Getting dahsboard initial data
      //   const students = await fetchStudents();
      //   await dispatch(students);

      // Data loaded set to true
      await dispatch(dataLoadedAction());
    });
}

export const LOG_OUT = "LOG_OUT";

export function logOut() {
  return (dispatch) => {
    dispatch({ type: "CLOSE_MENU" });
    dispatch({ type: "LOG_OUT" });
  };
}

export const CREATE_DB = "CREATE_DB";

export const createDb = () => ({
  type: CREATE_DB,
});
