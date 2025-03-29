import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    userInfo: null as IUser | null,
    isLoggedIn: false,
    carts: ref([]),
  }),
  
  actions: {
    login(user: IUser) {
      this.userInfo = user
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(user)) // เก็บข้อมูลใน localStorage
    },
    logout() {
      this.userInfo = null
      this.isLoggedIn = false
      localStorage.removeItem('user') // ลบข้อมูลจาก localStorage
    },
    loadUser() {
      const user = localStorage.getItem('user')
      if (user) {
        this.userInfo = JSON.parse(user) as IUser
        this.isLoggedIn = true
      }
    },
    
  }
})
