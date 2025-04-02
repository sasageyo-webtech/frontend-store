# ใช้ Node.js LTS เวอร์ชันล่าสุดที่รองรับ Nuxt
FROM node:22.12.0-alpine 

# กำหนด Working Directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json เพื่อให้ติดตั้ง dependencies ก่อน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดของโปรเจค
COPY . .

# สร้างไฟล์ build สำหรับ production
RUN npm run build

# เปิดพอร์ตที่ Nuxt ใช้ (เริ่มต้นคือ 3000)
EXPOSE 3000

# คำสั่งสำหรับเริ่มต้น Container
CMD ["npm", "run", "dev"]
