import {
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../..';
import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {SortOrder} from "@/shared/types/sort";

export const getArticles = (
    (state: StateSchema) => state.articlesPage?.articles
);

const initialState: ArticlesPageSchema = {
    articles: [],
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
}
const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state: ArticlesPageSchema, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state: ArticlesPageSchema, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticlesList.rejected, (state: ArticlesPageSchema, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
    articlesPageSlice;
