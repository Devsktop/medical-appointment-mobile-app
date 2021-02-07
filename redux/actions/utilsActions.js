export const IS_LOADING_PROFILE_PHOTO = "IS_LOADING_PROFILE_PHOTO";

export const loadingProfilePhoto = (isLoading) => ({
  type: IS_LOADING_PROFILE_PHOTO,
  payload: { isLoading },
});
