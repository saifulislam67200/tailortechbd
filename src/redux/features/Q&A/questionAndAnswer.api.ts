import { api } from "@/redux/api/api";

const questionAndAnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createQuestion: builder.mutation({
            query: (payload) => ({
                url: `/questionAns/add-question`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["QuestionAndAnswer"],
        }),
        getQuestionsByProjectId: builder.query({
            query: (projectId: string) => ({
                url: `/questionAns/${projectId}`,
                method: "GET",
            }),
            providesTags: ["QuestionAndAnswer"],
        }),
    }),
});

export const { useCreateQuestionMutation, useGetQuestionsByProjectIdQuery } = questionAndAnswerApi;
