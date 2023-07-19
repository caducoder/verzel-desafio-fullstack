import { APIGetResponse, Carro } from "../../types"
import api from "../axios"

export const getAllCars = (page = 0, pageSize = 10) => new Promise<APIGetResponse>(
  (resolve, reject) => {
    api.get<APIGetResponse>(`/carros?page=${page}&size=${pageSize}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  }
)

export const addCar = (carro: Carro) => new Promise<Carro>(
  (resolve, reject) => {
    api.post<Carro>('/carros', carro)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  }
)

export const updateCar = (id: number, carro: Carro) => new Promise<Carro>(
  (resolve, reject) => {
    api.put<Carro>(`/carros/${id}`, carro)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  }
)

export const removeCar = (id: number) => new Promise<string>(
  (resolve, reject) => {
    api.delete<string>(`/carros/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  }
)