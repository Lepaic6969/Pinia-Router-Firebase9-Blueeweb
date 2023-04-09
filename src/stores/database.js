//NOTA: EN ESTE ARCHIVO SE VA A TRABAJAR TODO LO DE FIRESTORE.
import {defineStore} from 'pinia';
//Estas son las importaaciones que necesitamos para el firestore.
import { db,auth } from '../firebase/firebaseConfig.js';
import {collection, query,getDocs,where,addDoc,doc, deleteDoc, getDoc,updateDoc} from 'firebase/firestore/lite';
//Esta es la librería que me genera el id
import {nanoid} from 'nanoid';
//Importamos el router
import router  from '../router/router.js';

export const useDatabaseStore=defineStore("database",{
    state:()=>({
        documents:[],
        loadingDoc:false
    }),
    actions:{
        async getUrls(){
            //Esto es para evitar sobreconsumos a la base de datos.
            if(this.documents.length!==0){
                return
            }
            this.loadingDoc=true;
            try{
                //Defino la query.
                //En el where le digo que traiga todos los documentos en donde el usuario sea igual
                //al id del usuario autenticado.
                const q= query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));
                //Traigo todos los documentos de la base de datos.
                const querySnapshot = await getDocs(q);
                //Recorro la referencia para tener acceso a cada uno de los documentos.
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    this.documents.push({
                        id:doc.id,
                        ...doc.data()
                    });
                });

                
            }catch(err){
                console.log(err);
            }finally{
                this.loadingDoc=false;
            }
        },
        async addUrl(name){
            try{
                const data={
                    name,
                    short:nanoid(6), //Me retorna un string aleatorio de 6 carácteres
                    user:auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"),data);
                // Actualizo el arreglo para no tener que refrescar la página.
                this.documents.push({
                    ...data,
                    id:docRef.id
                });
            }catch(err){
                console.log(err);
            }finally{

            }
        },
        async readUrl(id){
            try{
                //1. Traemos la referencia del documento.
                const docRef = doc(db, "urls", id);
                //2. Traemos el contenido de ese documento.
                const document=await getDoc(docRef);

//***********Esto es sólo para que el usuario no pueda leer documentos que no le corresponden ******/       
                 if(!document.exists()){
                     throw new Error("No existe el documento");
                 }
                 if(document.data().user!==auth.currentUser.uid){
                     throw new Error("El documento que quiere leer, no le pertenece");
                 }
//********************************************************************************************** */
                //3. Retornamos lo que nos es útil 
                //(En este caso la Url para que el input de editar empiece con la información que ya está).
                return document.data().name //En el campo name, viene la url del documento.

            }catch(err){
                console.log(err.message);
            }
        },
        async updateUrl(id,name){
            try{
                //1. Obtengo la referencia del documento con el id que me pasan.
                const docRef = doc(db, "urls", id);
                //2. Traigo el contenido de ese documento.
                const document=await getDoc(docRef);
    //***********Esto es sólo para que el usuario no pueda editar documentos que no le corresponden ******/
                if(!document.exists()){
                    throw new Error("No existe el documento");
                }
                if(document.data().user!==auth.currentUser.uid){
                    throw new Error("El documento que quiere actualizar, no le pertenece");
                }
    //********************************************************************************************** */
                // console.log("Pasó las validaciones al actualizar")
                // console.log(name)
                // console.log(id)

                await updateDoc(docRef, {
                    name:name
                });

                //Actualizamos el arreglo que se está mostrando...
                this.documents=this.documents.map(document=>document.id===id?({...document,name:name}):document);
                router.push('/');
                
            }catch(err){
                console.log(err.message);
            }
        },
        async deleteUrl(id){
            //Necesitamos primero obtener la referencia del documento en cuestión y después si lo borro.
            try {
                //1. Obtengo la referencia del documento.
                const docRef = doc(db, "urls", id);

    //***********Esto es sólo para que el usuario no pueda eliminar documentos que no le corresponden ******/
                const document=await getDoc(docRef);
                if(!document.exists()){
                    throw new Error("No existe el documento");
                }
                if(document.data().user!==auth.currentUser.uid){
                    throw new Error("El documento que quiere eliminar, no le pertenece");
                }
    //********************************************************************************************** */
                //2. Borro la referencia
                await deleteDoc(docRef);
                this.documents=this.documents.filter(doc=>doc.id!==id);
            } catch (error) {
                console.log(error.message);
            }
        }
    }
});