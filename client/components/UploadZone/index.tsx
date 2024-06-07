import React, { useState } from 'react'
import * as Bytescale from '@bytescale/sdk'

type Props = {
    onFileUploaded: (fileUrl: string) => void,
    name: string,
    label: string
    accept?: string
}

export const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_KEY"
});

export const UploadZone: React.FC<Props> = ({
    onFileUploaded,
    name,
    label,
    accept
}) => {
    const [progress, setProgress] = useState<number>(0)
    const [error, setError]       = useState<{ message: string } | null>(null)

    const handleFileUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files?.length) {
            return
        }

        const file = e.target.files[0]

        try {
            const { fileUrl } = await uploadManager.upload({
                data: file,
                onProgress: ({ progress }) => setProgress(progress),
            })

            onFileUploaded(fileUrl)
        } catch (err) {
            setError(error)
        }
    }

    if (error) {
        return <p>{error.message}</p>
    }

    if (progress && progress < 100) {
        return <p>File uploading... {progress}%</p>
    }

    return (
        <label htmlFor={name}>
            {label}
            <input type="file" name={name} onChange={handleFileUploaded} accept={accept} />
        </label>
    )
}
