const CLOUDINARY_CLOUD_NAME = 'l8qfmes9';

export function buildCloudinaryUrl(publicId, transformations) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export function buildCloudinaryVideoUrl(publicId, transformations) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
}

export const media = {
  profilePhoto: buildCloudinaryUrl('foto_de_perfil', 'f_auto,q_auto,w_600,h_600,c_fill,g_face'),
};
