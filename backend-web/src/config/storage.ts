import { BlobServiceClient } from '@azure/storage-blob';

const blobServiceCliente = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING!
);

export const containerClient = blobServiceCliente.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER!
);