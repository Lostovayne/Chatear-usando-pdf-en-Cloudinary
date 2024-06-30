import type { APIRoute } from "astro";

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "khalest",
  api_key: "249964259886213",
  api_secret: import.meta.env.CLOUDINARY_SECRET, // Click 'View Credentials' below to copy your API secret
});

const UploadStream = async (
  buffer: Uint8Array,
  options: { folder: string }
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result);
        reject(error);
      })
      .end(buffer);
  });
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();
  const unit8Array = new Uint8Array(arrayBuffer);
  const result = await UploadStream(unit8Array, { folder: "pdf" });

  const { asset_id: id, secure_url: url, pages } = result;

  console.log(result);

  // simular el delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return new Response(
    JSON.stringify({
      id,
      url,
      pages,
    })
  );
};
