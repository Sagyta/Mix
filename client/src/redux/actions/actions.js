import axios from "axios";
import swal from "sweetalert2";

import { 
    ALL_NEWS,
    DETAIL_NEWS,
    CLEAR_PAGE,
    CLEAR_MEMBER_DETAIL,
    CLEAR_COMMENTS,
    DELETE_COMMENT,
	GET_COMMENTS,
	ADD_COMMENT,
	CREATE_USER,
	GET_USERS,
	ADD_NEWS,
	CREATE_CATEGORY,
	GET_CATEGORIES,
	DELETE_CATEGORY,
	GET_ADS,
	CREATE_ADS,
	GET_ADS_BANNER,
	DELETE_ADS,
	CREATE_ADS_BANNER, 
	DELETE_ADS_BANNER,
	GET_NEWS_BY_CATEGORY,
	SET_NOTICIAS,
	GET_RELATED_NEWS,
} from './DataTypes';

const adsUrl = "http://localhost:3001/ads";
const bannerUrl = "http://localhost:3001/adsbanner";


// Noticias
export function getNews(){
    return async (dispatch) =>{
        try{
            let {data} = await axios.get("http://localhost:3001/news");
            //console.log('Noticias recibidas:', data);
            return dispatch({ type: ALL_NEWS, payload: data});
        }catch (error){
           // ✅ Guardarlo en otra variable
            console.error("Error al encontrar la noticia", error);
        }
    };
}

export const newsByCategory = (categoryId) => async (dispatch) => {
    try {
       // console.log(`🔍 Obteniendo noticias para categoría: ${categoryId}`);
        const { data } = await axios.get(`http://localhost:3001/news/category/${categoryId}`);

       // console.log(`✅ Noticias recibidas para categoría ${categoryId}:`, data);

        dispatch({
            type: GET_NEWS_BY_CATEGORY,
            payload: { categoryId, news: data },
        });
    } catch (error) {
        console.error(`❌ Error obteniendo noticias para categoría ${categoryId}:`, error);
    }
};

