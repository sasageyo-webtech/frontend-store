<script setup>
    definePageMeta({
        layout: 'staff',
    });

    const orderId = useRoute().params.order_id;
    const orderDetails = ref(null);
    const paymentImage = ref('');

    const fetchOrderDetails = async () => {
        try {
            const response = await apiClient.get(`/orders/${orderId}`);
            orderDetails.value = response.data.data;
            paymentImage.value = orderDetails.value.payment.image_receipt_path;
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    onMounted(() => {
        fetchOrderDetails();    
    });
</script>

<template>
    <div class="order-detail">
        <div v-if="orderDetails">
            <div class="grid grid-cols-2 gap-48">
                <div>
                    <h1 class="text-2xl font-bold mb-4">Order #{{ orderDetails.order_id }} Details</h1>
                    <p><strong>Status:</strong> {{ orderDetails.status }}</p>
                    <p><strong>Total Price:</strong> {{ orderDetails.total_price }} ฿</p>
                    <p><strong>Payment Method:</strong> {{ orderDetails.payment.method }}</p>
                    <div v-if="orderDetails.products.length > 0">
                        <h3 class="mt-6">Products Ordered</h3>
                        <div v-for="product in orderDetails.products" :key="product.product_id" class="product-item mb-4">
                        <img :src="product.image_path" alt="Product image" class="w-16 h-16 object-cover"/>
                        <div class="ml-4">
                            <p><strong>{{ product.name }}</strong></p>
                            <p>Quantity: {{ product.quantity }}</p>
                            <p>Total Price: {{ product.total_price }} ฿</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div v-if="paymentImage">
                    <h3 class="text-2xl font-bold mb-4" >Payment Receipt</h3>
                    <img :src="paymentImage" alt="Payment receipt" 
                    class="w-full max-w-md mt-4"/>
                </div>
            </div>
        </div>
        
        <div v-else>
            <p>Loading order details...</p>
        </div>
    </div>
</template>

<style scoped>
    .order-detail {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    }

    .product-item {
    display: flex;
    align-items: center;
    }

    .product-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    }

    .product-item div {
    margin-left: 20px;
    }
</style>
