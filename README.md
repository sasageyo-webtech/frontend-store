#  Online Store System (Sasageyo) Frontend

## Member

- อติราช แก้ววิเชียร 6510451051
- ภัฎฎารินธ์ ไฝ่ทอง 6510450771
- อควอรัตน์ ธิติวุฒิกร 6510451026

## Setup

สร้างไฟล์ .env แล้วกำหนด ตามนี้

```bash

BASE_URL="http://localhost"

```

รันคำสั่งนี้สร้าง image และ container ของ docker ด้วย

```bash
# สำหรับการ run ครั้งแรก
docker-compose up --build

# สำหรับการ run เพื่อพัฒนา App
docker-compose up -d
```


## Development Server

Start the development server on `http://localhost:3000`:
