const initialState = {
    news: [],
    newsDetail: {},
    comments:[],
    users:[],
    category:[],
   // auth:{
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    error: null,
   // }
   ads: [],
   adsBanner: [],
   newsByCategory: {},
   noticiasRelacionadas: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // GET NOTICIAS
        case 'ALL_NEWS':
            return {
                ...state,
                news: payload,
            };
        case 'GET_NEWS_BY_CATEGORY':
            return {
                ...state,
            newsByCategory: {
            ...state.newsByCategory,
            [payload.categoryId]: payload.news,
        },
            };
        case 'DETAIL_NEWS':
            return {
                ...state,
                newsDetail: payload
            };
        case 'SET_NOTICIAS':
            return {
                ...state,
                news: payload,
            };    
        case 'CLEAR_MEMBER_DETAIL':
            return {
                ...state,
                memberDetail: {},
            };
        case 'CLEAR_COMMENTS':
                return {
                    ...state,
                    comments: [],
                };
        case 'CLEAR_PAGE':
            return {
                ...state,
                memberDetail: {},
                newsDetail: {},
                comments: [],
            };
        case 'SEARCH_NEWS':
            return {
                ...state,
                filteredNews: state.news
                  ? state.news.filter((news) =>
                      news.title.toLowerCase().includes(payload.toLowerCase())
                    )
                  : [],
              };
        case 'GET_COMMENTS':
            return {
             ...state,
            comments: payload
      };

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: Array.isArray(state.comment)? [...state.comment, payload] : [payload],
      };
      //PANEL ADMIN - AUTENTICACION ADMIN
      case "LOGIN_SUCCESS":
        return {
            ...state,
            user: payload.user,
            isAuthenticated: true,
            isAdmin: payload.isAdmin,
            error: null,
        };
    case "LOGIN_FAIL":
        return {
            ...state,
            user: null,
            isAuthenticated: false,
            isAdmin: false,
        };

    case "LOGOUT_ADMIN":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        user: null,
        isAdmin: false,
        token: null,
      };
        
        case 'ADD_NEWS':
            return {
            ...state,
            news: [...state.news, payload],
        };

        case 'EDIT_NEWS':
            return {
            ...state,
            news: state.news.map(newsItem =>
                newsItem.id === payload.id ? { ...newsItem, ...payload } : newsItem
            ),
        };

        case 'DELETE_NEWS':
            return {
            ...state,
            news: state.news.filter(newsItem => newsItem.id !== payload),
        };
        case 'DELETE_COMMENT':
            return {
            ...state,
            comments: state.comment.filter(comment => comment.id !== payload)
        };
        case 'CREATE_USER':
            return {
                ...state,
                user:  payload
            }
        case 'GET_USERS':
            return { ...state, users: payload };

        case 'DELETE_USER':
            return { ...state, users: state.users.filter(user => user.id !== payload) };

        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === payload.id ? payload : user
                ),
            };
        case "GET_CATEGORIES":
            return { 
                ...state, 
                 category: payload 
            };

        case "UPDATE_CATEGORY":
            return { 
                ...state, 
                categories: state.category.map(cat => 
                cat.id === payload.id ? payload : cat
                )
            };

        case "DELETE_CATEGORY":
            return { 
                ...state, 
                categories: state.category.filter(cat => cat.id !== payload) 
            };

        case "GET_ADS":
            return{
                ...state,
                ads: payload
            };
        case "GET_ADS_BANNER":
            return{
                ...state,
                adsBanner: payload
            };
        case "CREATE_ADS":
            return {
                ...state,
                ads: payload
            };
        case "DELETE_ADS":
            return {
                ...state,
                ads: state.ads.filter(ad => ad.id !== payload)
            };
        case "CREATE_ADS_BANNER":
            return {
                ...state,
                adsBanner: payload
            };
        case "DELETE_ADS_BANNER":
            return {
                ...state,
                adsBanner: state.adsBanner.filter((ad) => ad.id !==payload)
            };
        case 'GET_RELATED_NEWS':
            return {
                ...state,
                noticiasRelacionadas: payload,
            };
        
        default:
            return state;
    }
};

export default rootReducer;