export function detailNews(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`http://localhost:3001/news/${id}`
			);
			dispatch({
				type: DETAIL_NEWS,
				payload: data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function buscarNoticias(query) {
	return async (dispatch) => {
	  try {
		// Hacemos la solicitud al backend con el parámetro 'title'
		const response = await fetch(`http://localhost:3001/news/?title=${query}`);
		const data = await response.json();
  
		if (data.length === 0) {
		  // Si no se encontraron noticias, mostramos un mensaje de alerta
		  swal.fire({
			title: '¡No se encontraron noticias!',
			text: 'No hay noticias con ese título.',
			icon: 'info',
		  });
		}
  
		// Si encontramos noticias, las actualizamos en el estado
		dispatch({ type: SET_NOTICIAS, payload: data });
	  } catch (error) {
		console.error('Error al buscar noticias:', error);
		swal.fire({
		  title: 'Error',
		  text: 'Hubo un error al buscar las noticias.',
		  icon: 'error',
		});
	  }
	};
  }


// fin noticias

// comentarios

  export function getComments(newId){
	return async (dispatch)=>{
		try{
			let url = newId ? `http://localhost:3001/comment?newId=${newId}` 
			: `http://localhost:3001/comment`;

			let {data} = await axios.get(url);
			dispatch({type: GET_COMMENTS, payload: data})
		}catch(error){
			console.error("Error al obtener comentario", error)
		}
	}
  }
  
  export function addComment(newsId, comment) {
	return async function (dispatch) {
	  try {
		const {data} = await axios.post(`http://localhost:3001/comment/comentar/${newsId}`, comment);
		dispatch({ type: ADD_COMMENT, payload: data });
	  } catch (error) {
		console.error("Error agregando comentario:", error);
	  }
	};
  }

// fin comentarios

export function clearMemberDetail() {
	return { type: CLEAR_MEMBER_DETAIL };
}

export const clearPage = () => {
	return {
		type: CLEAR_PAGE,
	};
};

export function clearComments() {
	return { type: CLEAR_COMMENTS };
}

// PANEL ADMIN

export const loginAdmin = (username, password) => async (dispatch) => {
    try {
        // Enviar la solicitud POST para loguearse
        const response = await axios.post("http://localhost:3001/admin/login", {
            username,
            password,
        });
		console.log('Login response:', response);

        const { user, token, isAdmin } = response.data; // Desestructuramos la respuesta

        // Guardar el token, usuario y el estado isAdmin en localStorage
        localStorage.setItem("token", token);  
        localStorage.setItem("user", JSON.stringify(user)); // Guardamos el usuario
        localStorage.setItem("isAdmin", isAdmin);  // Guardamos el isAdmin

        // Dispatch para guardar el usuario y el isAdmin en Redux
        dispatch({
            type: "ADMIN_LOGIN_SUCCESS",
            payload: { 
                user, 
                isAdmin 
            },  
        });
       // console.log('dispatch desde action realizado con éxito');

    } catch (error) {
        // Si hay error al hacer login, se despacha un fallo
        dispatch({
            type: "ADMIN_LOGIN_FAILURE",
            payload: error.message || "Error al iniciar sesión",
        });
    }
};

export const logoutAdmin = () => (dispatch) => {
	console.log('deslogueando')
        dispatch({ type: "LOGOUT_ADMIN" });
		localStorage.removeItem("token");
};

//SECCION USUARIOS
export const createUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:3001/admin/users", userData);
		//console.log("Usuario creado con éxito:", response.data);
        dispatch({
            type: CREATE_USER,
            payload: response.data
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
};

export function getUsers (){
	return async (dispatch) =>{
		try{
			let {data} = await axios.get('http://localhost:3001/user');
			return dispatch({type: GET_USERS, payload: data});
		}catch(error){
			console.error('no se encontraron usuarios', error)
		}
	};
}

export function updateUser(id, updateData){
	return async(dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/user/${id}`, updateData);
			dispatch(getUsers());
			swal.fire("Éxito", "Usuario actualizado correctamente", "success");
		}catch(error){
			console.error("Error al actualizar usuario", error);
			swal.fire("Error", "No se pudo actualizar el usuario, el usuario o email ya existen", "error");
		}
	}
}

export function deleteUser(id){
	return async (dispatch)=>{
		try{
			await axios.delete(`http://localhost:3001/user/${id}`);
			dispatch(getUsers());
		}catch(error){
			console.error("Error al eliminar usuario", error)
		}
	}
}

//SECCION NOTICIAS
export function createNews(newsData, userId) {
    return async (dispatch) => {
        try {
			//console.log("userId enviado a la API:", userId); 
            const {data} = await axios.post(`http://localhost:3001/news/crear/${userId}`, newsData);
            dispatch({type: ADD_NEWS, payload: data});

			swal.fire({
				title: 'Noticia creada',
				text: 'La noticia se creo con exito',
				icon: 'success',
				confirmButtonText: 'Ok'
			});

        } catch (error) {
			console.error("Error al crear noticia:", error.response?.data || error.message); // Mostrar error en consola
			swal.fire({
				title: 'Error',
				text: error.response?.data?.message || 'Ya existe una noticia con ese título',
				icon: 'success',
				confirmButtonText: 'Ok'
			});
           // console.error("Error al crear noticia", error);
        }
    };
}

export function updateNews(id, updateData){
	return async (dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/news/${id}`, updateData);
			dispatch(getNews());
			swal.fire("Éxito", "Noticia actualizada correctamente", "success");
		}catch(error){
			console.error("Error al actualizar la noticia", error);
			swal.fire("Error", "No se pudo actualizar la noticia", "error");
		}
	};
}

export function deleteNews(id){
	return async (dispatch)=>{
		try{
			await axios.delete(`http://localhost:3001/news/${id}`);
			dispatch(getNews());
		}catch(error){
			console.error("Error al eliminar noticia", error)
		}
	}
}

//SECCION COMENTARIOS
export function updateComment(id, updateData){
	return async (dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/comment/${id}`, updateData);
			swal.fire("Éxito", "Comentario actualizado correctamente", "success");
			dispatch(getComments());
		}catch (error){
			console.error("Error al actualizar comentario", error);
			swal.fire("Error", "No se pudo actualizar el comentario", "error");
		}
	}
}

export function deleteComment(commentId, newId) {
	return async (dispatch) => {
		try {
			await axios.delete(`http://localhost:3001/comment/${commentId}`);
			return dispatch({ type: DELETE_COMMENT, payload: commentId }, getComments(newId))
			//dispatch(getComments(newId));
		} catch (error) {
			alert(error.response.data);
		}
	};
}

