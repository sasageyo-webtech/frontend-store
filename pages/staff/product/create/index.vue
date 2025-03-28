<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


definePageMeta({ layout: 'staff' });

const showSuccessCreateProduct = ref(false);
const loading = ref(false);
const categories = ref([]);
const brands = ref([]);
const errorMessage = ref('');
const selectedFiles = ref([]);
const useRoute = useRouter()

// ข้อมูลผลิตภัณฑ์ใหม่
const newProduct = ref({
  name: '',
  description: '',
  price: '',
  stock: 0,
  category_id: '',
  brand_id: '',
  image_products: [],
  rating: 0,
  accessibility: 'PUBLIC',
});

// URL API
const API_BASE = 'http://localhost/api/products';
const CATEGORY_API_BASE = 'http://localhost/api/categories';
const BRAND_API_BASE = 'http://localhost/api/brands';
const IMAGE_UPLOAD_API = 'http://localhost/api/products/images'; // API สำหรับการอัปโหลดภาพ

// ดึงข้อมูลหมวดหมู่
const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_BASE);
    categories.value = response.data.data;
  } catch (error) {
    console.error('Category Fetch Error:', error.message);
    errorMessage.value = 'Failed to fetch categories.';
  }
};

// ดึงข้อมูลแบรนด์
const fetchBrands = async () => {
  try {
    const response = await axios.get(BRAND_API_BASE);
    brands.value = response.data.data;
  } catch (error) {
    console.error('Brand Fetch Error:', error.message);
    errorMessage.value = 'Failed to fetch brands.';
  }
};

// ฟังก์ชันอัปโหลดภาพ
const uploadImage = async (productId, imageFile) => {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('product_id', productId);

  try {
    const response = await axios.post(IMAGE_UPLOAD_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data; // Assuming the response contains the uploaded image URL or filename
  } catch (error) {
    console.error('Image Upload Error:', error.message);
    errorMessage.value = 'Failed to upload image.';
    return null;
  }
};

// สร้างผลิตภัณฑ์
const createProduct = async () => {
  if (!newProduct.value.name.trim() || !newProduct.value.price) {
    errorMessage.value = 'Please fill in required fields.';
    return;
  }

  try {
    const response = await axios.post(API_BASE, newProduct.value);
    if (response.status === 201) {
      const productId = response.data.data.id;
      
      // อัปโหลดภาพทีละไฟล์
      for (let i = 0; i < selectedFiles.value.length; i++) {
        const uploadedImage = await uploadImage(productId, selectedFiles.value[i]);
        if (uploadedImage) {
          newProduct.value.image_products.push(uploadedImage); // เก็บข้อมูลภาพที่อัปโหลด
        }
      }

      // อัปเดตข้อมูลผลิตภัณฑ์หลังจากอัปโหลดภาพ
      await axios.put(`${API_BASE}/${productId}`, newProduct.value);

      showSuccessCreateProduct.value = true;
      useRoute.push("/staff/product")
    } else {
      errorMessage.value = response.data.message || 'Failed to create product.';
    }
  } catch (error) {
    console.error('Create Product Error:', error.message);
    errorMessage.value = error.message;
  }
};

// โหลดข้อมูลเมื่อหน้าโหลดเสร็จ
onMounted(() => {
  fetchCategories();
  fetchBrands();
});
</script>

<template>
  <div class="mt-10 mx-16">
    <h1 class="text-2xl font-bold mb-4">Create Product</h1>

    <!-- Error message -->
    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

    <!-- Success message -->
    <div v-if="showSuccessCreateProduct" class="text-green-500 mb-4">
      Product created successfully!
    </div>

    <div class="bg-white p-4 shadow-md rounded">
      <form @submit.prevent="createProduct">
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold">Product Name</label>
          <input
            type="text"
            id="name"
            v-model="newProduct.name"
            class="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold">Description</label>
          <textarea
            id="description"
            v-model="newProduct.description"
            class="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product description"
            rows="4"
            required
          ></textarea>
        </div>

        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label for="price" class="block text-sm font-semibold">Price</label>
            <input
              type="number"
              id="price"
              v-model="newProduct.price"
              class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter product price"
              required
            />
          </div>
          <div class="w-1/2">
            <label for="stock" class="block text-sm font-semibold">Stock</label>
            <input
              type="number"
              id="stock"
              v-model="newProduct.stock"
              class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter stock quantity"
              required
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="category_id" class="block text-sm font-semibold">Category</label>
          <select
            id="category_id"
            v-model="newProduct.category_id"
            class="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="brand_id" class="block text-sm font-semibold">Brand</label>
          <select
            id="brand_id"
            v-model="newProduct.brand_id"
            class="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="rating" class="block text-sm font-semibold">Rating</label>
          <input
            type="number"
            id="rating"
            v-model="newProduct.rating"
            class="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product rating"
            min="0"
            max="5"
            required
          />
        </div>

        <div class="mb-4">
          <label for="accessibility" class="block text-sm font-semibold">Accessibility</label>
          <select
            id="accessibility"
            v-model="newProduct.accessibility"
            class="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="image_products" class="block text-sm font-semibold">Product Images</label>
          <input
            type="file"
            id="image_products"
            @change="selectedFiles = $event.target.files"
            multiple
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div class="flex gap-4 justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            :disabled="loading"
          >
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
