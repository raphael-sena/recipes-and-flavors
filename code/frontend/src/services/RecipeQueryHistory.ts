import { RecipeHistoryRequest, RecipeHistoryResponse } from "@/models/RecipeHistory";
import axios from "axios";

export const fetchRecipeHistory = async (
    requestData: RecipeHistoryRequest
  ): Promise<RecipeHistoryResponse> => {
    try {
      const token = localStorage.getItem('authtoken');
  
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }
  
      const {
        page = 0,
        size = 10,
        ...filters
      } = requestData;

      const queryParams = new URLSearchParams({
        offset: String(page),
        limit: String(size),
      });
  
      const response = await axios.post<RecipeHistoryResponse>(
        `http://localhost:8080/recipe/history?${queryParams.toString()}`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Dados retornados do backend:", JSON.stringify(response.data, null, 2));

      console.log("Content:", response.data.content);
      console.log("Total Elements:", response.data.totalElements);
      console.log("Primeiro Item:", response.data.content?.[0]);

      console.table(response.data.content);
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro de API:', error.response?.data || error.message);
        throw new Error(
          'Erro ao buscar o histórico de receitas. Verifique os dados e tente novamente.'
        );
      } else {
        console.error('Erro desconhecido:', error);
        throw new Error('Ocorreu um erro desconhecido. Tente novamente.');
      }
    }
  };