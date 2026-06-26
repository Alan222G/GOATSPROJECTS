import { useState } from "react";

interface ClientDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function ClientDashboard({ userEmail, onLogout }: ClientDashboardProps) {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const simulateDownload = (filename: string) => {
    setDownloadingFile(filename);
    setTimeout(() => {
      setDownloadingFile(null);
      alert(`Archivo descargado con éxito: ${filename}`);
    }, 1500);
  };

  // Pre-filled links
  const whatsappUrl = "https://wa.me/56934567890?text=Hola%20Claudio,%20necesito%20hacer%20una%20consulta%20sobre%20el%20balance%20mensual%20de%20nuestra%20empresa.";
  const gmailUrl = `mailto:contacto@proserco.com?subject=Consulta%20Cliente%20-%20${userEmail}&body=Estimado%20equipo%20de%20PROSERCO,%20solicito%20revisar%20el%20siguiente%20punto%20de%20mi%20cuenta...`;

  const files = [
    { name: "Balance_General_Q1_2026.pdf", size: "2.4 MB", date: "15/05/2026" },
    { name: "Declaracion_Impuesto_F22_Final.pdf", size: "4.8 MB", date: "30/04/2026" },
    { name: "Libro_Compra_Venta_Mayo.xlsx", size: "1.2 MB", date: "05/06/2026" },
    { name: "F29_Declaracion_Mensual_IVA.pdf", size: "850 KB", date: "12/06/2026" },
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider block mb-1">
              Panel Empresarial
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Bienvenido, <span className="text-gradient-gold font-sans font-semibold">{userEmail.split("@")[0]}</span>
            </h1>
            <p className="font-sans text-navy-200/40 text-xs mt-1">
              Cuenta asociada a: {userEmail} | Perfil Directivo
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onLogout}
              className="px-5 py-2.5 bg-transparent border border-white/10 hover:border-rose-500/40 text-white hover:text-rose-400 font-sans font-semibold text-xs sm:text-sm rounded-xl hover:bg-rose-500/5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Top KPI row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              Impuesto Renta Estimado (Año)
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-white">
                $12.450.000
              </span>
              <span className="text-[10px] font-sans text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                Optimizado
              </span>
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              Planificación tributaria aplicada de forma preventiva.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              Estado Declaración F29
            </span>
            <div className="flex justify-between items-end">
              <span className="text-xl font-serif font-extrabold text-emerald-400">
                Aceptada por SII
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              Periodo Tributario: Mayo 2026. Declarado el 12/06.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              Auditoría Interna Q2
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-gold-400">
                85% Completado
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              Soporte Contable Activo
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-white">
                24 / 7
              </span>
              <span className="text-[10px] font-sans text-gold-400 font-semibold">
                Socio Asignado
              </span>
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              Acceso a WhatsApp directo con consultor senior.
            </p>
          </div>
        </div>

