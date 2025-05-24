import { IQuestionAndAns } from "@/components/productDetails/QuestionAnswer";
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
    getQuestionsByProductId: builder.query<{ data: IQuestionAndAns[] }, string>({
      query: (productId: string) => ({
        url: `/questionAns/${productId}`,
        method: "GET",
      }),
      providesTags: ["QuestionAndAnswer"],
    }),
  }),
});

export const { useCreateQuestionMutation, useGetQuestionsByProductIdQuery } = questionAndAnswerApi;
