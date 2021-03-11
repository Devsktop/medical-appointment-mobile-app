export const IS_LOADING_PROFILE_PHOTO = "IS_LOADING_PROFILE_PHOTO";

export const loadingProfilePhoto = (isLoading) => ({
  type: IS_LOADING_PROFILE_PHOTO,
  payload: { isLoading },
});

export const SHOW_MENU = "SHOW_MENU";

export const showMenu = (show) => ({
  type: SHOW_MENU,
  payload: { show },
});
