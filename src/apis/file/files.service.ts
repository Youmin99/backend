// files.service.ts

import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
    async upload({ file }: IFilesServiceUpload): Promise<string> {
        const bucket = 'post-storage';
        const storage = new Storage({
            projectId: 'wp-map-385322',
            keyFilename: 'gcp-file-storage.json',
        }).bucket(bucket);

        const results = new Promise<string>((resolve, reject) => {
            file.createReadStream()
                .pipe(storage.file(file.filename).createWriteStream())
                .on('finish', () => resolve(`${bucket}/${file.filename}`))
                .on('error', () => reject('fail'));
        });

        return results;
    }
}