/*SECCION CATEGORYAS*/
export function createCategory(name) {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/category', { name });
            swal.fire({
				icon: 'success',
				title: '¡Categoría creada!',
				text: 'La categoría se ha creado correctamente.',
			  });
            dispatch({ type: CREATE_CATEGORY, payload: response.data.category }); // Opcional: Actualizar Redux
        } catch (error) {
            console.error("Error al crear categoría", error);
			swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Esa categoria ya existe.',
			  });
        }
    };
}

export function getCategories() {
    return async (dispatch) => {
        try {
           // console.log("🔍 Llamando a la API para obtener categorías GetCategory...");
            const response = await axios.get("http://localhost:3001/category");
           // console.log("✅ Categorías recibidas GetCategory:", response.data);

            dispatch({ type: GET_CATEGORIES, payload: response.data });
        } catch (error) {
            console.error("❌ Error al obtener categorías:", error);
        }
    };
}

export const updateCategory = (id, data) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/category/${id}`, data);

        dispatch({ type: "UPDATE_CATEGORY", payload: response.data });

        swal.fire("Éxito", "Categoría actualizada correctamente", "success");
    } catch (error) {
        console.error("Error al actualizar categoría:", error.response?.data || error);
        swal.fire("Error", "Esa categoría ya existe", "error");
    }
};

export function deleteCategory(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3001/category/${id}`);
            dispatch({ type: DELETE_CATEGORY, payload: id });
        } catch (error) {
            console.error("Error al eliminar categoría", error);
        }
    };
}
// ADS
export function getAds(){
	return async (dispatch)=>{
		try{
			const {data} = await axios.get('http://localhost:3001/ads');
			dispatch({ type: GET_ADS, payload: data})
		}catch(error){
			console.error('Error al cargar la imagen', error);
			dispatch({
				type: 'GET_ADS',
				payload: [],
			})
		}
	}
}

export const createAds = (formData) => async (dispatch) => {
	try {
	  const { data } = await axios.post(`${adsUrl}/upload`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	  });
	  swal.fire({
		icon: 'success',
		title: '¡La imagen se ha subido!',
		text: 'Imagen se ha creado correctamente.',
	  });
	  dispatch({ type: CREATE_ADS, payload: data });
	} catch (error) {
	  console.error("Error al crear el anuncio:", error);
	  swal.fire({
		icon: 'error',
		title: 'Error',
		text: 'Error al subir la imagen.',
	  });
	}
  };
  
  export const deleteAds = (id) => async (dispatch) => {
	try {
	  await axios.delete(`${adsUrl}/${id}`);
	  dispatch({ type: DELETE_ADS, payload: id });
	} catch (error) {
	  console.error("Error al eliminar el anuncio:", error);
	}
  };

export function getAdsBanner(){
	return async (dispatch)=>{
		try{
			const {data} = await axios.get('http://localhost:3001/adsbanner');
			dispatch({ type: GET_ADS_BANNER, payload: data})
		}catch(error){
			console.error('Error al cargar la imagen', error);
			dispatch({
				type: 'GET_ADS_BANNER',
				payload: [],
			})
		}
	}
};

export const createAdsBanner = (formData) => async (dispatch) => {
	try {
	  const { data } = await axios.post(`${bannerUrl}/upload`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	  });
	  swal.fire({
		icon: 'success',
		title: '¡La imagen se ha subido!',
		text: 'Imagen se ha creado correctamente.',
	  });
	  dispatch({ type: CREATE_ADS_BANNER, payload: data });
	} catch (error) {
	  console.error("Error al crear el anuncio:", error);
	  swal.fire({
		icon: 'error',
		title: 'Error',
		text: 'Error al subir la imagen.',
	  });
	}
  };
  
  export const deleteAdBanner = (id) => async (dispatch) => {
	try {
	  await axios.delete(`${bannerUrl}/${id}`);
	  dispatch({ type: DELETE_ADS_BANNER, payload: id });
	} catch (error) {
	  console.error("Error al eliminar el anuncio:", error);
	}
  };

  export const getRelatedNews = (id) => {
	return async (dispatch) => {
	  try {
		const response = await fetch(`http://localhost:3001/news/related/${id}`);
		const data = await response.json();
		dispatch({ type: GET_RELATED_NEWS, payload: data });
	  } catch (error) {
		console.error("Error al obtener noticias relacionadas:", error);
	  }
	};
  };
