<template>
    <div class="add-item">
        <button v-if="!showForm" @click="showForm = true">Add Cafe</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Cafe</h4>
            <input type="text" placeholder="Cafe Name" required v-model="cafe_name" />
            <button>Add</button>
            <p v-if="isError">Could not execute operation</p>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { AddAddress } from "@/requestsBackend/cafe_address";
import {AddCafe} from "@/requestsBackend/cafe";

export default {
    setup() {
        const cafe_name = ref("");
        const showForm = ref(false);
        const isError = ref(false);
        const userStorage = useAuthUserStore();

        const handleSubmit = async () => {
            const address = {
                building_number: 1,
                street: "string",
                city: "string",
                district: "string",
                region: "string",
                postal_code: "1",
            };
            const newAddress = await AddAddress(address, userStorage.token);

            const cafeRecord = {
                address: {
                    id: newAddress.data.id,
                },
                cafe_name: cafe_name.value,
            };

            await AddCafe(cafeRecord, userStorage.token)
            showForm.value = false;
        };

        return {
            cafe_name,
            showForm,
            isError,
            handleSubmit,
        };

    },
};
</script>

<style scoped>
.add-item {
    text-align: center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
}
</style>
