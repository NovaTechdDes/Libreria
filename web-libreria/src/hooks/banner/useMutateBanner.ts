import { deleteBanner, postBanner, putBanner, putStatusBanner } from '@/src/actions/banner.actions';
import { BannerImage } from '@/src/components/banners/BannerForm';
import { Banner } from '@/src/interface/Banner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateBanner = () => {
  const queryClient = useQueryClient();

  const startPostBanner = useMutation({
    mutationFn: (data: { banner: Banner; image: BannerImage }) => postBanner(data.banner, data.image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });

  const startUpdateBanner = useMutation({
    mutationFn: (data: { banner: Banner; image: BannerImage }) => putBanner(data.banner, data.image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });

  const startPutStatus = useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) => putStatusBanner(id, activo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });

  const startDeleteBanner = useMutation({
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });

  return {
    startPostBanner,
    startUpdateBanner,
    startPutStatus,
    startDeleteBanner,
  };
};
