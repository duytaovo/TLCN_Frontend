import { httpNew } from "src/utils/http";

export const cartService = {
  getProductByProductSlugId({ slug, id }: { slug: string; id: string }) {
    return httpNew.get(`/product/${slug}/${id}`);
  },
  getProductByProductSlug({ slug, params }: { slug: string; params: any }) {
    return httpNew.get(`/product/${slug}`, { params });
  },
};
