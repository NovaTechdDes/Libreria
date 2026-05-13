import { createClient } from '@/src/lib/server';
import { BannerCarousel } from './BannerCarousel';

const Banners = async () => {
  const supabase = await createClient();
  const { data: banners } = await supabase.from('banners').select('*').eq('activo', true);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full">
      <BannerCarousel banners={banners} />
    </div>
  );
};

export default Banners;
