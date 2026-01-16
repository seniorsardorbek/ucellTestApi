import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export interface FileUploadOptions {
  destination?: string;
  maxSize?: number;
  allowedMimeTypes?: RegExp;
}

export function createMulterConfig(options: FileUploadOptions) {
  const { destination = './uploads', maxSize = 5 * 1024 * 1024 } = options;

  return {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      callback(null, true);
    },
    limits: {
      fileSize: maxSize,
    },
  };
}

export const imagesUploadOptions = createMulterConfig({
  destination: './uploads',
  maxSize: 5 * 1024 * 1024,
  allowedMimeTypes: /\/(jpg|jpeg|png|gif|webp|svg\+xml)$/,
});
