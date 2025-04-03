import { defineStore } from 'pinia'
import type { User } from 'types/users'

export const useUser = defineStore('user', {
  state: () => ({
    userInfo: null as User | null,
    isLoggedIn: false,
    carts: ref([]),
  }),
  
  actions: {
    login(user: User) {
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
        this.userInfo = JSON.parse(user) as User
        this.isLoggedIn = true
      }
    },
    
  }
})
