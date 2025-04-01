import Swal from 'sweetalert2';

const swalWithDefaults = Swal.mixin({
    confirmButtonColor: '#3085d6',  // ปรับปุ่ม Confirm เป็นสีน้ำเงิน
    cancelButtonColor: '#d33',      // ปรับปุ่ม Cancel เป็นสีแดง
    timer: 3000,                    // ตั้งเวลาให้ปิดอัตโนมัติหลัง 3 วินาที
    showCancelButton: false,         // ปิดปุ่ม Cancel โดย Default
  });

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: swalWithDefaults
    }
  };
});
