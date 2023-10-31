//Este es un archivo de promesa que se usa para verificar si la imagen fue enviada de forma correcta o error

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;