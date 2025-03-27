<script setup>

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
    const response = await apiClient.put(`/orders/${orderId}/status`, { status: newStatus });
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
          <h2 class="text-lg font-semibold">Order #{{ order.order_id }}</h2>
          <button @click="toggleDetails(order.order_id)" class="text-blue-500">
            {{ expandedOrders[order.order_id] ? "Hide Details" : "View Details" }}
          </button>
        </div>
        <div>
            <p class="text-sm text-gray-500">Total Price: {{ order.total_price }} ฿</p>
            <p class="text-sm text-gray-500">Status: <span class="font-bold">{{ order.status || "PENDING" }}</span></p>
        </div>
        <div>
                      <!-- Change Status (Only if DELIVERED) -->
          <div class="mt-4">
            <label class="block text-sm">Change Status:</label>
            <select 
              @change="updateOrderStatus(order.order_id, $event.target.value)" 
              class="border p-2 w-full rounded"
              :disabled="order.status !== 'DELIVERED'"
            >
              <option v-for="status in ['SUCCEED', 'FAILED']" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
            <p v-if="order.status !== 'DELIVERED'" class="text-xs text-red-500 mt-1">
              You can only change the status when the order is DELIVERED.
            </p>
          </div>
        </div>

        
        <!-- Detail Section (Show when expanded) -->
        <div v-if="expandedOrders[order.order_id]" class="mt-3">
          
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
