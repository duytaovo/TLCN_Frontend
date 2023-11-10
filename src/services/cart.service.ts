import { httpNew } from "src/utils/http";

export const cartService = {
  getProductByProductSlugId({ slug, id }: { slug: string; id: string }) {
    return httpNew.get(`/product/${slug}/${id}`);
  },
};
