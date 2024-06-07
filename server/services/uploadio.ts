import * as Bytescale from "@bytescale/sdk";
import * as fs from 'fs'
import nodeFetch from 'node-fetch';
import config from '../config'

const { BYTESCALE_API_KEY } = config()
const uploadManager = new Bytescale.UploadManager({
  fetchApi: nodeFetch as any,
  apiKey: BYTESCALE_API_KEY
});

export const uploadFileFromPath = async (filePath: string): Promise<string> => {
    const data = fs.readFileSync(filePath)
    const res = await uploadManager.upload({
        data,
        mime: 'image/png',
        originalFileName: filePath,
    })

    return res.fileUrl
}
