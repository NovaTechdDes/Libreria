import { BannerCard } from '@/src/components/banners/BannerCard';
import { BannerForm } from '@/src/components/banners/BannerForm';
import { BannerFilters } from '@/src/components/banners/BannerFilters';
import { createClient } from '@/src/lib/server';

const PageBanners = async () => {
  const supabase = await createClient();

  const { data: banners, error } = await supabase.from('banners').select('*');

  if (error) {
    return <p className="text-red-500 text-center mt-8">Error al cargar los banners.</p>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gestión de Banners</h1>
          <p className="text-slate-500 text-sm font-medium">Organiza y programa las promociones visuales de tu tienda.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side: Banner Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Banners Activos</h2>
            <BannerFilters activos={banners.filter((b) => b.activo).length} pausados={banners.filter((b) => !b.activo).length} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {banners.map((banner) => (
              <BannerCard key={banner.id} banner={banner} />
            ))}
          </div>
        </div>

        {/* Right Side: Form Sidebar */}
        <div className="lg:col-span-1">
          <BannerForm />
        </div>
      </div>
    </div>
  );
};

export default PageBanners;
