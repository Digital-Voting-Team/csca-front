<template>
    <h1 id="det_view">Detail View</h1>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="meal_item !== undefined" class="list-details">
        <div class="list-info">
            <div class="cover">
                <img src="@/assets/img.png" alt=""/>
            </div>
            <h2>{{ meal_item.meal_name }}</h2>
        </div>

        <div class="meal-list">
            <div class="single-meal">
                <h3>Price: {{ meal_item.price }}</h3>
            </div>
            <div class="single-meal">
                <p>Amount: {{ meal_item.amount }} {{ meal_item.category.unit }}</p>
            </div>
            <div class="single-meal">
                <p>Category: {{ meal_item.category.category_name }}</p>
            </div>
            <button v-if="userStorage.position > 3" @click="handleDelete">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useAuthUserStore} from "@/stores/auth-user";
import {ref} from "vue";
import {DeleteMealById, GetMealById} from "@/requestsBackend/menuRequest/meal";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {MealRecord} from "@/js/records/menuRecords/meal.record";

export default {
    name: "MealDetails",
    props: ["id"],
    setup(props) {
        const router = useRouter();
        const userStorage = useAuthUserStore();
        const error = ref(false);
        const meal_item = ref(undefined);
        const accessLevel = ref(null);

        const load = async () => {
            try {
                let response = await GetMealById(userStorage.token, props.id)

                if (response !== undefined) {
                    meal_item.value = new MealRecord(response.data, response.included)
                }
            } catch (err) {
                ErrorHandler.processWithoutFeedback(error)
            }
        }

        load()
        accessLevel.value = userStorage.position

        const handleDelete = async () => {
            await DeleteMealById(userStorage.token, props.id);
            await router.push({name: "MealView"});
        };

        return {error, handleDelete, userStorage, meal_item, accessLevel};
    }
}
</script>

<style scoped>
#det_view {
    margin-bottom: 20px;
}

.list-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    margin-bottom: 100px;
}

.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
}

.list-info {
    text-align: center;
}

.list-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}

.list-info p {
    margin-bottom: 20px;
}

.property {
    color: #999;
    padding: 2px;
}

.description {
    text-align: left;
}

.single-meal {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>
