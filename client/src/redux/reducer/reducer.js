const initialState = {
    news: [],
    newsDetail: {},
    comment:[],
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
                news: payload, // Guardamos las noticias filtradas
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
				comment: [],
			};
        case 'SEARCH_NEWS':
			//functión para buscar en el estado
			return {
                ...state,
                filteredNews: state.news
                  ? state.news.filter((news) =>
                      news.title.toLowerCase().includes(payload.toLowerCase())
                    )
                  : [], // Si `allNews` es undefined, evitar el error devolviendo un array vacío
              };
        case 'GET_COMMENTS':
            return {
             ...state,
            comment: payload
      };

        case 'ADD_COMMENT':
            return {
                ...state,
                comment: Array.isArray(state.comment)? [...state.comment, payload] : [payload],
      };
      //PANEL ADMIN - AUTENTICACION ADMIN
      case "ADMIN_LOGIN_SUCCESS":
        return {
            ...state,
            user: payload.user,
            isAuthenticated: true,
            isAdmin: payload.isAdmin,
            error: null,
        };
    case "ADMIN_LOGIN_FAILURE":
        return {
            ...state,
            user: null,
            isAuthenticated: false,
            isAdmin: false,
        };

    case "LOGOUT_ADMIN":
      // Eliminar del estado y de localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        user: null,
        isAdmin: false,
        token: null,
      };
        
// NOTICIAS Y COMENTARIOS
        case 'ADD_NEWS':
            return {
            ...state,
            news: [...state.news, payload], // Agregar una noticia
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
                //ads: Array.isArray(payload) ? payload : [],
                ads: payload
            };
        case "GET_ADS_BANNER":
            return{
                ...state,
                //adsBanner: Array.isArray(payload) ? payload : [],
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
        
        default:
            return state;
    }
};

export default rootReducer;