<template>
    <div class="add-item">
        <button v-if="!showForm" @click="showForm = true">Add Meal</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Meal</h4>
            <input type="text" placeholder="Meal Name" required v-model="meal_name"/>
            <input type="number" placeholder="Price" required v-model="price"/>
            <input type="number" placeholder="Amount" required v-model="amount"/>
            <input type="text" placeholder="Category" required v-model="category_name"/>
            <input type="text" placeholder="Units" required v-model="unit"/>
            <button>Add</button>
            <p v-if="isError">Could not execute operation</p>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {AddCategory} from "@/requestsBackend/menuRequest/category";
import {AddMeal} from "@/requestsBackend/menuRequest/meal";

export default {
    setup() {
        const meal_name = ref("");
        const price = ref("");
        const amount = ref("");
        const category_name = ref("");
        const unit = ref("");
        const showForm = ref(false);
        const isError = ref(false);
        const userStorage = useAuthUserStore();

        const handleSubmit = async () => {
            const category = {
                //TODO uniqueness of category name will be ruined at second insert
                category_name: category_name.value,
                unit: unit.value,
            };
            const newCategory = await AddCategory(category, userStorage.token);

            const mealRecord = {
                category: {
                    id: newCategory.data.id,
                },
                meal_name: meal_name.value,
                price: price.value,
                amount: amount.value,
            };

            await AddMeal(mealRecord, userStorage.token)
            showForm.value = false;
        };

        return {
            meal_name,
            price,
            amount,
            category_name,
            unit,
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
