import foodService from "$services/food.service";
import type { PageServerLoad } from "./$types";
import type { IFood } from "src/models/food.model";

// export const load: PageServerLoad = async () => {
//     let foods: IFood[] = [];

//     await foodService.getFood().then((response) => {
//         if (response.status === 200 && response.data) {
//             foods = [...new Set(response.data)];
//         }
//     });
    
//     if (foods.length > 12) {
//         foods = foods.slice(0, 12);
//         return;
//     }

//     return {
//         foods
//     }
// };