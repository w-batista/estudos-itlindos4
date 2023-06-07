import { Comentarios } from "./comentarios";

export interface Blog {
  titulo: string,
  data: string,
  texto: string,
  imagem: string,
  autor: number,
  comentarios: Comentarios [],
  id: number

}
