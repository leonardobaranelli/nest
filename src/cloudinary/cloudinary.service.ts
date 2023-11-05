import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier'); // esta libreria se usa para que cloudinary pueda leer los archivos

@Injectable()
export class CloudinaryService {
  //este es el metodo
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {

      console.log(file)

      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );


      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
