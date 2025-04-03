<script setup>
import { ref, onMounted, computed } from "vue";

const userStore = useUser(); // ดึงข้อมูลผู้ใช้
const orders = ref([]);
const selectedStatus = ref(""); // สถานะที่ใช้กรอง
const expandedOrders = ref({}); // เก็บสถานะเปิด/ปิดของแต่ละออเดอร์
const statusOptions = ["PENDING", "APPROVED", "DELIVERED", "SUCCEED", "FAILED"]; // รายการสถานะทั้งหมด

const fetchOrders = async () => {
  try {
    const response = await apiClient.get(`/customers/orders/${userStore.userInfo.customer_id}`);
    orders.value = response.data.data; 
    console.log("Orders:", orders.value);
    // กำหนดค่าเริ่มต้นให้ทุกออเดอร์ปิดอยู่
    orders.value.forEach(order => {
      expandedOrders.value[order.order_id] = false;
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

// ฟังก์ชันเปลี่ยนสถานะออเดอร์ (ทำได้เฉพาะ DELIVERED -> SUCCEED/FAILED)
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await apiClient.patch(`/orders/${orderId}`, { status: newStatus });
    console.log("Status updated:", response.data);
    await fetchOrders(); // รีโหลดข้อมูลใหม่หลังเปลี่ยนสถานะ
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

// ฟังก์ชัน Toggle เปิด/ปิดรายละเอียดสินค้า
const toggleDetails = (orderId) => {
  expandedOrders.value[orderId] = !expandedOrders.value[orderId];
};

// กรองออเดอร์ตามสถานะที่เลือก
const filteredOrders = computed(() => {
  return selectedStatus.value
    ? orders.value.filter(order => order.status === selectedStatus.value)
    : orders.value;
});

// กำหนดสีของสถานะ
const statusClasses = {
  PENDING: "text-gray-500 bg-gray-200",
  APPROVED: "text-blue-500 bg-blue-200",
  DELIVERED: "text-yellow-500 bg-yellow-200",
  SUCCEED: "text-green-500 bg-green-200",
  FAILED: "text-red-500 bg-red-200"
};

onMounted(fetchOrders);
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">My Orders</h1>

    <!-- Filter Section -->
    <div class="mb-4">
      <label class="mr-2">Filter by Status:</label>
      <select v-model="selectedStatus" class="border p-2 rounded">
        <option value="">All</option>
        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
      </select>
    </div>

    <!-- Order List -->
    <div class="grid grid-cols-1 gap-6">
      <div v-for="order in filteredOrders" :key="order.order_id" class="bg-white p-4 rounded shadow">
        
        <!-- Header Order -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Order {{ order.order_id }}</h2>
          <p class="text-sm font-bold px-2 py-1 rounded inline" :class="statusClasses[order.status]">
            Status: {{ order.status || "PENDING" }}
          </p>

          <div>
         

        </div>

          <button @click="toggleDetails(order.order_id)" class="text-blue-500">
            {{ expandedOrders[order.order_id] ? "Hide Details" : "View Details" }}
          </button>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Price: {{ order.total_price }} ฿</p>

        </div>
        <div class="space-y-2">
          <!-- Change Status (Only if DELIVERED) -->
          <div v-if="order.status === 'DELIVERED'">
            <p class="font-semibold pt-5">Change Order Status:</p>
            <div class="flex space-x-2">
              <button
                @click="updateOrderStatus(order.order_id, 'SUCCEED')"
                class="btn btn-outline btn-success text-white px-4 py-2 rounded hover:text-white"
              >
                Mark as Succeed
              </button>
              <button
                @click="updateOrderStatus(order.order_id, 'FAILED')"
                class="btn btn-outline btn-error text-white px-4 py-2 rounded"
              >
                Mark as Failed
              </button>
            </div>
          </div>
          <p v-else class="text-xs text-blue-800 mt-1">
            You can only change the status when the order is DELIVERED.
          </p>
        </div>

        <!-- Change Status Section -->
        <div v-if="expandedOrders[order.order_id]" class="mt-4">
          
          <!-- Product List -->
          <div class="mt-3 space-y-2">
            <h3 class="font-semibold">Products:</h3>
            <div v-for="product in order.products" :key="product.product_id" class="flex items-center border-b pb-2">
              <img :src="product.image_path" alt="Product Image" class="w-16 h-16 object-cover rounded-md">
              <div class="ml-3">
                <p class="text-sm font-semibold">{{ product.name }}</p>
                <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p>
                <p class="text-xs text-gray-600">Total: {{ product.total_price }} ฿</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
</style>