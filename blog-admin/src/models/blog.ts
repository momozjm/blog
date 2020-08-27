import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { addBlogApi } from '@/services/blog';

const Model = {
    namespace: 'blog',

    state: {
        status: undefined,
    },

    effects: {
        *addBlog({ payload, callback }, { call }) {
            const response = yield call(addBlogApi, payload)
            if (callback) callback(response)
        }
    },

    reducers: {
        saveBlog(state, { payload }) {
            return {
                ...state,
                status: payload.status
            };
        },
    },
};

export default Model;
