export interface User {
  user_id: number;
  username: string;
  firstname: string;
  lastname: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null; // สามารถกำหนดค่าเป็น 'MALE', 'FEMALE', หรือ 'OTHER'
  citizen_code: string | null;
  birthdate: string | null; // หรือ Date ถ้าต้องการใช้เป็นวันที่
  email: string;
  phone_number: string | null;
  image_path: string | null;
  role: UserRole; // สามารถเพิ่มบทบาทอื่น ๆ ได้
  token: string;
};

export enum UserRole {
    CUSTOMER = "CUSTOMER",
    STAFF = "STAFF"
}