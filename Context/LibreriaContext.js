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
  
  const agregarWishList = (_lib) =>{
    let tempcatalogo = catalogo;

    tempcatalogo = catalogo.filter(a=>a.codigo!==_lib.codigo) 

    let cambiandopropiedad ={ 
        codigo:_lib.codigo,
        titulo:_lib.titulo,
        precio:_lib.precio,
        idioma:_lib.idioma, 
        desactivado:true
    }
    
    let todoenorden = tempcatalogo.concat(cambiandopropiedad)

    setCatalogo(todoenorden)

    setWishList(
        wishlist => [...wishlist,cambiandopropiedad] 
    )
  }

  const eliminarWishList=(_lib)=>{
    let eliminado = wishList.filter(a=>a.codigo!==_lib.codigo)
    
    let tempcatalogo = catalogo.filter(a=>a.codigo!==_lib.codigo);

    let cambiandopropiedad ={
      codigo:_lib.codigo,
      titulo:_lib.titulo,
      precio:_lib.precio,
      idioma:_lib.idioma,
      desactivado:false
    }

    let todoenorden = tempcatalogo.concat(cambiandopropiedad)

    setCatalogo(todoenorden)
    setWishList(eliminado)
  }
  
  const agregarCarro=(_x)=>{
    const buscado = carrito.find(a=>a.codigo===_x.codigo); 
    
    let temporal_carrito= carrito;
    
    var objtemporal;

    if(buscado!==undefined)
    {
      let temporal_importe = buscado.importe;

      objtemporal={
          cantidad:buscado.cantidad+1,
          codigo:_x.codigo,
          titulo:_x.titulo,
          precio:_x.precio,
          importe:temporal_importe+_x.precio
        }
        temporal_carrito= carrito.filter(a=>a.codigo!==_x.codigo) 
    }
    else
    {
      objtemporal={  
        cantidad:1,
        codigo:_x.codigo,
        titulo:_x.titulo,
        precio:_x.precio,
        importe:_x.precio
      }
    }
    
    setCarrito([...temporal_carrito,objtemporal])
    setTotal(total+_x.precio)
  }

  const eliminarCarrito=()=>{
    if (Platform.OS === 'android') {
       ToastAndroid.show("Tu carrito ha sido vaciado", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("Tu carrito ha sido vaciado");
      }   
    setCarrito([])
    setTotal(0)
    setCantidades(0)
  }

  const comprarCarrito=()=>{
    if (Platform.OS === 'android') {
       ToastAndroid.show("Gracias por tu compra", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("Gracias por tu compra");
      }   
    setCarrito([])
    setTotal(0)
    setCantidades(0)
  }

  const eliminarCarro=(_x)=>{
    const buscado = carrito.find(a=>a.codigo===_x.codigo); 
    
    let temporal_carrito = carrito;
    
    var objtemporal;

    if(buscado.cantidad>1)
    {
      let temporal_importe = buscado.importe;

      objtemporal={
          cantidad:buscado.cantidad-1,
          codigo:_x.codigo,
          titulo:_x.titulo,
          precio:_x.precio,
          importe:temporal_importe-_x.precio
        }
      temporal_carrito = carrito.filter(a=>a.codigo!==_x.codigo)
        
      setCarrito([...temporal_carrito,objtemporal])
      setTotal(total-_x.precio)
    }
    else{
      temporal_carrito = carrito.filter(a=>a.cantidad!==_x.cantidad)
      setCarrito([...temporal_carrito])
      setTotal(total-_x.precio)
    } 
  }

  const contando=()=>{  
      const tt = carrito.reduce((sueldoT,p)=>{return sueldoT+p.cantidad},0)
      if(tt>5){
        return "+5"
      }else{
        return tt
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
      eliminarCarrito,
      comprarCarrito,
      eliminarCarro,
      contando,
    }} 
    >
      {props.children}
    </LibreriaContext.Provider>
  );
}

export default Libreriaprovider;