import {createRouter,createWebHistory} from 'vue-router';

//Importo los componentes para hecerlo sin LazyLoad.
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
//Importo el store donde está mi método para identificar si hay una sesión acticva en mi app.
import {useUserStore} from '../stores/user.js';


//Función para proteger la ruta del Home.
//Verifica que el suario esté logeado, sino lo redirige al login.
const requireAuth=async(to,from,next)=>{

    const userStore=useUserStore();
    userStore.loadingSession=true;
    const {currentUser}=userStore;
    const user=await currentUser();
    if(user){
        next();
    }else{
        next('/login');
    }
    userStore.loadingSession=false;
}

const routes=[
    {
        path:'/',
        component:Home,
        beforeEnter:requireAuth
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    }
]
const router=createRouter({
    routes,
    history:createWebHistory()
})

export default router;