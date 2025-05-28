import { IQuestionAndAns } from "@/components/productDetails/QuestionAnswer";
import { api } from "@/redux/api/api";
import { IMeta } from "@/types/meta";
import { IQuestionsAndAns } from "@/types/QuestionAndAns";
import { generateQueryParams } from "@/utils";

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

    getAllQuestionAnswers: builder.query<
      { data: IQuestionsAndAns[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/questionAns?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["QuestionAndAnswer"],
    }),

    //  delete
    deleteQuestionAnswer: builder.mutation({
      query: (id: string) => ({
        url: `/questionAns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionAndAnswer"],
    }),

    updateAnswerById: builder.mutation<
      { data: IQuestionsAndAns },
      { payload: Partial<IQuestionsAndAns>; id: string }
    >({
      query: ({ id, payload }) => ({
        url: `/questionAns/${id}/answer`,
        method: "PATCH",
        body: {
          ...payload,
          _id: undefined,
        },
      }),
      invalidatesTags: ["QuestionAndAnswer"],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetQuestionsByProductIdQuery,
  useGetAllQuestionAnswersQuery,
  useDeleteQuestionAnswerMutation,
  useUpdateAnswerByIdMutation
} = questionAndAnswerApi;
