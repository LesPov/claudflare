// src/app/interfaces/subtipoDenunciaInterface.ts
export interface SubtipoDenunciaInterface {
    id: number;                 // ID del subtipo de denuncia
    tipoDenunciaId: number;      // ID del tipo de denuncia asociado
    nombre: string;              // Nombre del subtipo de denuncia
    descripcion?: string;        // Descripción del subtipo de denuncia (opcional)
  }
  