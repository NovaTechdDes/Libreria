import { RubrosContainer } from '@/src/components/rubros/RubrosContainer';
import { getRubrosSubRubrosClient } from '@/src/helper/getRubrosSubRubros';

const RubrosPage = async () => {
  const rubros = await getRubrosSubRubrosClient();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md_flex-row md:items-center justify-between gap-6 mb-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gestión de Rubros</h1>
          <p className="text-[15px] text-slate-500 font-medium">Administra los rubros de tus productos de forma centralizada.</p>
        </div>
      </header>

      <RubrosContainer rubros={rubros || []} />
    </div>
  );
};

export default RubrosPage;
