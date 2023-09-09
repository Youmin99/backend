// files.service.ts

import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
    async upload({ files }: IFilesServiceUpload): Promise<string[]> {
        console.log(files);

        const waitedFiles = await Promise.all(files);
        console.log(waitedFiles);

        const bucket = 'post-storage';
        const storage = new Storage({
            projectId: 'wp-map-385322',
            keyFilename: 'gcp-file-storage.json',
        }).bucket(bucket);

        const results = await Promise.all(
            waitedFiles.map(
                (el) =>
                    new Promise<string>((resolve, reject) => {
                        el.createReadStream()
                            .pipe(storage.file(el.filename).createWriteStream())
                            .on('finish', () =>
                                resolve(`${bucket}/${el.filename}`),
                            )
                            .on('error', () => reject('fail'));
                    }),
            ),
        );

        return results;
    }
}
