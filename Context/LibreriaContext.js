import React, {createContext, useState} from 'react';
import { Text, View, StyleSheet, Button, StatusBar, ToastAndroid, Platform, AlertIOS } from "react-native";

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

    tempcatalogo = catalogo.filter(a=>a.codigo!==_lib.codigo) // Los libros no seleccionados

    let cambiandopropiedad ={ // Donde cambiaremos la propiedad del libro seleccionado
        codigo:_lib.codigo, // Misma propiedad 
        titulo:_lib.titulo, // Misma propiedad
        precio:_lib.precio, // Misma propiedad
        idioma:_lib.idioma, // Misma propiedad 
        desactivado:true // Propiedad a cambiar
    }
    
    let todoenorden = tempcatalogo.concat(cambiandopropiedad) // Uniendo los libros no seleccionados + el libro seleccionado con la propiedad modificada

    setCatalogo(todoenorden)

    setWishList(
        wishlist => [...wishlist,cambiandopropiedad] 
    )
  }

  const eliminarWishList=(_lib)=>{
    let eliminado = wishList.filter(a=>a.codigo!==_lib.codigo) // La wish list pero sin el libro seleccionado
    
    let tempcatalogo = catalogo.filter(a=>a.codigo!==_lib.codigo);// Quitamos el libro seleccionado del catalogo para cambiar su propiedad

    let cambiandopropiedad ={ // Donde cambiaremos la propiedad del libro seleccionado
      codigo:_lib.codigo, // Misma propiedad 
      titulo:_lib.titulo,
      precio:_lib.precio, // Misma propiedad 
      idioma:_lib.idioma, // Misma propiedad 
      desactivado:false // Propiedad a cambiar
    }

    let todoenorden = tempcatalogo.concat(cambiandopropiedad)// Unimos 

    setCatalogo(todoenorden)
    setWishList(eliminado)
  }
  // ###############################################################################################################################################################
  const agregarCarro=(_x)=>{
    const buscado = carrito.find(a=>a.codigo===_x.codigo); 
    
    let temporal_carrito= carrito; // Aqui viene el carrito asi de una
    
    var objtemporal;

    if(buscado!==undefined)
    {
      let temporal_importe = buscado.importe;

      objtemporal={ // Objeto temporal
          cantidad:buscado.cantidad+1,
          codigo:_x.codigo,
          titulo:_x.titulo,
          precio:_x.precio,
          importe:temporal_importe+_x.precio
        }
        temporal_carrito= carrito.filter(a=>a.codigo!==_x.codigo) // Remover repetidos en el carrito   
    }
    else
    {
      objtemporal={ // Objeto temporal 
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
       ToastAndroid.show("Carrito eliminado :(", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("Carrito eliminado :(");
      }   
    setCarrito([])
    setTotal(0)
    setCantidades(0)
  }

  const comprarCarrito=()=>{
    if (Platform.OS === 'android') {
       ToastAndroid.show("Gracias por tu compra n.n", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("Gracias por tu compra n.n");
      }   
    setCarrito([])
    setTotal(0)
    setCantidades(0)
  }

  const eliminarCarro=(_x)=>{
    const buscado = carrito.find(a=>a.codigo===_x.codigo); 
    
    let temporal_carrito = carrito; // Aqui viene el carrito asi de una
    
    var objtemporal;

    if(buscado.cantidad>1)
    {
      let temporal_importe = buscado.importe;

      objtemporal={ // Objeto temporal
          cantidad:buscado.cantidad-1,
          codigo:_x.codigo,
          titulo:_x.titulo,
          precio:_x.precio,
          importe:temporal_importe-_x.precio
        }
      temporal_carrito = carrito.filter(a=>a.codigo!==_x.codigo) // Remover repetidos en el carrito   
        
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