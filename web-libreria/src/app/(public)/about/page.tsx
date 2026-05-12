import Image from 'next/image';
import Link from 'next/link';
import { BiBook, BiCheck, BiHeadphone, BiLeaf, BiShield, BiSolidTruck, BiStar } from 'react-icons/bi';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlinePrint } from 'react-icons/md';

const AboutPage = () => {
  return (
    <main className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image className="w-full h-full object-cover" src="/FondoNosotros.png" alt="Librería Lachi Interior" width={2000} height={1200} priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">Nuestra Historia</span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">LIBRERIA LACHI: 38 años de tradición y confianza.</h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow-sm">
              Somos una empresa familiar reconocida por nuestra amplia experiencia en el rubro de librería. Desde hace 38 años, nos distinguimos por ser comprometidos, honestos y fiables, brindando
              soluciones integrales a nuestra comunidad.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={'/'} className="bg-primary text-white py-3 px-8 text-lg font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                Explorar Catálogo
              </Link>

              <Link href={'#servicios'} className="bg-white/10 backdrop-blur-md border border-white/30 text-white py-3 px-8 text-lg font-medium rounded-lg hover:bg-white/20 transition-all shadow-lg">
                Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Misión Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-tertiary rounded-3xl p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10">
              <div className="bg-white p-3 rounded-xl shadow-sm inline-block mb-6">
                <BiBook className="size-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-secondary mb-6">Misión</h2>
              <p className="text-lg text-neutral/80 leading-relaxed mb-10">
                LIBRERIA LACHI nació como un sueño familiar y hoy es referente en el sector. Nuestra misión es mantener la excelencia en el servicio, apoyados en décadas de conocimiento y un
                compromiso inquebrantable con nuestros clientes.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['ana', 'juan', 'maria'].map((name) => (
                    <div key={name} className={`size-10 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-500 font-bold overflow-hidden`}>
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center uppercase">{name.charAt(0)}</div>
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-neutral">+500 Familias confían en nosotros</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3 relative group">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-500 z-10"></div>
            <Image src="/Libro.png" alt="Misión" width={1000} height={750} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Visión Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl aspect-4/3 relative group">
            <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/0 transition-colors duration-500 z-10"></div>
            <Image src="/Cohete.png" alt="Visión" width={1000} height={750} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="order-1 md:order-2 bg-[#D1E1FF] rounded-3xl p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-16 -mb-16 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10">
              <div className="bg-white p-3 rounded-xl shadow-sm inline-block mb-6">
                <HiOutlineRocketLaunch className="size-8 text-[#4A90E2]" />
              </div>
              <h2 className="text-3xl font-bold text-secondary mb-6">Visión</h2>
              <p className="text-lg text-secondary/80 leading-relaxed">
                Aspiramos a ser la librería y juguetería de referencia a nivel regional, reconocida no solo por la calidad de nuestros productos, sino por transformar el acto de comprar en una
                experiencia de aprendizaje e inspiración constante para la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores Section */}
      <section id="servicios" className="bg-tertiary/50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Nuestros Sectores de Especialidad</h2>
            <p className="text-lg text-neutral/70">Dividimos nuestra experiencia para brindar soluciones precisas a cada necesidad, desde el entorno profesional hasta la etapa escolar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sector Comercial */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:border-primary/30 transition-all group hover:shadow-xl hover:shadow-primary/5">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary transition-colors">
                <MdOutlinePrint className="size-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Sector Comercial</h3>
              <p className="text-neutral/70 mb-8 leading-relaxed">Artículos y servicios especializados para oficinistas, profesionales y estudiantes universitarios que buscan eficiencia y calidad.</p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                    <BiCheck className="text-primary font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Encuadernación profesional</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                    <BiCheck className="text-primary font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Material de oficina</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                    <BiCheck className="text-primary font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Elementos de facturacion</span>
                </li>
              </ul>
            </div>

            {/* Sector Escolar */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:border-primary/30 transition-all group hover:shadow-xl hover:shadow-primary/5">
              <div className="bg-[#EDF2FF] p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#4A90E2] transition-colors">
                <IoDocumentTextOutline className="size-8 text-[#4A90E2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Sector Escolar</h3>
              <p className="text-neutral/70 mb-8 leading-relaxed">Todo lo necesario para colegios, niños y adolescentes, fomentando el aprendizaje con los mejores materiales del mercado.</p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#EDF2FF] rounded-full p-0.5">
                    <BiCheck className="text-[#4A90E2] font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Cuadernos y plasticos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#EDF2FF] rounded-full p-0.5">
                    <BiCheck className="text-[#4A90E2] font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Utiles escolares</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#EDF2FF] rounded-full p-0.5">
                    <BiCheck className="text-[#4A90E2] font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Fotocopias y anillado</span>
                </li>
              </ul>
            </div>

            {/* Nuestros Valores */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:border-primary/30 transition-all group hover:shadow-xl hover:shadow-primary/5">
              <div className="bg-orange-50 p-4 rounded-2xl inline-block mb-6 group-hover:bg-orange-500 transition-colors">
                <BiStar className="size-8 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Nuestros Valores</h3>
              <p className="text-neutral/70 mb-8 leading-relaxed">Nos definimos por ser comprometidos, honestos y fiables. Valores que han guiado nuestro crecimiento durante casi cuatro décadas.</p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-orange-50 rounded-full p-0.5">
                    <BiCheck className="text-orange-500 font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Atención personalizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-orange-50 rounded-full p-0.5">
                    <BiCheck className="text-orange-500 font-bold" />
                  </div>
                  <span className="text-sm font-medium text-secondary/80">Trayectoria garantizada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3 text-white/90">
              <BiShield className="size-6 text-primary shrink-0" />
              <span className="text-sm font-medium">Garantía de Calidad</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <BiSolidTruck className="size-6 text-primary shrink-0" />
              <span className="text-sm font-medium">Envíos a Domicilio</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <BiHeadphone className="size-6 text-primary shrink-0" />
              <span className="text-sm font-medium">Atención con Calidad</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <BiLeaf className="size-6 text-primary shrink-0" />
              <span className="text-sm font-medium">Compromiso Sustentable</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
