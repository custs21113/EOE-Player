export const userAPI = (userId: number) => {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve(userId);
    }, 3000);
  })
}
