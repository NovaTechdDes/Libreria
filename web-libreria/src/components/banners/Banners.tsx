import { getBanners } from '@/src/actions/banner.actions';
import { BannerCarousel } from './BannerCarousel';

const Banners = async () => {
  const banners = await getBanners();

  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full">
      <BannerCarousel banners={banners} />
    </div>
  );
};

export default Banners;
