import React, {createContext, useState} from 'react';
import {ToastAndroid, Platform, AlertIOS } from "react-native";

export const LibreriaContext = createContext();

const Libreriaprovider = (props) =>{

  const [cantidades,setCantidades]= useState(0);
  const [total,setTotal]= useState(0);
  
  const [carrito,setCarrito]= useState([]);
  const [wishList,setWishList]= useState([]);

  const [catalogo,setCatalogo]= useState([
    {codigo:1,titulo:"Programación", precio:100.50,idioma:'ESP', desactivado:false},
    {codigo:2,titulo:"Aprende Python", precio:80.00, idioma:'ESP',desactivado:false},     
    {codigo:3,titulo:"Precálculo", precio:90.50, idioma:'ESP',desactivado:false},
    {codigo:4,titulo:"Ingenieria De Software", precio:60.50, idioma:'ESP',desactivado:false},
    {codigo:5,titulo:"Ingenieria De Software 2", precio:200.00, idioma:'ESP',desactivado:false}
  ]); 
  
  const agregarWishList = (libro) =>{
    let temp = catalogo;
    let index = temp.findIndex((element) => element.codigo === libro.codigo);

    temp[index].desactivado=true;

    let temp2 =[...wishList,libro];
    temp2 =temp2.sort((a,b)=>a.codigo>b.codigo)

    setWishList(temp2);
    setCatalogo(temp);

    if(Platform.OS==='android'){
      ToastAndroid.showWithGravityAndOffset(
        "Curso agragado a la wishlist",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        150
      );
    }
  }

  const eliminarWishList=(libro)=>{
    let temp = catalogo;
    let index = temp.findIndex((element)=>element.codigo===libro.codigo);
    
    temp[index].desactivado=false;

    let tempw = wishList.filter(c=>c.codigo!==libro.codigo)
    setWishList(tempw);
    setCatalogo(temp);

    if(Platform.OS==='android'){
      ToastAndroid.showWithGravityAndOffset(
        "Curso eliminado de la wishlist",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        150
      );
    }
  }
  
  const agregarCarro=(libro)=>{
    let existe = carrito.find(e=>e.codigo===libro.codigo); 
    let temp_lista= carrito;
    let libro_temp;

    if(existe!==undefined)
    {
      libro_temp={
          cantidad:existe.cantidad+1,
          codigo:libro.codigo,
          titulo:libro.titulo,
          precio:libro.precio,
        }
        temp_lista = carrito.filter(e=>e.codigo!==libro.codigo) 
    }
    else
    {
      libro_temp={  
        cantidad:1,
        codigo:libro.codigo,
        titulo:libro.titulo,
        precio:libro.precio,
      }
    }
    
    setCarrito([...temp_lista,libro_temp])
    setTotal(total+libro.precio)

    if(Platform.OS==='android'){
      ToastAndroid.showWithGravityAndOffset(
        "Agregado al carrito.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        150
      );
    }
  }
 
  const comprar=()=>{
    if (Platform.OS === 'android') {
       ToastAndroid.show("Gracias por tu compra", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("Gracias por tu compra");
      }   
    setCarrito([])
    setTotal(0)
    setCantidades(0)
  }

  const eliminarCarritoTodo=()=>{

    setCarrito([]);
    setTotal(0);

    if (Platform.OS === 'android') {
       ToastAndroid.showWithGravityAndOffset("Tu carrito ha sido vaciado", 
       ToastAndroid.SHORT,
       ToastAndroid.BOTTOM,
       25,
       150);
    }
  }

  const eliminarCarrito=(libro, index)=>{
    let temporal;

    if(libro.cantidad===1){
      temporal = carrito.filter((p,i)=>i!==index)
    }
    else{
      const libro_temp={
          cantidad:libro.cantidad-1,
          codigo:libro.codigo,
          titulo:libro.titulo,
          precio:libro.precio,
        }
      temporal = carrito.filter((libro,i)=>i!==index)
      temporal = [...temporal,libro_temp]
    }
    setCarrito(temporal);
    setTotal(total-libro.precio); 

    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset("Curso eliminado del carrito.", 
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      150);
   }

  }

  const contando=()=>{  
      const veces = carrito.reduce((a,p)=>{return a+p.cantidad},0)
      if(veces>99){
        return "+99"
      }else{
        return veces
      }
  }

  return(
    <LibreriaContext.Provider
    value={{
      catalogo,
      carrito,
      wishList,
      cantidades,
      total,
      agregarWishList,
      eliminarWishList,
      agregarCarro,
      eliminarCarritoTodo,
      comprar,
      eliminarCarrito,
      contando,
    }} 
    >
      {props.children}
    </LibreriaContext.Provider>
  );
}

export default Libreriaprovider;