        {/* Dashboard Grid body */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Column Left: Graphs and charts */}
          <div className="lg:col-span-8 space-y-8">
            {/* Chart Area */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-6">
                Estructura Mensual de Flujo de Impuestos (M$)
              </h3>
              
              {/* CSS Driven Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-white/5 px-2">
                {[
                  { month: "Ene", val: 65, color: "bg-navy-400" },
                  { month: "Feb", val: 45, color: "bg-navy-400" },
                  { month: "Mar", val: 80, color: "bg-gold-500 shadow-md shadow-gold-500/10" },
                  { month: "Abr", val: 120, color: "bg-gold-600 shadow-md shadow-gold-500/25" },
                  { month: "May", val: 75, color: "bg-navy-400" },
                  { month: "Jun", val: 90, color: "bg-navy-300" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-grow flex flex-col items-center gap-3 group">
                    <span className="text-[10px] font-sans text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ${item.val}M
                    </span>
                    <div
                      className={`w-full rounded-t-lg ${item.color} transition-all duration-1000 ease-out`}
                      style={{ height: `${(item.val / 130) * 100}%` }}
                    />
                    <span className="text-[10px] font-sans text-navy-200/50 mt-1">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs font-sans text-navy-200/40 mt-4 leading-relaxed text-center">
                * Gráfico comparativo de erogación por mes fiscal en millones de pesos chilenos.
              </p>
            </div>

            {/* Document Download Section */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-6">
                Documentos Tributarios Recientes
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-navy-200/40 font-bold uppercase tracking-wider">
                      <th className="pb-3">Nombre del Archivo</th>
                      <th className="pb-3 text-center">Fecha Carga</th>
                      <th className="pb-3 text-center">Tamaño</th>
                      <th className="pb-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-navy-200/80">
                    {files.map((file) => (
                      <tr key={file.name} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 font-medium text-white flex items-center gap-3">
                          <svg className="w-4 h-4 text-gold-500/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{file.name}</span>
                        </td>
                        <td className="py-4 text-center text-navy-200/50">{file.date}</td>
                        <td className="py-4 text-center text-navy-200/50">{file.size}</td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => simulateDownload(file.name)}
                            disabled={downloadingFile === file.name}
                            className="px-3.5 py-1.5 bg-navy-950/60 border border-white/5 hover:border-gold-500/30 text-gold-400 hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all duration-300 disabled:opacity-40 cursor-pointer"
                          >
                            {downloadingFile === file.name ? "Descargando..." : "Descargar"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Column Right: Assigned accountant and contact options */}
          <div className="lg:col-span-4 space-y-8">
            {/* Accountant details card */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
              <h3 className="font-serif text-lg font-bold text-white border-b border-white/5 pb-3">
                Asesor Tributario Asignado
              </h3>

              {/* Photo & Identity */}
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/30 flex items-center justify-center font-serif text-3xl font-bold text-gold-500 shadow-md">
                  CR
                </div>
                <div>
                  <span className="block font-sans font-bold text-white text-base">
                    Claudio Riquelme
                  </span>
                  <span className="block font-sans text-[10px] text-gold-400 font-bold uppercase tracking-wider">
                    Socio Senior de Impuestos
                  </span>
                  <span className="block font-sans text-[9px] text-navy-200/40">
                    ID Consultor: #5548
                  </span>
                </div>
              </div>

              {/* Direct channels widget requested by user */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold">
                  Canales Directos Premium
                </span>

                {/* WhatsApp Link integration */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/60 rounded-xl font-sans text-sm font-semibold text-emerald-400 hover:text-white transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.903 1.48 5.485 0 9.948-4.471 9.951-9.968.002-2.661-1.034-5.163-2.915-7.047C16.71 1.732 14.218.694 11.562.694c-5.489 0-9.956 4.472-9.959 9.97-.001 1.83.5 3.585 1.455 5.093l-1.026 3.75 3.848-1.012c1.472.8 3.123 1.22 4.767 1.22zM17.48 14.86c-.3-.15-1.782-.88-2.062-.982-.28-.102-.484-.15-.69.155-.204.311-.79.982-.967 1.189-.18.205-.357.23-.656.08-1.516-.76-2.483-1.34-3.473-3.036-.263-.45.263-.42.75-.1.442.29.622.656.802.766.18.11.09.215-.045.365-.135.15-.454.504-.557.625-.102.12-.204.135-.503-.015-.3-.15-1.27-.47-2.417-1.493-.896-.8-1.5-1.787-1.677-2.088-.178-.3-.02-.462.13-.611.135-.135.3-.347.45-.52.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.69-1.666-.948-2.28-.25-.6-.52-.52-.71-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.4-.29.32-1.12 1.1-1.12 2.685 0 1.585 1.15 3.12 1.31 3.33.16.21 2.27 3.47 5.5 4.87.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.12.63-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.26-.18-.56-.33z" />
                  </svg>
                  <span>Chat Directo por WhatsApp</span>
                </a>

                {/* Gmail Link integration */}
                <a
                  href={gmailUrl}
                  className="flex items-center gap-3.5 px-4 py-3 bg-[#ea4335]/10 border border-[#ea4335]/20 hover:border-[#ea4335]/65 rounded-xl font-sans text-sm font-semibold text-[#ea4335] hover:text-white transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Enviar Correo Seguro</span>
                </a>
              </div>
            </div>

            {/* Corporate guidelines card */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4 text-xs font-sans text-navy-200/50 leading-relaxed">
              <h4 className="text-white font-serif font-bold text-sm">
                Nota de Seguridad
              </h4>
              <p>
                Este portal cuenta con cifrado extremo de extremo a extremo. Los informes y balances mostrados corresponden a estimaciones directas del departamento de contabilidad de PROSERCO en base a los datos cargados.
              </p>
              <p className="border-t border-white/5 pt-3">
                Si detecta alguna inconsistencia en las conciliaciones mensuales, le rogamos presionar el botón de WhatsApp para reportarlo de inmediato a su consultor asignado.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
