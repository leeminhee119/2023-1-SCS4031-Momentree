import AWS from 'aws-sdk';
import { IImage } from 'types/post';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const REGION = 'ap-northeast-2';
const BUCKET_NAME = 'datebuzz-bucket';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const S3Bucket = new AWS.S3({
  params: { Bucket: BUCKET_NAME },
  region: REGION,
});

async function uploadImagesToS3(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: BUCKET_NAME,
      Key: file.name,
    };

    return new Promise<string>((resolve, reject) => {
      S3Bucket.putObject(params, (err) => {
        if (err) {
          reject(err);
        } else {
          const imageUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${file.name}`;
          resolve(imageUrl);
        }
      });
    });
  });

  return Promise.all(uploadPromises);
}
export async function getImageUrls(filesArray: File[]) {
  try {
    const imageUrls = await uploadImagesToS3(filesArray);
    const images: IImage[] = [];
    if (imageUrls) {
      imageUrls.forEach((url: string, idx: number) => {
        images.push({
          orders: idx,
          imgUrl: url,
        });
      });
    }
    return images;
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
  }
}
