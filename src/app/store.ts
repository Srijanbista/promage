import { configureStore } from "@reduxjs/toolkit";
import LoaderReducer from "./(slice)/LoaderSlice";
import ProjectReducer from "./(slice)/ProjectSlice";

export const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    projects: ProjectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
