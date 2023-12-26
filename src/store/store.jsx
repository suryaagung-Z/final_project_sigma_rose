import { configureStore } from "@reduxjs/toolkit";

import moduleCourses from "./moduleCourses";

export const store = configureStore({
    reducer: {
        module: moduleCourses,
    }
});


export default store;