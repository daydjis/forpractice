import {
    Article,
} from '@/entities/Article';

export interface ArticlesPageSchema  {
    isLoading?: boolean;
    error?: string | undefined;
    articles?: Array<Article> | [];
    view: any,
    hasMore: boolean,
    _inited: boolean,
    limit: number,
    sort: any,
    search: any,
    order: any,
    type: any,
}
