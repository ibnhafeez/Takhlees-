import React, { useState } from "react";
import { Service, SelectedService, ContactDetails, Workflow } from "./types";
import { workflows, defaultAddOns } from "./data";
import { generatePDF } from "./utils/pdfGenerator";
import ContactCapture from "./components/ContactCapture";
import WorkflowServicesPopup from "./components/WorkflowServicesPopup";
import QuotePDFPreview from "./components/QuotePDFPreview";
import * as Lucide from "lucide-react";
import { 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  FileDown, 
  MessageSquare, 
  ShieldCheck, 
  Trash2,
  Clock,
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";

export default function App() {
  const [view, setView] = useState<"categories" | "quotation">("categories");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("family_visa");
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [contact, setContact] = useState<ContactDetails>({
    name: "",
    phone: "",
    email: "",
  });

  // Track which category's corporate requirements popup must appear immediately
  const [activeWorkflowForPopup, setActiveWorkflowForPopup] = useState<Workflow | null>(null);

  // Active workflow mapping
  const currentWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  const handleSelectWorkflowCategory = (workflow: Workflow) => {
    setActiveWorkflowForPopup(workflow);
  };

  const handlePopupProceed = (selections: SelectedService[]) => {
    if (!activeWorkflowForPopup) return;
    setSelectedWorkflowId(activeWorkflowForPopup.id);
    setSelectedServices(selections);
    setActiveWorkflowForPopup(null);
    setView("quotation");
  };

  const handleResetAll = () => {
    setSelectedServices([]);
    setView("categories");
  };

  const isFormValid = contact.name.trim().length >= 3 && 
                      contact.phone.trim().length >= 7 && 
                      contact.email.includes("@");

  // Helper to dynamically render Lucide icons based on string ID
  const renderDynamicIcon = (iconName: string, className = "w-5 h-5") => {
    const IconComponent = (Lucide as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Lucide.FileText className={className} />;
  };

  // WhatsApp click handler deep-linking with real inputs and chosen services list!
  const handleOpenWhatsApp = () => {
    const activeDetails = selectedServices.map((sel) => {
      // Find service definition
      const s = currentWorkflow.services.find((it) => it.id === sel.serviceId);
      if (!s) return "";
      const addOnsText = sel.selectedAddOns.length > 0 ? ` (+${sel.selectedAddOns.length} VIP Add-ons)` : "";
      return `• ${s.name} (x${sel.quantity})${addOnsText}`;
    }).filter(Boolean).join("\n");

    const rawPhone = contact.phone || "";
    const displayPhone = rawPhone.startsWith("0")
      ? `+971 ${rawPhone.substring(1)}`
      : rawPhone.startsWith("+971")
        ? rawPhone
        : `+971 ${rawPhone}`;

    const messageText = `Hi Takhlees Business Team,
I generated an official quotation on takhleesbusiness.com.

Client Name: ${contact.name || "N/A"}
Mobile No: ${rawPhone ? displayPhone : "N/A"}
Email ID: ${contact.email || "N/A"}

Selected Services under [${currentWorkflow.title}]:
${activeDetails || "• (No services selected)"}

Please assist in finalizing my government filing folder. Thank you!`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/971507033492?text=${encodedText}`, "_blank");
  };

  // Trigger PDF Download directly from LHS option block using shared helper details
  const handleDirectDownloadPDF = () => {
    const invoiceNumber = "TKB-QT-" + Math.floor(100000 + Math.random() * 900000);
    generatePDF(contact, selectedServices, currentWorkflow, invoiceNumber);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-[#008643]/30 selection:text-slate-800">
      
      {/* UAE National Color Bar ribbon indicator */}
      <div className="h-1.5 w-full flex shrink-0">
        <div className="bg-[#E22127] flex-1" />
        <div className="bg-white flex-1" />
        <div className="bg-[#008643] flex-1" />
      </div>

      {/* HEADER BAR AND BRAND LOGO */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center space-x-3.5">
            {/* The SVG Corporate Crest Replica of Takhlees (from image.png) */}
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Red Top cap of Diamond */}
                <path
                  d="M50 15 L71 36 C59 33 41 33 29 36 L50 15 Z"
                  fill="#E22127"
                  strokeLinejoin="round"
                />
                {/* Green Left face of Diamond */}
                <path
                  d="M23 42 C33 42 41 44 44 49 C46 52 46 64 46 80 L50 85 L15 50 L23 42 Z"
                  fill="#008643"
                  strokeLinejoin="round"
                />
                {/* Black/Charcoal Right face of Diamond */}
                <path
                  d="M77 42 C67 42 59 44 56 49 C54 52 54 64 54 80 L50 85 L85 50 L77 42 Z"
                  fill="#2D2926"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="block font-display font-black text-xl text-slate-800 tracking-tight leading-none">TAKHLLEES</span>
                <span className="text-[10px] bg-[#008643]/10 text-[#008643] px-2 py-0.5 rounded-md font-extrabold font-mono">BUSINESS SERVICES</span>
              </div>
              <span className="block text-xs text-slate-400 font-medium mt-1">takhleesbusiness.com  |  Government Public Relations Desk</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/971507033492"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2.5 bg-slate-100 hover:bg-[#008643]/10 text-slate-700 hover:text-[#008643] transition-all p-2.5 px-4 rounded-full text-xs font-bold font-display"
              id="whatsapp-header-link"
            >
              <div className="bg-[#008643] p-1.5 rounded-full text-white">
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
              </div>
              <span>Support Desk: +971 50 703 3492</span>
            </a>
          </div>
        </div>
      </header>

      {/* THREE STEP PROGRESS TRACKER BAR */}
      <div className="bg-white border-b border-slate-100 py-3.5 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-400">
          <div className={`flex items-center space-x-2 ${view === "categories" ? "text-[#008643] font-bold" : "text-slate-500"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${view === "categories" ? "bg-[#008643] text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
            <span>Choose Service Channel</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center space-x-2 ${activeWorkflowForPopup ? "text-[#008643] font-bold" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeWorkflowForPopup ? "bg-[#008643] text-white" : "bg-slate-200"}`}>2</span>
            <span>Configure Corporate Services</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center space-x-2 ${view === "quotation" ? "text-[#008643] font-bold" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${view === "quotation" ? "bg-[#008643] text-white animate-pulse" : "bg-slate-200"}`}>3</span>
            <span>Generate Document & PDF</span>
          </div>
        </div>
      </div>

      {/* MAIN SCREEN INTERFACE WRAPPER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-start">
        
        {view === "categories" ? (
          /* ==============================================================
             LANDING SCENARIO: Grid cards of available service categories
             ============================================================== */
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3.5 pt-4">
              <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#008643] bg-[#008643]/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>UAE Ministerial Outlays Registry</span>
              </div>
              <h1 className="font-display font-black text-slate-800 text-3xl sm:text-4xl tracking-tight leading-none">
                Government Corporate Services Setup
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Choose your target administrative category below. A pop-up setup panel will appear showing the required corporate services. After selecting requirements, proceed instantly to download your customized quotation paper and contact our WhatsApp desk.
              </p>
            </div>

            {/* Grid of Workflow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {workflows.map((flow) => {
                return (
                  <div
                    key={flow.id}
                    onClick={() => handleSelectWorkflowCategory(flow)}
                    className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm hover:shadow-lg hover:border-[#008643]/30 cursor-pointer transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    id={`workflow-card-${flow.id}`}
                  >
                    {/* Tiny UAE color indicators on hover */}
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-[#E22127] group-hover:via-white group-hover:to-[#008643] transition-all" />

                    <div>
                      {/* Icon & Label count */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl group-hover:bg-[#008643] group-hover:text-white transition-colors duration-300">
                          {renderDynamicIcon(flow.icon, "w-6 h-6")}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-[#008643] bg-[#008643]/10 px-2.5 py-1 rounded-full">
                          {flow.services.length} required services
                        </span>
                      </div>

                      {/* Info Titles */}
                      <h3 className="font-display font-extrabold text-[#111827] text-lg mb-2 group-hover:text-[#008643] transition-colors">
                        {flow.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        {flow.description}
                      </p>
                    </div>

                    {/* Action trigger footer */}
                    <div className="border-t border-slate-50 pt-4 flex items-center justify-between mt-auto">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Click to view popup options
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#008643]/10 group-hover:text-[#008643] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick helper note */}
            <div className="bg-[#008643]/5 border border-[#008643]/15 rounded-2xl p-5 flex items-center space-x-4 max-w-3xl mx-auto">
              <ShieldCheck className="w-8 h-8 text-[#008643]" />
              <div className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700 block">🔒 Federal Regulatory Compliance Safeguard</span>
                Calculated tariffs coordinate seamlessly with UAE ministerial rates updated for fiscal 2026. Custom selections will be summarized onto a printable, certified PDF.
              </div>
            </div>
          </div>
        ) : (
          /* ==============================================================
             QUOTATION SCREEN: Summary, contact details capture & twin buttons
             ============================================================== */
          <div className="space-y-6 animate-fade-in">
            {/* Top Back Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
              <button
                onClick={() => setView("categories")}
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white px-4  py-2.5 rounded-xl border border-slate-150 shadow-3xs cursor-pointer"
                id="back-to-categories-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Select Different Government Channel</span>
              </button>
              
              <div className="bg-[#008643]/10 text-[#008643] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Channel: {currentWorkflow.title} ({selectedServices.length} Requirements Selected)</span>
              </div>
            </div>

            {/* Two-Column split workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Details registration + DIRECT UNIFIED OPTIONS PANELS */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Introduction info */}
                <div className="bg-white p-5 rounded-3xl border border-slate-150 shadow-3xs space-y-2">
                  <h3 className="font-display font-extrabold text-slate-800 text-base">
                    Official Quotation Registry Desk
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Please provide your contact credentials below. To satisfy compliance logs, these inputs will be hardcoded in real-time onto the print-ready letterhead sheet.
                  </p>
                </div>

                {/* Form to collect name or telephone */}
                <ContactCapture contact={contact} onChange={setContact} />

                {/* USER-REQUEST MANDATE: DIRECT ACTIONS PANEL UNDER CONTACT FORM */}
                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-4">
                  <div className="border-b border-slate-50 pb-3">
                    <span className="text-[10px] font-extrabold uppercase text-[#008643] tracking-widest block">
                      Execution Command Center
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Download PDF, or directly bind quotation details to our executive terminal.
                    </span>
                  </div>

                  {!isFormValid && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 p-3 rounded-xl text-xs flex items-start space-x-2">
                      <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Please complete all starred fields in the Verification form to enable Download PDF and WhatsApp Submission.</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                    {/* Action 1: Download PDF */}
                    <button
                      onClick={handleDirectDownloadPDF}
                      disabled={!isFormValid}
                      className={`flex-1 py-4 px-6 rounded-2xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                        isFormValid
                          ? "bg-[#111827] hover:bg-black text-white hover:scale-[1.01] active:scale-100"
                          : "bg-slate-150 text-slate-400 select-none cursor-not-allowed shadow-none"
                      }`}
                      id="lhs-download-pdf-btn"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Invoice PDF</span>
                    </button>

                    {/* Action 2: WhatsApp Submit */}
                    <button
                      onClick={handleOpenWhatsApp}
                      disabled={!isFormValid}
                      className={`flex-1 py-4 px-6 rounded-2xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                        isFormValid
                          ? "bg-[#008643] hover:bg-[#007038] text-white hover:scale-[1.01] active:scale-100"
                          : "bg-slate-150 text-slate-400 select-none cursor-not-allowed shadow-none"
                      }`}
                      id="lhs-whatsapp-contact-btn"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Contact via WhatsApp</span>
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <span className="text-[10px] text-slate-400 font-medium hover:underline cursor-pointer" onClick={handleResetAll}>
                      ← Re-start and choose another government channel
                    </span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Realtime visual mockup of printable invoice document */}
              <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
                <QuotePDFPreview
                  contact={contact}
                  selectedServices={selectedServices}
                  activeWorkflow={currentWorkflow}
                />
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 mt-16 font-sans text-xs shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="block font-display font-black text-white text-base tracking-widest">TAKHLLEES</span>
              <span className="text-[8px] bg-red-600/20 text-[#E22127] border border-[#E22127]/30 px-2 py-0.5 rounded font-extrabold whitespace-nowrap">UAE TRUSTED</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              Takhlees Government Relations Setup is an authorized regulatory typing agent. We fast track your corporate license filings and family residency applications.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white tracking-widest uppercase text-[10px]">Service Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>• mainland DED business typing approvals</li>
              <li>• UAE Partner & Golden Investor residency folders</li>
              <li>• Golden Chance Driving Traffic setup</li>
              <li>• UAE corporate tax & VAT registries validation</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white tracking-widest uppercase text-[10px]">Security Escrow</h4>
            <p className="text-slate-500 leading-relaxed">
              Calculated outlays conform to modern ministerial standards. Data processing strictly honors state guidelines for client privacy records management.
            </p>
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-bold mt-2">
              <ShieldCheck className="w-4 h-4 text-[#008643]" />
              <span>Federal SSL Encryption Protocols</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-900 text-center text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Takhlees Business Services (takhleesbusiness.com). Abu Dhabi, United Arab Emirates. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="https://wa.me/971507033492" className="hover:text-white transition-colors">WhatsApp Desk</a>
            <span className="text-slate-800">|</span>
            <a href="mailto:help@takhleesbusiness.com" className="hover:text-white transition-colors">Client Support</a>
          </div>
        </div>
      </footer>

      {/* POPUP: Mandatory selection popup launched on clicking any homepage category */}
      {activeWorkflowForPopup && (
        <WorkflowServicesPopup
          workflow={activeWorkflowForPopup}
          initialSelections={selectedWorkflowId === activeWorkflowForPopup.id ? selectedServices : []}
          onClose={() => setActiveWorkflowForPopup(null)}
          onProceed={handlePopupProceed}
        />
      )}

    </div>
  );
}
