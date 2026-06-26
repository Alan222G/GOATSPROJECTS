import { useState } from "react";

interface ClientDashboardProps {
  userEmail: string;
  onLogout: () => void;
  t: any;
}

export function ClientDashboard({ userEmail, onLogout, t }: ClientDashboardProps) {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{ name: string; progress: number; size: string }[]>([]);
  
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "Balance_General_Q1_2026.pdf", size: "2.4 MB", date: "15/05/2026" },
    { name: "Declaracion_Impuesto_Anual_SAT.pdf", size: "4.8 MB", date: "30/04/2026" },
    { name: "Libro_Compra_Venta_Mayo.xlsx", size: "1.2 MB", date: "05/06/2026" },
    { name: "Declaracion_Mensual_IVA_SAT.pdf", size: "850 KB", date: "12/06/2026" },
  ]);

  const isEs = t.dashboard.title === "Panel Empresarial" || t.dashboard.title === "Panel de Control";

  const localT = {
    dragDropText: isEs ? "Arrastra y suelta tus documentos contables aquí" : "Drag and drop your accounting documents here",
    orClickText: isEs ? "o haz clic para explorar tus archivos" : "or click to browse your files",
    uploadLimit: isEs ? "Formatos aceptados: PDF, XML, XLSX o JPG (Máx. 10MB)" : "Accepted formats: PDF, XML, XLSX or JPG (Max. 10MB)",
    uploadingTitle: isEs ? "Cargando documentos a PROSERCO..." : "Uploading documents to PROSERCO...",
    uploadSuccess: isEs ? "Archivo cargado y procesado con éxito" : "File successfully uploaded and processed",
    deleteTooltip: isEs ? "Eliminar archivo" : "Delete file",
  };

  const simulateDownload = (filename: string) => {
    setDownloadingFile(filename);
    setTimeout(() => {
      setDownloadingFile(null);
      alert(t.dashboard.successToast.replace("{filename}", filename));
    }, 1200);
  };

  const handleDeleteFile = (filename: string) => {
    if (confirm(isEs ? `¿Está seguro de eliminar ${filename}?` : `Are you sure you want to delete ${filename}?`)) {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== filename));
    }
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      startUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      startUpload(e.target.files);
    }
  };

  const startUpload = (fileList: FileList) => {
    const newUploads = Array.from(fileList).map((file) => {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      return {
        name: file.name,
        size: sizeStr,
        progress: 0,
      };
    });

    setUploadingFiles((prev) => [...prev, ...newUploads]);

    newUploads.forEach((upFile) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setUploadingFiles((prev) =>
          prev.map((f) => (f.name === upFile.name ? { ...f, progress: currentProgress } : f))
        );

        if (currentProgress >= 100) {
          clearInterval(interval);
          
          // Add to files list
          const today = new Date();
          const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
          
          setUploadedFiles((prev) => [
            { name: upFile.name, size: upFile.size, date: dateStr },
            ...prev,
          ]);

          // Remove from uploading list
          setUploadingFiles((prev) => prev.filter((f) => f.name !== upFile.name));
        }
      }, 150);
    });
  };

  // Dynamic prefilled links (Updated for Guatemala consult number +502)
  const whatsappUrl = "https://wa.me/50255481234?text=Hola%20Claudio,%20necesito%20hacer%20una%20consulta%20sobre%20el%20balance%20mensual%20de%20nuestra%20empresa.";
  const gmailUrl = `mailto:contacto@proserco.com?subject=Consulta%20Cliente%20-%20${userEmail}&body=Estimado%20equipo%20de%20PROSERCO,%20solicito%20revisar%20el%20siguiente%20punto%20de%20mi%20cuenta...`;

  return (
    <div className="min-h-screen bg-[#050814] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider block mb-1">
              {t.dashboard.title}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t.dashboard.subtitle} <span className="text-gradient-gold font-sans font-semibold">{userEmail.split("@")[0]}</span>
            </h1>
            <p className="font-sans text-navy-200/40 text-xs mt-1">
              {t.dashboard.meta.replace("{email}", userEmail)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onLogout}
              className="px-5 py-2.5 bg-transparent border border-white/10 hover:border-rose-500/40 text-white hover:text-rose-400 font-sans font-semibold text-xs sm:text-sm rounded-xl hover:bg-rose-500/5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {t.dashboard.btnLogout}
            </button>
          </div>
        </div>

        {/* Top KPI row - completely translated & set in Quetzales */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glow-card glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              {t.dashboard.kpi1Title}
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-white">
                Q 12,450.00
              </span>
              <span className="text-[10px] font-sans text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                {t.dashboard.kpi1Badge}
              </span>
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              {t.dashboard.kpi1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glow-card glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              {t.dashboard.kpi2Title}
            </span>
            <div className="flex justify-between items-end">
              <span className="text-xl font-serif font-extrabold text-emerald-400">
                {t.dashboard.kpi2Badge}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              {t.dashboard.kpi2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="glow-card glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              {t.dashboard.kpi3Title}
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-gold-400">
                {t.dashboard.kpi3Percent}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glow-card glass p-6 rounded-2xl space-y-3">
            <span className="text-navy-200/50 text-[10px] font-sans font-bold uppercase tracking-wider block">
              {t.dashboard.kpi4Title}
            </span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-serif font-extrabold text-white">
                24 / 7
              </span>
              <span className="text-[10px] font-sans text-gold-400 font-semibold">
                {t.dashboard.kpi4Badge}
              </span>
            </div>
            <p className="text-[11px] font-sans text-navy-200/40 leading-relaxed">
              {t.dashboard.kpi4Desc}
            </p>
          </div>
        </div>

        {/* Dashboard Grid body */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Column Left: Graphs and documents */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Chart Area */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-6">
                {t.dashboard.chartTitle}
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
                      Q {item.val}k
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
                {t.dashboard.chartFooter}
              </p>
            </div>

            {/* Document upload section & list */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-8">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                  {t.dashboard.tableTitle}
                </h3>
                <p className="text-xs font-sans text-navy-200/50">
                  {isEs 
                    ? "Carga archivos tributarios, facturas o planillas para que sean revisados por tu gestor asignado."
                    : "Upload tax files, invoices, or payroll sheets to be reviewed by your assigned manager."}
                </p>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                  isDragging 
                    ? "border-gold-500 bg-gold-500/5 scale-[1.01] shadow-lg shadow-gold-500/5"
                    : "border-white/10 bg-white/[0.01] hover:border-gold-500/30 hover:bg-white/[0.02]"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:border-gold-500/40 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-sans font-semibold text-white">
                    {localT.dragDropText}
                  </p>
                  <p className="text-[11px] font-sans text-navy-200/50">
                    {localT.orClickText}
                  </p>
                </div>
                <span className="text-[10px] font-sans text-navy-200/30">
                  {localT.uploadLimit}
                </span>
              </div>

              {/* Uploading Progress bars */}
              {uploadingFiles.length > 0 && (
                <div className="space-y-4 bg-navy-950/40 border border-white/5 p-4 rounded-xl">
                  <h4 className="text-xs font-sans font-bold text-gold-400 uppercase tracking-wider">
                    {localT.uploadingTitle}
                  </h4>
                  {uploadingFiles.map((upFile) => (
                    <div key={upFile.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-sans text-white/80">
                        <span className="truncate max-w-[70%]">{upFile.name}</span>
                        <span>{upFile.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gold-500 transition-all duration-150"
                          style={{ width: `${upFile.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-navy-200/40 font-bold uppercase tracking-wider">
                      <th className="pb-3">{t.dashboard.thName}</th>
                      <th className="pb-3 text-center">{t.dashboard.thDate}</th>
                      <th className="pb-3 text-center">{t.dashboard.thSize}</th>
                      <th className="pb-3 text-right">{t.dashboard.thAction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-navy-200/80">
                    {uploadedFiles.map((file) => (
                      <tr key={file.name} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="py-4 font-medium text-white flex items-center gap-3">
                          <svg className="w-4 h-4 text-gold-500/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="truncate max-w-[200px] sm:max-w-[300px]" title={file.name}>
                            {file.name}
                          </span>
                        </td>
                        <td className="py-4 text-center text-navy-200/50">{file.date}</td>
                        <td className="py-4 text-center text-navy-200/50">{file.size}</td>
                        <td className="py-4 text-right flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => simulateDownload(file.name)}
                            disabled={downloadingFile === file.name}
                            className="px-3 py-1.5 bg-navy-950/60 border border-white/5 hover:border-gold-500/30 text-gold-400 hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all duration-300 disabled:opacity-40 cursor-pointer"
                          >
                            {downloadingFile === file.name ? t.dashboard.btnDownloading : t.dashboard.btnDownload}
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.name)}
                            className="p-1.5 text-navy-200/30 hover:text-rose-500 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                            title={localT.deleteTooltip}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
                {t.dashboard.advTitle}
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
                    {t.dashboard.advRole}
                  </span>
                  <span className="block font-sans text-[9px] text-navy-200/40">
                    {t.dashboard.advId}
                  </span>
                </div>
              </div>

              {/* Direct channels widget */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold">
                  {t.dashboard.advChannels}
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
                  <span>{t.dashboard.btnWa}</span>
                </a>

                {/* Gmail Link integration */}
                <a
                  href={gmailUrl}
                  className="flex items-center gap-3.5 px-4 py-3 bg-[#ea4335]/10 border border-[#ea4335]/20 hover:border-[#ea4335]/65 rounded-xl font-sans text-sm font-semibold text-[#ea4335] hover:text-white transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{t.dashboard.btnEmail}</span>
                </a>
              </div>
            </div>

            {/* Corporate guidelines card */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4 text-xs font-sans text-navy-200/50 leading-relaxed">
              <h4 className="text-white font-serif font-bold text-sm">
                {t.dashboard.secTitle}
              </h4>
              <p>
                {t.dashboard.secDesc1}
              </p>
              <p className="border-t border-white/5 pt-3">
                {t.dashboard.secDesc2}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
