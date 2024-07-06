export const navigateBack = (reload) => () => {
  console.log(reload)
  if (reload) {
    window.location = document.referrer
  } else {
    window.history.go(-1);
  }
}