//NOTA:EN ESTE ARCHIVO ESTÁ TODO LO DE AUTENTICACIONES.

import {defineStore} from 'pinia';
//Importaciones para registrar usuarios.logearlos y terminar su sesión  en firebase.
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
//Importación para trabajar con el usuario que tiene sesión actualmente.
import {onAuthStateChanged } from "firebase/auth";
//Importaciones para hacer el push al home y fuera de él.
import router from '../router/router.js';

//Importo el otro store para reiniciarlo cuando el usuario le de en logout, que activa
//el logoutUser que cierra la sesión.
import {useDatabaseStore} from '../stores/database.js';


export const useUserStore=defineStore('userStore',{
    state:()=>({
        userData:null,
        loadingUser:false,
        loadingSession:false
    }),
    actions:{

      async registerUser(email,password){
        this.loadingUser=true;
        try{
           const {user}=await createUserWithEmailAndPassword(auth,email,password);
           this.userData={email:user.email,uid:user.uid};
           router.push('/');
          
        }catch(err){
            console.log(err);
        }finally{
          this.loadingUser=false;
        }
      },
      async loginUser(email,password){
        this.loadingUser=true;
        try{
          const {user}=await signInWithEmailAndPassword(auth,email,password);
          this.userData={email:user.email,uid:user.uid};
          router.push('/');
         
        }catch(err){
          console.log(err);
        }finally{
          this.loadingUser=false;
        }
      },
      async logoutUser(){
         //Reinicio el otro store cuando se manda llamar la acción de cerrar sesión...
         const databaseStore=useDatabaseStore();
        
        try{
          await signOut(auth);
          this.userData=null;
          router.push('/login');
          databaseStore.$reset(); //Si se cierra sesión con éxito reseteo el store que contiene los documentos.

         
        }catch(err){
          console.log(err);
        }
      },
      currentUser(){
        //Nos inventamos una promesa para trabajar con el usuario autenticado actual
        //Esto es porque el método con el que trabajo no es una promesa y esto puede
        //generar conflictos.
        
        return new Promise((resolve,reject)=>{
              //Esto es para obtener la info del usuario que tiene sesión actualmente.
             const unsuscribe= onAuthStateChanged(auth,(user)=>{
                  //user será null, si no hay una sección activa actualmente.
                  if(user){
                    this.userData={email:user.email,uid:user.uid};
                  }else{
                    this.userData=null;
                    const databaseStore=useDatabaseStore();
                    databaseStore.$reset(); 
                  }
                  resolve(user); //Retorna el usuario independiente de si existe o no.
              },err=>reject(err));
              unsuscribe(); //Esto cancela la operación del observador.
        })
      }


    }
});