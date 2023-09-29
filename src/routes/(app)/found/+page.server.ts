import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
    return {
        foods: [...new Set(["manga", "laranja", "sal", "macarrão", "trigo", "miojo", "água", "tomate", "pêra", "salsisha", "alface", "farinha", "beterraba", "batata", "açafrão"])],
    }
};