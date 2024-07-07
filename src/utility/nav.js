export const navigateBack = (reload) => () => {
  if (reload) {
    window.location=document.referrer
  } else {
    window.history.go(-1);
  }
}