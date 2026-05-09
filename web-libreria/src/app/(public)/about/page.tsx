import Image from 'next/image';
import { BiBook, BiCheck } from 'react-icons/bi';
import { HiOutlinePuzzlePiece, HiOutlineRocketLaunch } from 'react-icons/hi2';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlinePrint } from 'react-icons/md';

const AboutPage = () => {
  return (
    <main className=" flex-1">
      <section className="relative min-h-[716px]  flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 ">
          <Image className="w-full h-full object-cover" src="/fondoNosotros.png" alt="Fondo Nosotros" width={2000} height={2000} />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl  mx-auto px-6 md:px-8 py-20">
          <div className="max-w-2xl ">
            <span className="bg-primary px-2 py-1 rounded-lg text-black">Nuestra Historia</span>

            <h1 className="font-display text-4xl text-on-background my-6">LIBRERIA LACHI: 38 años de tradición y confianza.</h1>

            <p className="text-lg text-secondary mb-6">
              Somos una empresa familiar reconocida por nuestra amplia experiencia en el rubro de librería. Desde hace 38 años, nos distinguimos por ser comprometidos, honestos y fiables, brindando
              soluciones integrales a nuestra comunidad.
            </p>

            <div className="flex gap-5">
              <button className="bg-primary text-white py-2 px-4 text-xl rounded-md hover:cursor-pointer hover:bg-primary/80">Explorar Catalogo</button>

              <button className="border border-secondary bg-transparent py-2 px-4 text-xl rounded-md text-secondary hover:cursor-pointer hover:bg-secondary/20">Nuestros Servicios</button>
            </div>
          </div>
        </div>
      </section>

      {/* Mision y vision */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Mision Card*/}
          <div className="md:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 flex flex-col justify-between shadow-sm border border-outline-variant/30">
            <div>
              <BiBook className="size-12 text-primary" />
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Mision</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                LIBRERIA LACHI nació como un sueño familiar y hoy es referente en el sector. Nuestra misión es mantener la excelencia en el servicio, apoyados en décadas de conocimiento y un
                compromiso inquebrantable con nuestros clientes.
              </p>
            </div>
          </div>

          {/* Mision Image */}
          <div className="md:col-span-5 rounded-xl overflow-hidden shadow-lg aspect-square md:aspect-auto">
            <Image src="/libro.png" alt="Libro" width={2000} height={2000} className="w-full h-full object-cover" />
          </div>

          {/* Vision Image */}
          <div className="md:col-span-5 rounded-xl overflow-hidden shadow-lg aspect-square md:aspect-auto">
            <Image src="/Cohete.png" alt="Libro" width={2000} height={2000} className="w-full h-full object-cover" />
          </div>

          {/* Vision Card*/}
          <div className="md:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 flex flex-col justify-between shadow-sm border border-outline-variant/30">
            <div>
              <HiOutlineRocketLaunch className="size-12 text-primary" />
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Mision</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                LIBRERIA LACHI nació como un sueño familiar y hoy es referente en el sector. Nuestra misión es mantener la excelencia en el servicio, apoyados en décadas de conocimiento y un
                compromiso inquebrantable con nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section>
        <div>
          <h2>Nuestros Sectores de especialidad</h2>

          <p>Dividimos nuestra experiencia para brindar soluciones precisas a cada necesidad, desde el entorno profesional hasta la etapa escolar.</p>
        </div>

        <div>
          <div className="bg-surface p-8 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all group">
            <MdOutlinePrint />
            <h3>Sector Comercial</h3>
            <p>Artículos y servicios especializados para oficinistas, profesionales y estudiantes universitarios que buscan eficiencia y calidad.</p>

            <div>
              <p>
                <BiCheck />
                <span>Encuadernación profesional</span>
              </p>
              <p>
                <BiCheck />
                <span>Libretas de recibos y facturas</span>
              </p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all group">
            <IoDocumentTextOutline />
            <h3>Sector Escolar</h3>
            <p>Todo lo necesario para colegios, niños y adolescentes, fomentando el aprendizaje con los mejores materiales del mercado.</p>

            <div>
              <p>
                <BiCheck />
                <span>Fotocopias y Escaneo</span>
              </p>
              <p>
                <BiCheck />
                <span>Stock premium garantizado</span>
              </p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all group">
            <HiOutlinePuzzlePiece />
            <h3>Nuestros Valores</h3>
            <p>Nos definimos por ser comprometidos, honestos y fiables. Valores que han guiado nuestro crecimiento durante casi cuatro décadas.</p>

            <div>
              <p>
                <BiCheck />
                <span>Atención personalizada</span>
              </p>
              <p>
                <BiCheck />
                <span>Trayectoria garantizada</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </main>
  );
};

export default AboutPage;
